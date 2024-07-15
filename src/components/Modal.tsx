import { useState, useEffect } from "react";
import { Note } from "../App"; 
import "../styles/Modal.css";

interface ModalProps {
  isEditing: boolean;
  note: Note | null;
  onClose: () => void;
  onAddNote: (title: string, content: string) => void;
  onUpdateNote: (id: string, title: string, content: string) => void;
}

const Modal: React.FC<ModalProps> = ({ isEditing, note, onClose, onAddNote, onUpdateNote }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (isEditing && note) {
      onUpdateNote(note.id, title, content);
    } else {
      onAddNote(title, content);
    }
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{isEditing ? "Edit Note" : "Add Note"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            rows={10}
            required
          />
          <div className="modal-buttons">
            <button type="submit">{isEditing ? "Update" : "Add"}</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
