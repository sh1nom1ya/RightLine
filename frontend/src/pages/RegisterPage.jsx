import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AuthForm.css';

const RegisterPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (password !== confirmPassword) {
            setError('Пароли не совпадают');
            return;
        }
        setError('');
        try {
            await axios.post('http://localhost:5011/Accounts/Registrate', {
                firstName,
                lastName,
                phoneNumber: phone,
                email,
                password
            });
            navigate('/');
        } catch (err) {
            const errMsg = err.response?.data?.errors?.join('\n') || 'Ошибка при регистрации';
            setError(errMsg);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>Регистрация</h2>
                {error && <div className="auth-text" style={{ color: 'red' }}>{error}</div>}

                <input
                    type="text"
                    placeholder="Кагуя"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Синомия"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="8 ••• ••• •• ••"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="name@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button className="primary-button" onClick={handleSubmit}>
                    Зарегистрироваться
                </button>

                <p className="auth-text">
                    Уже есть аккаунт? <a href="/login">Войдите</a>
                </p>
                <a href="/" className="back-link">Вернуться</a>
            </div>
        </div>
    );
};

export default RegisterPage;
