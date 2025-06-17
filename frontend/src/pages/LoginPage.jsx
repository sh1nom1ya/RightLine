import React from 'react';
import './AuthForm.css';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>Вход</h2>

                <input type="email" placeholder="name@gmail.com" />
                <input type="password" placeholder="Пароль" />

                <button className="primary-button">Войти</button>

                <p className="auth-text">
                    Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
                </p>
                <Link to="/" className="back-link">Вернуться</Link>
            </div>
        </div>
    );
};

export default LoginPage;
