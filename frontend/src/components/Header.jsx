import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "/Users/daniilvitkov/WebstormProjects/frontend/src/assets/logo.png";
import profileIcon from "/Users/daniilvitkov/WebstormProjects/frontend/src/assets/profile.png";

const Header = () => {
    return (
        <header className="header">
            <nav>
                <Link to="/product">Продукты</Link>
                <Link to="/">Консультации</Link>
            </nav>
            <img src={logo} alt="Right Line" className="logo" />
            <img src={profileIcon} alt="Профиль" className="profile" />
        </header>
    );
};

export default Header;
