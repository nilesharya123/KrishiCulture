import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './pages/Login';
import AuthCallback from './pages/AuthCallback';
import CompleteProfile from './pages/CompleteProfile';
import PrivateRoute from './components/PrivateRoute';
import useStore from './store/useStore';
import Marketplace from './pages/Marketplace';
import CreateProduct from './pages/CreateProduct';
import { ToggleLeft, ToggleRight, Wifi, WifiOff } from 'lucide-react';

function App() {
    const { isLiteMode, toggleLiteMode, isOffline, logout, user } = useStore();

    return (
        <Router>
            <div className={`min-h-screen ${isLiteMode ? 'bg-white' : 'bg-gray-50'}`}>
                <nav className="bg-white shadow-sm px-4 py-3 flex justify-between items-center sticky top-0 z-50">
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-krishi-green tracking-tight">KRISHICULTURE</span>
                        {isOffline && <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full flex items-center gap-1"><WifiOff className="w-3 h-3" /> Offline</span>}
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleLiteMode}
                            className="flex items-center gap-2 text-sm text-gray-600 hover:text-krishi-green transition-colors"
                        >
                            {isLiteMode ? <ToggleRight className="w-6 h-6 text-krishi-green" /> : <ToggleLeft className="w-6 h-6 text-gray-400" />}
                            <span className="hidden sm:inline">Lite Mode</span>
                        </button>
                        {localStorage.getItem('token') && (
                            <button onClick={() => { logout(); window.location.href = '/login'; }} className="text-sm text-red-600 hover:underline">
                                Logout
                            </button>
                        )}
                    </div>
                </nav>

                <main className="container mx-auto py-6">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/auth/callback" element={<AuthCallback />} />

                        {/* Protected Routes */}
                        <Route element={<PrivateRoute />}>
                            <Route path="/complete-profile" element={<CompleteProfile />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/marketplace" element={<Marketplace />} />
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
