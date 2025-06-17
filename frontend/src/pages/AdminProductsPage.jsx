import React, {useState} from "react";
import ServiceCard from "../components/ServiceCard";
import EditForm from "../components/EditForm";
import Modal from "../components/Modal";
import cardphoto from "../assets/card1.jpg";
import './AdminProductsPage.css'

const initialServices = [
    {
        title: "Решения для эквайеров",
        description: "Решения для e-commerce компании Right line предоставляют банкам возможность внедрить прием интернет-платежей с высоким уровнем безопасности. Использование технологии 3-D Secure обеспечивает защиту данных клиентов и предотвращает риски мошеннических операций.",
        extended: "Решения для e-commerce компании Right line предоставляют банкам возможность внедрить прием интернет-платежей с высоким уровнем безопасности. Использование технологии 3-D Secure обеспечивает защиту данных клиентов и предотвращает риски мошеннических операций.Решения для e-commerce компании Right line предоставляют банкам возможность внедрить прием интернет-платежей с высоким уровнем безопасности. Использование технологии 3-D Secure обеспечивает защиту данных клиентов и предотвращает риски мошеннических операций.",
        important: "Это важное сообщение для эквайринговых клиентов.",
        image: cardphoto,
    },
    {
        title: "E-commerce",
        description: "Наши решения помогают банкам расширять эквайринговые сервисы, предлагать клиентам современные, безопасные и удобные способы оплаты, оставаясь в рамках регуляторных требований и соответствовать современным тенденциям рынка.",
        extended: "Подробности об интернет-платежах...",
        important: "Важно: поддержка 3D-Secure и мгновенное зачисление.",
        image: cardphoto,
    },
    {
        title: "Решения для эквайеров",
        description: "Back Office — это система расчета комиссий по транзакциям, созданная для автоматизации взаиморасчетов в рамках процесса эквайринга. Она позволяет гибко настраивать тарифы, расчетные периоды и виды комиссий для финансовых продуктов.",
        extended: "Полное подробное описание...",
        important: "Это важное сообщение для эквайринговых клиентов.",
        image: cardphoto,
    },
    {
        title: "E-commerce",
        description: "Right line имеет обширный опыт в разработке ПО для финансового сектора. Мы предлагаем широкий спектр услуг, включая разработку кастомных программных продуктов, интеграцию существующих систем, а также консультационную поддержку на всех этапах проекта.",
        extended: "Подробности об интернет-платежах...",
        important: "Важно: поддержка 3D-Secure и мгновенное зачисление.",
        image: cardphoto,
    },
];

const AdminProductsPage = () => {
    const [services, setServices] = useState(initialServices);
    const [filteredServices, setFilteredServices] = useState(initialServices);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [isOpen, setIsOpen] = useState(false);
    const [editData, setEditData] = useState(null);

    const handleEdit = (card) => {
        setEditData(card);
        setIsOpen(true);
    };

    const handleDelete = (card) => {
        alert("Удалить " + card.title);
    };

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);

        const filtered = services.filter((item) =>
            item.title.toLowerCase().includes(value)
        );
        setFilteredServices(filtered);
    };

    const handleSort = (order) => {
        const sorted = [...filteredServices].sort((a, b) => {
            const nameA = a.title.toLowerCase();
            const nameB = b.title.toLowerCase();
            return order === "asc" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
        });

        setSortOrder(order);
        setFilteredServices(sorted);
    };

    const handleCreate = () => {
        setEditData(null);
        setIsOpen(true);
    };

    return (
        <>
            <div className="admin-toolbar">
                <input
                    type="text"
                    placeholder="Поиск по названию..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="search-input"
                />

                <div className="sort-buttons">
                    <button onClick={() => handleSort("asc")}>А → Я</button>
                    <button onClick={() => handleSort("desc")}>Я → А</button>
                </div>

                <button className="create-button" onClick={handleCreate}>
                    + Создать продукт
                </button>
            </div>


            <section
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    columnGap: "150px",
                    rowGap: "40px",
                    padding: "20px",
                    minHeight: "77vh",
                }}
            >
                {filteredServices.map((card, index) => (
                    <ServiceCard
                        key={index}
                        {...card}
                        index={index}
                        isAdmin={true}
                        onEdit={() => handleEdit(card)}
                        onDelete={() => handleDelete(card)}
                    />
                ))}
            </section>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} width="800px" height="900px">
                <EditForm
                    data={editData}
                    onSave={(formData) => {
                        const form = new FormData();
                        form.append("title", formData.title);
                        form.append("description", formData.description);
                        form.append("extended", formData.extended);
                        form.append("important", formData.important);
                        if (formData.imageFile) {
                            form.append("imageFile", formData.imageFile);
                        }

                        // Эмуляция сохранения на сервер (можно заменить на fetch)
                        const newCard = {
                            title: formData.title,
                            description: formData.description,
                            extended: formData.extended,
                            important: formData.important,
                            image: formData.imagePreview || cardphoto,
                        };

                        if (editData) {
                            // Редактирование — замена по title (или нужно использовать id)
                            const updated = services.map((s) =>
                                s.title === editData.title ? newCard : s
                            );
                            setServices(updated);
                            setFilteredServices(updated);
                        } else {
                            // Создание — добавление
                            const updated = [...services, newCard];
                            setServices(updated);
                            setFilteredServices(updated);
                        }

                        alert("Сохранено!");
                        setIsOpen(false);
                    }}
                />
            </Modal>
        </>
    );
};

export default AdminProductsPage;
