import React from 'react';
import './ProfilePage.css';
import profileImage from '../assets/profile-placeholder.png';

const orders = [
    { id: 'N82614', service: 'E-commerce', date: '2025-06-12T12:00:00Z' },
    { id: 'N59231', service: 'Back office', date: '2025-06-05T16:30:00Z' },
    { id: 'N38192', service: 'Заказная разработка', date: '2025-05-20T09:45:00Z' },
];

const isAdmin = true;

const ProfilePage = () => {
    return (
        <div className="profile-page">
            <div className="profile-left">
                <img src={profileImage} alt="Аватар" className="profile-avatar" />

                <label>Фамилия</label>
                <input type="text" defaultValue="Хэммильтон" />

                <label>Имя</label>
                <input type="text" defaultValue="Льюис" />

                <label>Email</label>
                <input type="email" defaultValue="ferrari-tractors@gmail.com" />

                <label>Телефон</label>
                <input type="tel" defaultValue="+79777777777" />

                <button className="save-button">Сохранить</button>
            </div>

            <div className="profile-right">
                <h3>Ваши заказы</h3>
                <div className="order-list">
                    {orders.length === 0 ? (
                        <p>У вас пока нет заказов</p>
                    ) : (
                        orders.map(order => (
                            <div key={order.id}>
                                <div className="order-item">
                                    <span className="order-id">{order.id}</span>
                                    <span className="order-service">{order.service}</span>
                                    <span className="order-date">
                    {new Date(order.date).toLocaleDateString('ru-RU', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                  </span>
                                </div>

                                {isAdmin && (
                                    <div className="order-meta">
                                        <span className="meta-left">Льюис Хэммильтон</span>
                                        <span className="meta-right">+7 977 777 77 77 | ferrari-tractors@gmail.com</span>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
