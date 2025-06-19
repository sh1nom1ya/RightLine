import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../assets/logo.png";
import profileIcon from "../assets/profile.png";
import { useAuth } from "../context/AuthContext";

const Header = () => {
    const { isAuthenticated, roles } = useAuth();
    const isAdmin = roles.includes('Admin');

    return (
        <header className="header">
            <div className="nav-block">
                <nav>
                    {isAdmin && (
                        <>
                            <Link to="/product">Продукты</Link>
                            <Link to="/consultations">Консультации</Link>
                        </>
                    )}
                </nav>
            </div>

            <div className="logo-block">
                <Link to="/">
                    <img src={logo} alt="Right Line" className="logo" />
                </Link>
            </div>

            <div className="profile-block">
                <Link to={isAuthenticated ? "/profile" : "/login"}>
                    <img src={profileIcon} alt="Профиль" className="profile" />
                </Link>
            </div>
        </header>
    );
};

export default Header;
