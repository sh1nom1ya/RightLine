import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../assets/logo.png";
import profileIcon from "../assets/profile.png";

const Header = () => {
    return (
        <header className="header">
            <div className="nav-block">
                <nav>
                    <Link to="/product">Продукты</Link>
                    <Link to="/consultations">Консультации</Link>
                </nav>
            </div>

            <div className="logo-block">
                <Link to="/">
                    <img src={logo} alt="Right Line" className="logo" />
                </Link>
            </div>

            <div className="profile-block">
                <Link to="/profile">
                    <img src={profileIcon} alt="Профиль" className="profile" />
                </Link>
            </div>
        </header>

    );
};

export default Header;
