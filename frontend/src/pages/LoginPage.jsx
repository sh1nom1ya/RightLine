import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AuthForm.css';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setToken } = useAuth();

    const handleLogin = async () => {
        if (!email || !password) {
            setError('Введите Email и пароль');
            return;
        }

        setError('');
        try {
            const response = await axios.post('http://localhost:5011/Accounts/Authenticate', {
                email,
                password
            });

            const { token } = response.data;

            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setToken(token);

            navigate('/');
        } catch (err) {
            const msg = err.response?.data?.errorMessage || 'Ошибка при входе';
            setError(msg);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>Вход</h2>
                {error && <div className="auth-text" style={{ color: 'red' }}>{error}</div>}

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

                <button className="primary-button" onClick={handleLogin}>
                    Войти
                </button>

                <p className="auth-text">
                    Нет аккаунта? <a href="/register">Зарегистрироваться</a>
                </p>
                <a href="/" className="back-link">Вернуться</a>
            </div>
        </div>
    );
};

export default LoginPage;
