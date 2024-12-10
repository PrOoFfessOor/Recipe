import React, { useState } from "react";

function NotesApp() {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState({ title: "", content: "" });
  const [isEditing, setIsEditing] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentNote({ ...currentNote, [name]: value });
  };

  // Add a new note
  const addNote = () => {
    if (currentNote.title && currentNote.content) {
      setNotes([...notes, { ...currentNote, id: Date.now() }]);
      setCurrentNote({ title: "", content: "" });
    }
  };

  // Delete a note
  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  // Edit a note
  const editNote = (id) => {
    const noteToEdit = notes.find((note) => note.id === id);
    setCurrentNote(noteToEdit);
    setIsEditing(id);
  };

  // Save edited note
  const saveNote = () => {
    setNotes(
      notes.map((note) =>
        note.id === isEditing ? { ...note, ...currentNote } : note
      )
    );
    setCurrentNote({ title: "", content: "" });
    setIsEditing(null);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Notes App</h1>

      <div>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={currentNote.title}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
        />
        <textarea
          name="content"
          placeholder="Content"
          value={currentNote.content}
          onChange={handleChange}
          style={{ width: "100%", height: "100px", marginBottom: "10px", padding: "10px" }}
        ></textarea>
        {isEditing === null ? (
          <button onClick={addNote} style={{ padding: "10px 20px" }}>
            Add Note
          </button>
        ) : (
          <button onClick={saveNote} style={{ padding: "10px 20px" }}>
            Save Note
          </button>
        )}
      </div>

      <h2>My Notes</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {notes.map((note) => (
          <li
            key={note.id}
            style={{
              border: "1px solid #ccc",
              marginBottom: "10px",
              padding: "10px",
            }}
          >
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => editNote(note.id)} style={{ marginRight: "10px" }}>
              Edit
            </button>
            <button onClick={() => deleteNote(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotesApp;