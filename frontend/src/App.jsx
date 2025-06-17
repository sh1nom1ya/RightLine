import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AdminProductsPage from "./pages/AdminProductsPage";
import AdminConsultationsPage from "./pages/AdminConsultationsPage";

const App = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/product" element={<AdminProductsPage />} />
                <Route path="/consultations" element={<AdminConsultationsPage />} />
            </Routes>
            <Footer />
        </>
    );
};

export default App;
