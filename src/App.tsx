import "./styles/App.css";
import { useState, useEffect } from "react";
import Modal from "./components/Modal";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DeleteConfirmationModal from "./components/DeleteConfirmationModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

export interface Note {
  id: string;
  title: string;
  content: string;
}

const App = () => {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("https://notes-server-qizu.onrender.com/notes");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const notes: Note[] = await response.json();
        setNotes(notes);
      } catch (e) {
        console.log('Error fetching notes:', e);
      }
    };

    fetchNotes();
  }, []);

  const openAddModal = () => {
    setSelectedNote(null);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const openEditModal = (note: Note) => {
    setSelectedNote(note);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const openDeleteModal = (note: Note) => {
    setNoteToDelete(note);
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNote(null);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setNoteToDelete(null);
  };

  const handleAddNote = async (title: string, content: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("https://notes-server-qizu.onrender.com/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newNote = await response.json();
      setNotes([newNote, ...notes]);
      toast.success("Note added successfully!");
    } catch (e) {
      console.log('Error adding note:', e);
      toast.error("Failed to add note.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateNote = async (id: string, title: string, content: string) => {
    try {
      const response = await fetch(`https://notes-server-qizu.onrender.com/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedNote = await response.json();
      const updatedNotesList = notes.map((note) =>
        note.id === id ? updatedNote : note
      );

      setNotes(updatedNotesList);
      toast.success("Note updated successfully!");
    } catch (e) {
      console.log('Error updating note:', e);
      toast.error("Failed to update note.");
    }
  };

  const deleteNote = async () => {
    if (!noteToDelete) return;

    try {
      const response = await fetch(`https://notes-server-qizu.onrender.com/notes/${noteToDelete.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedNotes = notes.filter((note) => note.id !== noteToDelete.id);
      setNotes(updatedNotes);
      closeDeleteModal();
      toast.success("Note deleted successfully!");
    } catch (e) {
      console.log('Error deleting note:', e);
      toast.error("Failed to delete note.");
    }
  };

  return (
    <div className="app-container">
      <ToastContainer />
      <Header />
      <div className="main-content">
        <div className="content">
          <div className="controls">
            <button className="add-note-button" onClick={openAddModal} disabled={isLoading}>
              {isLoading ? 'Adding Note...' : 'Add Note'}
            </button>
          </div>
          <div className="notes-grid">
            {notes.map((note) => (
              <div key={note.id} className="note-item">
                <h2>{note.title}</h2>
                <p dangerouslySetInnerHTML={{ __html: note.content }} /> {/* Render content as HTML inside a p tag */}
                <div className="note-actions">
                  <button className="edit-button" onClick={() => openEditModal(note)}>
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                  <button className="delete-button" onClick={() => openDeleteModal(note)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          isEditing={isEditing}
          note={selectedNote}
          onClose={closeModal}
          onAddNote={handleAddNote}
          onUpdateNote={handleUpdateNote}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          onClose={closeDeleteModal}
          onConfirm={deleteNote}
        />
      )}
      <Footer />
    </div>
  );
};

export default App;
