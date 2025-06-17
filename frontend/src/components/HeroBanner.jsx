import React, { useState } from "react";
import "./HeroBanner.css";
import bannerImage from "../assets/banner.png";
import Modal from "./Modal";
import RequestForm from "./RequestForm";

const HeroBanner = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <section className="hero">
                <div className="hero-text">
                    <h1>IT-решения для банков и финансовых организаций</h1>
                    <button onClick={() => setIsOpen(true)}>Заказать консультацию</button>
                </div>
                <img src={bannerImage} alt="баннер" className="hero-image" />
            </section>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <RequestForm />
            </Modal>
        </>
    );
};

export default HeroBanner;
