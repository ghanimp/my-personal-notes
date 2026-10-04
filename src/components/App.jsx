import React from 'react';
import { getInitialData } from '../utils';
import NoteInput from './NoteInput';
import NotesList from './NotesList';
import NoteSearch from './NoteSearch';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getInitialData(),
      searchKeyword: '',
    };

    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
    this.onSearchHandler = this.onSearchHandler.bind(this);
  }

  onAddNoteHandler({ title, body }) {
    this.setState((prevState) => ({
      notes: [
        ...prevState.notes,
        {
          id: +new Date(),
          title,
          body,
          createdAt: new Date().toISOString(),
          archived: false,
        },
      ],
    }));
  }

  onDeleteHandler(id) {
    this.setState((prevState) => ({
      notes: prevState.notes.filter((note) => note.id !== id),
    }));
  }

  onArchiveHandler(id) {
    this.setState((prevState) => ({
      notes: prevState.notes.map((note) =>
        note.id === id ? { ...note, archived: !note.archived } : note
      ),
    }));
  }

  onSearchHandler(keyword) {
    this.setState({ searchKeyword: keyword });
  }

  render() {
    const { notes, searchKeyword } = this.state;

    // filter case-insensitive
    const filteredNotes = notes.filter((note) =>
      note.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    // memisahkan aktif & arsip, urutkan terbaru
    const activeNotes = filteredNotes
      .filter((note) => !note.archived)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const archivedNotes = filteredNotes
      .filter((note) => note.archived)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
      <div className="note-app" data-testid="note-app">
        <div className="note-app__header" data-testid="note-app-header">
          <h1>Notes</h1>
          <NoteSearch
            keyword={searchKeyword}
            onSearch={this.onSearchHandler}
          />
        </div>
        <div className="note-app__body" data-testid="note-app-body">
          <NoteInput addNote={this.onAddNoteHandler} />

          <section
            aria-labelledby="active-notes-title"
            data-testid="active-notes-section"
          >
            <div className="notes-group__header">
              <h2 id="active-notes-title">Catatan Aktif</h2>
              <span className="notes-group__count">
                {activeNotes.length} catatan
              </span>
            </div>
            <NotesList
              notes={activeNotes}
              onDelete={this.onDeleteHandler}
              onArchive={this.onArchiveHandler}
              searchKeyword={searchKeyword}
              dataTestId="active-notes-list"
            />
          </section>

          <section
            aria-labelledby="archived-notes-title"
            data-testid="archived-notes-section"
          >
            <div className="notes-group__header">
              <h2 id="archived-notes-title">Arsip</h2>
              <span className="notes-group__count">
                {archivedNotes.length} catatan
              </span>
            </div>
            <NotesList
              notes={archivedNotes}
              onDelete={this.onDeleteHandler}
              onArchive={this.onArchiveHandler}
              searchKeyword={searchKeyword}
              dataTestId="archived-notes-list"
            />
          </section>
        </div>
      </div>
    );
  }
}

export default App;