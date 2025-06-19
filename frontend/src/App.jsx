import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import './index.css';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import AdminProductsPage from "./pages/AdminProductsPage";
import AdminConsultationsPage from "./pages/AdminConsultationsPage";
import ProfilePage from "./pages/ProfilePage";
import Footer from "./components/Footer";

function App() {
    return (
        <Router>
            <div className="app-container">
                <Header />
                <main className="main-layout">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/product" element={<AdminProductsPage />} />
                        <Route path="/consultations" element={<AdminConsultationsPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
