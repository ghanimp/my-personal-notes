import React from 'react';

const TITLE_LIMIT = 50;
const BODY_MIN = 10;

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      error: '',
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  // limit 50 char pakai STATE (bukan maxLength)
  onTitleChangeEventHandler(event) {
    const value = event.target.value;

    if (value.length <= TITLE_LIMIT) {
      this.setState({ title: value, error: '' });
    }
    // kalau lebih dari 50, state tidak diupdate = input tertahan
  }

  onBodyChangeEventHandler(event) {
    this.setState({ body: event.target.value, error: '' });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();

    const { title, body } = this.state;

    // tolak submit kalau body < 10 karakter
    if (body.trim().length < BODY_MIN) {
      this.setState({
        error: `Isi catatan minimal harus ${BODY_MIN} karakter`,
      });
      return;
    }

    // panggil addNote dan reset form
    this.props.addNote({ title, body });
    this.setState({ title: '', body: '', error: '' });
  }

  render() {
    const { title, body, error } = this.state;
    const remainingChars = TITLE_LIMIT - title.length;

    return (
      <div className="note-input" data-testid="note-input">
        <h2>Buat catatan</h2>

        // error meessage
        {error && (
          <p className="note-input__feedback note-input__feedback--error">
            {error}
          </p>
        )}

        <form
          onSubmit={this.onSubmitEventHandler}
          data-testid="note-input-form"
        >
          // counter dinamis
          <p
            className={`note-input__title__char-limit ${
              remainingChars < 10
                ? 'note-input__title__char-limit--warn'
                : ''
            }`}
            data-testid="note-input-title-remaining"
          >
            Sisa karakter: {remainingChars}
          </p>

          <input
            className="note-input__title"
            type="text"
            placeholder="Ini adalah judul ..."
            value={title}
            onChange={this.onTitleChangeEventHandler}
            required
            data-testid="note-input-title-field"
          />

          <textarea
            className="note-input__body"
            placeholder="Tuliskan catatanmu di sini ..."
            value={body}
            onChange={this.onBodyChangeEventHandler}
            required
            data-testid="note-input-body-field"
          />

          <button type="submit" data-testid="note-input-submit-button">
            Buat
          </button>
        </form>
      </div>
    );
  }
}

export default NoteInput;