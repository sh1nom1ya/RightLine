import React from 'react';
import './EditForm.css';

const EditForm = ({ data = {}, onSave }) => {
    return (
        <div className="edit-form">
            <h2>Редактирование / Создание</h2>

            <div className="form-top">
                <div className="form-left">
                    <label>Название</label>
                    <input type="text" defaultValue={data.title || ''} />

                    <label>Краткое описание</label>
                    <textarea rows={9} style={{resize:"none"}} defaultValue={data.short || ''}></textarea>

                    <label>Важное</label>
                    <textarea rows={6} style={{resize:"none"}} defaultValue={data.important || ''}></textarea>
                </div>

                <div className="form-right">
                    <label>Фото</label>
                    <img src={data.image || "./assets/card1.jpg"} alt="preview" className="preview-img" />
                </div>
            </div>

            <div className="form-bottom">
                <label>Описание</label>
                <textarea rows={16} defaultValue={data.description || ''}></textarea>

                <button onClick={onSave}>Сохранить</button>
            </div>
        </div>
    );
};

export default EditForm;
