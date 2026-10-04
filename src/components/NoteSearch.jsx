import React from 'react';

function NoteSearch({ keyword, onSearch }) {
  return (
    <div className="note-search" data-testid="note-search">
      <input
        type="text"
        placeholder="Cari catatan ..."
        value={keyword}
        onChange={(event) => onSearch(event.target.value)}
        data-testid="note-search-input"
      />
      {keyword && (
        <button
          className="note-search__clear"
          type="button"
          onClick={() => onSearch('')}
          aria-label="Bersihkan pencarian"
        >
          ×
        </button>
      )}
    </div>
  );
}

export default NoteSearch;