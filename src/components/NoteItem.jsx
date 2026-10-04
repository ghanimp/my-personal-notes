import React from 'react';
import { showFormattedDate } from '../utils';
import NoteActionButton from './NoteActionButton';

// highlightText reusable untuk title & body
export function highlightText(text, keyword) {
  if (!keyword || !text) return text;

  const safeKeyword = String(keyword).replace(
    /[.*+?^${}()|[\]\\]/g,
    '\\$&'
  );
  const regex = new RegExp(`(${safeKeyword})`, 'gi');
  const parts = String(text).split(regex);

  return parts.map((part, index) =>
    part.toLowerCase() === String(keyword).toLowerCase() ? (
      <mark key={index}>{part}</mark>
    ) : (
      <React.Fragment key={index}>{part}</React.Fragment>
    )
  );
}

function NoteItem({ note, onDelete, onArchive, searchKeyword = '' }) {
  if (!note) return null;

  return (
    <div
      className="note-item"
      data-testid="note-item"
      data-note-id={note.id}
    >
      <div className="note-item__content" data-testid="note-item-content">
        <h3 className="note-item__title" data-testid="note-item-title">
          {highlightText(note.title, searchKeyword)}
        </h3>
        <p className="note-item__date" data-testid="note-item-date">
          {showFormattedDate(note.createdAt)}
        </p>
        <p className="note-item__body" data-testid="note-item-body">
          {highlightText(note.body, searchKeyword)}
        </p>
      </div>
      <div className="note-item__action" data-testid="note-item-action">
        // NoteActionButton dengan variant
        <NoteActionButton
          variant="delete"
          onClick={() => onDelete(note.id)}
          dataTestId="note-item-delete-button"
        >
          Delete
        </NoteActionButton>

        <NoteActionButton
          variant="archive"
          onClick={() => onArchive(note.id)}
          dataTestId="note-item-archive-button"
        >
          {note.archived ? 'Pindahkan' : 'Arsipkan'}
        </NoteActionButton>
      </div>
    </div>
  );
}

export default NoteItem;