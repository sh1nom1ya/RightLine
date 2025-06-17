import React from "react";
import logo from "../assets/logof.png";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <img src={logo} alt="Right Line" />
            <p>2025 Right Line все права защищены</p>
        </footer>
    );
};

export default Footer;
