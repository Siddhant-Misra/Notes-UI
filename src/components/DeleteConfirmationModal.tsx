import React from "react";
import "../styles/DeleteConfirmationModal.css";

interface DeleteConfirmationModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ onClose, onConfirm }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Are you sure you want to delete this note?</h2>
        <div className="modal-buttons">
          <button className="delete-confirmation-confirm" onClick={onConfirm}>Yes</button>
          <button className="delete-confirmation-cancel" onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
