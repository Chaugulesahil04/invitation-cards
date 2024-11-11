import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SeeTemplates from './pages/SeeTemplates';
import EditTemplate from './pages/EditTemplate';
import './styles/App.css';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/see-templates" element={<SeeTemplates />} />
                <Route path="/edit-template" element={<EditTemplate />} />
            </Routes>
        </Router>
    );
}

export default App;
