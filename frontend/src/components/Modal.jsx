import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, width = "500px", height = "auto", children }) => {
    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target.className === 'modal-overlay') onClose();
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-window" style={{ width, height }}>
                <button className="close-button" onClick={onClose}>✖</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
