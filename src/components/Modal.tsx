import { Note } from "../App";
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
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
    } else {
      setTitle("");
      setContent("");
    }
  }, [note]);

  const handleSubmit = () => {
    if (isEditing && note) {
      onUpdateNote(note.id, title, content);
    } else {
      onAddNote(title, content);
    }
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{isEditing ? "Edit Note" : "Add Note"}</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <ReactQuill
          value={content}
          onChange={setContent}
          modules={{
            toolbar: [
              [{ 'header': '1'}, { 'header': '2'}, { 'font': [] }],
              [{size: []}],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{'list': 'ordered'}, {'list': 'bullet'}, 
               {'indent': '-1'}, {'indent': '+1'}],
              ['link', 'image', 'video'],
              ['clean']                                         
            ],
          }}
        />
        <div className="modal-actions">
          <button onClick={handleSubmit}>{isEditing ? "Update Note" : "Add Note"}</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
