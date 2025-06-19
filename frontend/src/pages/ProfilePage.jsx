import React, { useEffect, useState } from 'react';
import './ProfilePage.css';
import profileImage from '../assets/profile-placeholder.png';
import logoutIcon from '../assets/logout.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const ProfilePage = () => {
    const navigate = useNavigate();
    const { token, logout, roles } = useAuth();
    const isAdmin = roles.includes('Admin');

    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
    });

    const [orders, setOrders] = useState([]);
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profileRes = await axios.get('http://localhost:5011/Accounts/GetProfile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setProfile(profileRes.data);

                const ordersRes = await axios.get(
                    isAdmin ? 'http://localhost:5011/Accounts/GetAllOrders' : 'http://localhost:5011/Accounts/GetUserOrders',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setOrders(Array.isArray(ordersRes.data) ? ordersRes.data : []);
            } catch (error) {
                console.error('Ошибка загрузки профиля или заказов:', error);
            }
        };

        fetchData();
    }, [token, isAdmin]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            setIsSaving(true);
            setSaveStatus('');
            await axios.put('http://localhost:5011/Accounts/UpdateProfile', profile, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error('Ошибка при сохранении:', error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="profile-page">
            <div className="profile-left">
                <button className="logout" onClick={handleLogout}>
                    <img src={logoutIcon} alt="logout-icon" className="loginIcon" />
                </button>

                <img src={profileImage} alt="Аватар" className="profile-avatar" />

                <label>Фамилия</label>
                <input name="lastName" type="text" value={profile.lastName} onChange={handleChange} />

                <label>Имя</label>
                <input name="firstName" type="text" value={profile.firstName} onChange={handleChange} />

                <label>Email</label>
                <input name="email" type="email" value={profile.email} onChange={handleChange} />

                <label>Телефон</label>
                <input name="phoneNumber" type="tel" value={profile.phoneNumber} onChange={handleChange} />

                <button className="save-button" onClick={handleSave} disabled={isSaving}>
                    {isSaving ? 'Сохранение...' : 'Сохранить'}
                </button>
                {saveStatus && <p style={{ marginTop: '10px' }}>{saveStatus}</p>}
            </div>

            <div className="profile-right">
                <h3>Ваши заказы</h3>
                <div className="order-list">
                    {Array.isArray(orders) && orders.length > 0 ? (
                        orders.map(order => (
                            <div key={order.code}>
                                <div className="order-item">
                                    <span className="order-id">{order.code}</span>
                                    <span className="order-service">{order.title}</span>
                                    <span className="order-date">
                                        {new Date(order.createdAt).toLocaleDateString('ru-RU', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </span>
                                </div>

                                {isAdmin && (
                                    <div className="order-meta">
                                        <span className="meta-left">{order.firstName} {order.lastName}</span>
                                        <span className="meta-right">{order.phoneNumber} | {order.email}</span>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>У вас пока нет заказов</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
