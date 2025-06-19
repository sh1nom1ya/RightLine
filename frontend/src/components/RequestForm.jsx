import React, { useState } from 'react';
import './RequestForm.css';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const RequestForm = ({ onSuccess }) => {
    const [message, setMessage] = useState("");
    const { token } = useAuth();
    const [status, setStatus] = useState(null);

    const handleSubmit = async () => {
        try {
            await axios.post(
                'http://localhost:5011/Consultations/CreateConsultation',
                { message },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            setStatus("Заявка успешно отправлена!");
            setMessage('');
            if (onSuccess) onSuccess(); 
        } catch (error) {
            console.error("Ошибка отправки заявки:", error);
            setStatus("Ошибка при отправке. Попробуйте позже.");
        }
    };

    return (
        <div className="request-form">
            <h2>Текст заявки</h2>
            <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                rows={6}
            />
            <button onClick={handleSubmit}>Отправить</button>
            {status && <p className="form-status">{status}</p>}
        </div>
    );
};

export default RequestForm;
