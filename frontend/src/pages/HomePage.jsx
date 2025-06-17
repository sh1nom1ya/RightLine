import React, { useState } from "react";
import HeroBanner from "../components/HeroBanner";
import ServiceCard from "../components/ServiceCard";
import Modal from "../components/Modal";
import ServiceDetailsContent from "../components/ServiceDetailsModal";
import cardphoto from "../assets/card1.jpg"; // используем относительный путь

const services = [
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

const HomePage = () => {
    const [selectedCard, setSelectedCard] = useState(null);

    return (
        <>
            <HeroBanner />

            <section
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    columnGap: "120px",
                    rowGap: "40px",
                    padding: "40px 20px",
                }}
            >
                {services.map((card, index) => (
                    <ServiceCard
                        key={index}
                        {...card}
                        index={index}
                        onDetails={() => setSelectedCard(card)}
                    />
                ))}
            </section>

            <Modal isOpen={!!selectedCard} onClose={() => setSelectedCard(null)} width="1000px">
                <ServiceDetailsContent data={selectedCard} />
            </Modal>
        </>
    );
};

export default HomePage;
