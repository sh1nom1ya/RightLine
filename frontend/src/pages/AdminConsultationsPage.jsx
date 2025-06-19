import React, { useEffect, useState } from 'react';
import './AdminConsultationsPage.css';
import ConsultationCard from '../components/ConsultationCard';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AdminConsultationsPage = () => {
    const { token } = useAuth();
    const [filter, setFilter] = useState('active');
    const [applications, setApplications] = useState([]);

    const fetchConsultations = async () => {
        try {
            const url =
                filter === 'active'
                    ? 'http://localhost:5011/Consultations/GetActiveConsultations'
                    : 'http://localhost:5011/Consultations/GetDoneConsultations';

            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Прямо используем поля, как приходят из ConsultationDto
            const formatted = response.data.map((item) => ({
                id: item.id,
                name: `${item.firstName ?? ''} ${item.lastName ?? ''}`.trim(),
                phone: item.phoneNumber,
                email: item.email,
                message: item.message,
                status: filter,
            }));

            setApplications(formatted);
        } catch (error) {
            console.error('Ошибка загрузки консультаций:', error);
            setApplications([]);
        }
    };

    useEffect(() => {
        if (token) fetchConsultations();
    }, [filter, token]);

    const handleAccept = async (id) => {
        try {
            await axios.put(`http://localhost:5011/Consultations/ConfirmConsultation?consultationId=${id}`, null, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchConsultations();
        } catch (error) {
            console.error('Ошибка при подтверждении консультации:', error);
        }
    };

    const handleDecline = async (id) => {
        try {
            await axios.delete(`http://localhost:5011/Consultations/CancelConsultation?consultationId=${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchConsultations();
        } catch (error) {
            console.error('Ошибка при удалении консультации:', error);
        }
    };

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
                    Завершённые
                </button>
            </div>

            <div className="cards-list">
                {applications.length > 0 ? (
                    applications.map((app) => (
                        <ConsultationCard
                            key={app.id}
                            name={app.name} 
                            message={app.message}
                            phone={app.phone}
                            email={app.email}
                            showActions={filter === 'active'}
                            onAccept={() => handleAccept(app.id)}
                            onDecline={() => handleDecline(app.id)}
                        />
                    ))
                ) : (
                    <p className="empty-text">Заявок не найдено</p>
                )}
            </div>
        </div>
    );
};

export default AdminConsultationsPage;
