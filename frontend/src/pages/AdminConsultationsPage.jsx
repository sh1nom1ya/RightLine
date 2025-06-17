import React, { useState } from 'react';
import './AdminConsultationsPage.css';
import ConsultationCard from "../components/ConsultationCard";

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
                    <ConsultationCard
                        key={app.id}
                        name={app.name}
                        message={app.message}
                        phone={app.phone}
                        email={app.email}
                        showActions={filter === 'active'}
                        onAccept={() => console.log(`Принята заявка ${app.id}`)}
                        onDecline={() => console.log(`Отклонена заявка ${app.id}`)}
                    />
                ))}
            </div>
        </div>
    );
};

export default AdminConsultationsPage;
