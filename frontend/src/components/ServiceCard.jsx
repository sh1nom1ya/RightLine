import React from "react";
import "./ServiceCard.css";
import trashIcon from "../assets/trash.png";

const colors = ["#05BDC9", "#FFFFFF", "#FFFFFF", "#0C8FF8"];
const textColors = ["#FFFFFF", "#05BDC9", "#0C8FF8", "#FFFFFF"];
const outlineColors = ["#05BDC9", "#05BDC9", "#0C8FF8", "#0C8FF8"];
const fontColors = ["#FFFFFF", "#000000", "#000000", "#FFFFFF"];

const ServiceCard = ({
                         title,
                         description,
                         image,
                         index,
                         isAdmin,
                         onEdit,
                         onDelete,
                         onDetails,
                     }) => {
    const bgColor = colors[index % colors.length];
    const textColor = textColors[index % textColors.length];
    const outlineColor = outlineColors[index % outlineColors.length];
    const fontColor = fontColors[index % fontColors.length];

    return (
        <div className="card" style={{ backgroundColor: bgColor, outline: `3px solid ${outlineColor}`, outlineOffset: "-3px" }}>
            <div className="card-header" style={{ color: textColor }}>
                {title}
            </div>

            <div className="card-body">
                <div className="card-info">
                    <p style={{color: fontColor}}>{description}</p>

                    {isAdmin ? (
                        <div className="admin-buttons">
                            <button className="edit-btn" onClick={onEdit}>Изменить</button>
                            <button className="delete-btn" onClick={onDelete}>
                                <img src={trashIcon} alt="Удалить" />
                            </button>
                        </div>
                    ) : (
                        <button className="details-btn" onClick={onDetails}>
                            Подробнее
                        </button>
                    )}
                </div>

                <img src={image} alt={title} className="card-img" />
            </div>
        </div>
    );
};

export default ServiceCard;
