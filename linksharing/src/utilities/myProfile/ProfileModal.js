import React from 'react';
import './ProfileModal.css';
import '../../compunets/Link.css'
const ProfileModal = ({ isOpen, onClose,ref, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" ref={ref}>
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="modal-content">
            {children}
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;