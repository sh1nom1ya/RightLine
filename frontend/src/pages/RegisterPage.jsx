import React from 'react';
import './AuthForm.css';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>Регистрация</h2>

                <input type="text" placeholder="Имя" />
                <input type="text" placeholder="Фамилия" />
                <input type="text" placeholder="Телефон" />
                <input type="email" placeholder="name@gmail.com" />
                <input type="password" placeholder="Пароль" />
                <input type="password" placeholder="Повторите пароль" />

                <button className="primary-button">Зарегистрироваться</button>

                <p className="auth-text">
                    У вас уже есть аккаунт? <Link to="/login">Войти</Link>
                </p>
                <Link to="/" className="back-link">Вернуться</Link>
            </div>
        </div>
    );
};

export default RegisterPage;
