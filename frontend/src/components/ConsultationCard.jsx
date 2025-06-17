import React from 'react';
import './ConsultationCard.css';

const ConsultationCard = ({ name, message, phone, email, showActions, onAccept, onDecline }) => {
    return (
        <div className="consultation-card">
            <h4>{name}</h4>
            <p className="message">{message}</p>

            <div className="footer-row">
                <div className="contact-box">
                    <span>{phone}</span>
                    <span>{email}</span>
                </div>

                {showActions && (
                    <div className="actions">
                        <button className="accept-btn" onClick={onAccept}>Принять</button>
                        <button className="decline-btn" onClick={onDecline}>Отклонить</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConsultationCard;
