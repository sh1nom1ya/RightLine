import React, { useState } from "react";
import "./HeroBanner.css";
import bannerImage from "../assets/banner.png";
import Modal from "./Modal";
import RequestForm from "./RequestForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const HeroBanner = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { roles } = useAuth();
    const isAdmin = roles.includes("Admin");

    const handleClick = () => {
        if (isAdmin) {
            navigate("/consultations");
        } else {
            setIsOpen(true);
        }
    };

    return (
        <>
            <section className="hero">
                <div className="hero-text">
                    <h1>IT-решения для банков и финансовых организаций</h1>
                    <button onClick={handleClick}>Заказать консультацию</button>
                </div>
                <img src={bannerImage} alt="баннер" className="hero-image" />
            </section>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <RequestForm onSuccess={() => setIsOpen(false)} />
            </Modal>
        </>
    );
};

export default HeroBanner;
