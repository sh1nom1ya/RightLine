import React from 'react';
import './RequestForm.css';

const RequestForm = () => {
    return (
        <div className="request-form">
            <h2>Текст заявки</h2>
            <textarea
                defaultValue="Здравствуйте, хотелось бы обсудить с вами мой возможный заказ Web-приложения!"
                rows={6}
            />
            <button>Отправить</button>
        </div>
    );
};

export default RequestForm;
