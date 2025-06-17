import React from "react";
import "./ServiceDetailsModal.css";

const ServiceDetailsContent = ({ data }) => {
    if (!data) return null;

    return (
        <div className="service-details">
            <div className="service-content">
                <img src={data.image} alt={data.title} className="service-image" />

                <div className="service-text">
                    <h3 className="highlight">{data.title}</h3>
                    <p>{data.extended || "Здесь будет больше информации о решении..."}</p>
                </div>
            </div>

            <div className="bottom-block">
                <h2>
                    {data.important || "Важная информация о решении будет добавлена позже."}
                </h2>
                <button className="order-btn">Заказать</button>
            </div>
        </div>
    );
};

export default ServiceDetailsContent;
