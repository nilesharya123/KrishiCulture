import React, { useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import AuthCallback from './pages/AuthCallback';
import CompleteProfile from './pages/CompleteProfile';
import PrivateRoute from './components/PrivateRoute';
import useStore from './store/useStore';
import Marketplace from './pages/Marketplace';
import Community from './pages/Community';
import CreateProduct from './pages/CreateProduct';

function App() {
    const { isLiteMode, user, token, setUser, logout } = useStore();

    React.useEffect(() => {
        const fetchUser = async () => {
            if (token && !user) {
                try {
                    const res = await axios.get('http://localhost:5000/auth/me', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setUser(res.data);
                } catch (error) {
                    console.error('Failed to fetch user', error);
                    if (error.response && error.response.status === 401) {
                        logout(); // Token invalid
                    }
                }
            }
        };
        fetchUser();
    }, [token, user, setUser, logout]);

    return (
        <Router>
            <div className={`min-h-screen transition-colors duration-300 ${isLiteMode ? 'bg-white' : 'bg-gray-50'}`}>
                <Navbar />

                <main className="container mx-auto py-6 px-4">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/auth/callback" element={<AuthCallback />} />

                        {/* Protected Routes */}
                        <Route element={<PrivateRoute />}>
                            <Route path="/complete-profile" element={<CompleteProfile />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/marketplace" element={<Marketplace />} />
                            <Route path="/community" element={<Community />} />
                            <Route path="/create-product" element={<CreateProduct />} />
                            {/* Redirect root to dashboard */}
                            <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        </Route>
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;
