import React, { useState, useEffect } from 'react';
import './EditForm.css';

const EditForm = ({ data = {}, onSave }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        extended: '',
        important: '',
        imageFile: null,
        imagePreview: '', // base64 для превью
    });

    useEffect(() => {
        if (data) {
            setFormData((prev) => ({
                ...prev,
                title: data.title || '',
                description: data.description || '',
                extended: data.extended || '',
                important: data.important || '',
                imageFile: null, 
                imagePreview: data.image || '',
            }));
        }
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({
                    ...prev,
                    imageFile: file,
                    imagePreview: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        onSave(formData); // передаём объект с imageFile!
    };

    return (
        <div className="edit-form">
            <h2>Редактирование / Создание</h2>

            <div className="form-top">
                <div className="form-left">
                    <label>Название</label>
                    <input
                        name="title"
                        type="text"
                        value={formData.title}
                        onChange={handleChange}
                    />

                    <label>Краткое описание</label>
                    <textarea
                        name="description"
                        rows={9}
                        style={{ resize: "none" }}
                        value={formData.description}
                        onChange={handleChange}
                    />

                    <label>Важное</label>
                    <textarea
                        name="important"
                        rows={6}
                        style={{ resize: "none" }}
                        value={formData.important}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-right">
                    <label>Фото</label>
                    {formData.imagePreview && (
                        <img
                            src={formData.imagePreview}
                            alt="preview"
                            className="preview-img"
                        />
                    )}

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ marginTop: "10px" }}
                    />
                </div>
            </div>

            <div className="form-bottom">
                <label>Описание</label>
                <textarea
                    name="extended"
                    rows={16}
                    value={formData.extended}
                    onChange={handleChange}
                />

                <button onClick={handleSubmit}>Сохранить</button>
            </div>
        </div>
    );
};

export default EditForm;
