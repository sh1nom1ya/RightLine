import React, {useState} from "react";
import ServiceCard from "../components/ServiceCard";
import EditForm from "../components/EditForm";
import Modal from "../components/Modal";
import cardphoto from "../assets/card1.jpg";

const services = [
    {
        title: "E-commerce",
        description: "Решения для e-commerce компаний Right line предоставляют банкам возможность внедрить прием интернет-платежей с высоким уровнем безопасности...",
        image: cardphoto,
    },
    {
        title: "Решения для эквайеров",
        description: "Наши решения помогают банкам расширять эквайринговые сервисы, предлагать клиентам современные, безопасные и удобные способы оплаты...",
        image: cardphoto,
    },
    {
        title: "Back office",
        description: "Back Office — это система расчета комиссий и транзакций, созданная для автоматизации взаиморасчетов в пользовательской интерфейсе...",
        image: cardphoto,
    },
    {
        title: "Заказная разработка",
        description: "Right line имеет обширный опыт в разработке ПО для финансового сектора. Мы предлагаем широкий спектр по заказной разработке...",
        image: cardphoto,
    },
];

const AdminProductsPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [editData, setEditData] = useState(null);

    const handleEdit = (card) => {
        setEditData(card);
        setIsOpen(true);
    };

    const handleDelete = (card) => {
        alert("Удалить " + card.title);
    };

    return (
        <>
            <section style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", columnGap: "150px", rowGap: "40px", padding: "40px 20px" }}>
                {services.map((card, index) => (
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
                    onSave={() => {
                        alert("Сохранено!");
                        setIsOpen(false);
                    }}
                />
            </Modal>
        </>
    );
};

export default AdminProductsPage;
