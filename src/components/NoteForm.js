import React, {useState} from 'react';

const NoteForm = ({createNote}) => {
  const [newNote, setNewNote] = useState('a new note...');

  const handleChange = event => {
    setNewNote(event.target.value);
  };

  const addNote = event => {
    event.preventDefault();
    createNote({
      content: newNote,
      important: Math.random() > 0.5
    });

    setNewNote('');
  };

  return (
    <form onSubmit={addNote}>
        <input id="new_note" type="text" value={newNote} onChange={handleChange}/>
        <button type="submit">save</button>
    </form>
  );
};

export default NoteForm;