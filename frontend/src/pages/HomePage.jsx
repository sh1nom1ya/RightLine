import React from "react";
import HeroBanner from "../components/HeroBanner";
import ServiceCard from "../components/ServiceCard";
import cardphoto from "/Users/daniilvitkov/WebstormProjects/frontend/src/assets/card1.jpg";

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

const HomePage = () => {
    return (
        <>
            <HeroBanner />
            <section style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", columnGap: "150px", rowGap: "40px", padding: "40px 20px" }}>
                {services.map((card, index) => (
                    <ServiceCard key={index} {...card} index={index} />
                ))}
            </section>
        </>
    );
};

export default HomePage;
