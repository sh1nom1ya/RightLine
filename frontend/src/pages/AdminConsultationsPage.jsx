import React, { useState } from 'react';
import './AdminConsultationsPage.css';

const mockApplications = [
    {
        id: 1,
        name: 'ФИО',
        phone: '89777730867',
        email: 'sh1nom1yo@mail.ru',
        message: 'Здравствуйте, хотелось бы обсудить с вами мой возможный заказ Web-приложения!',
        status: 'active',
    },
    {
        id: 2,
        name: 'ФИО',
        phone: '89777730867',
        email: 'sh1nom1yo@mail.ru',
        message: 'Здравствуйте, хотелось бы обсудить с вами мой возможный заказ Web-приложения!',
        status: 'active',
    },
    {
        id: 3,
        name: 'ФИО',
        phone: '89777730867',
        email: 'sh1nom1yo@mail.ru',
        message: 'Здравствуйте, хотелось бы обсудить с вами мой возможный заказ Web-приложения!',
        status: 'completed',
    },
];

const AdminConsultationsPage = () => {
    const [filter, setFilter] = useState('active');

    const filtered = mockApplications.filter(app => app.status === filter);

    return (
        <div className="consultations-page">
            <div className="tabs">
                <button
                    className={filter === 'active' ? 'tab active' : 'tab'}
                    onClick={() => setFilter('active')}
                >
                    Активные
                </button>
                <button
                    className={filter === 'completed' ? 'tab active' : 'tab'}
                    onClick={() => setFilter('completed')}
                >
                    Завершенные
                </button>
            </div>

            <div className="cards-list">
                {filtered.map(app => (
                    <div
                        key={app.id}
                        className={`consultation-card ${filter === 'active' ? 'active-card' : ''}`}
                    >
                        <h4>{app.name}</h4>
                        <p>{app.message}</p>
                        <div className="contact">
                            <span>{app.phone}</span>
                            <span>{app.email}</span>
                        </div>
                        {filter === 'active' && (
                            <div className="action-buttons">
                                <button className="accept">Принять</button>
                                <button className="decline">Отклонить</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminConsultationsPage;
