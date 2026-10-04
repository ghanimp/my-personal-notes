import React from 'react';
import NoteItem from './NoteItem';

function NotesList({
  notes,
  onDelete,
  onArchive,
  dataTestId = 'notes-list',
  searchKeyword = '',
}) {
  //  validasi notes kosong
  const hasNotes = Array.isArray(notes) && notes.length > 0;

  if (!hasNotes) {
    return (
      <div className="notes-list" data-testid={dataTestId}>
        <p
          className="notes-list__empty-message"
          data-testid={`${dataTestId}-empty`}
        >
          Tidak ada catatan untuk ditampilkan.
        </p>
      </div>
    );
  }

  // group per bulan-tahun (key: YYYY-MM)
  const groupedNotes = notes.reduce((acc, note) => {
    const date = new Date(note.createdAt);
    const key = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, '0')}`;

    if (!acc[key]) acc[key] = [];
    acc[key].push(note);
    return acc;
  }, {});

  return (
    <div
      className="notes-list notes-list--grouped"
      data-testid={dataTestId}
    >
      {Object.entries(groupedNotes).map(([groupKey, groupNotes]) => (
        <section
          key={groupKey}
          className="notes-group"
          data-testid={`${groupKey}-group`}
        >
          <div className="notes-group__header">
            <h3 className="notes-group__title">
              {new Date(groupNotes[0].createdAt).toLocaleDateString('id-ID', {
                month: 'long',
                year: 'numeric',
              })}
            </h3>
            <span
              className="notes-group__count"
              data-testid={`${groupKey}-group-count`}
            >
              {groupNotes.length} catatan
            </span>
          </div>
          <div className="notes-group__items">
            {groupNotes.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                onDelete={onDelete}
                onArchive={onArchive}
                searchKeyword={searchKeyword}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default NotesList;