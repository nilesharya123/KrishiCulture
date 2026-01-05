import React from 'react';
import { ToggleLeft, ToggleRight, WifiOff, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';

const Navbar = () => {
    const { isLiteMode, toggleLiteMode, isOffline, logout, user } = useStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className={`shadow-sm px-4 py-3 flex justify-between items-center sticky top-0 z-50 transition-colors ${isLiteMode ? 'bg-white border-b border-gray-200' : 'bg-white/80 backdrop-blur-md border-b border-white/20'}`}>
            <div className="flex items-center gap-2">
                <Link to="/dashboard" className="text-xl font-bold text-krishi-green tracking-tight hover:opacity-80 transition-opacity">
                    KRISHICULTURE
                </Link>
                {isOffline && (
                    <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
                        <WifiOff className="w-3 h-3" /> Offline
                    </span>
                )}
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={toggleLiteMode}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-krishi-green transition-colors"
                >
                    {isLiteMode ? (
                        <>
                            <ToggleRight className="w-6 h-6 text-krishi-green" />
                            <span className="hidden sm:inline font-medium">Lite On</span>
                        </>
                    ) : (
                        <>
                            <ToggleLeft className="w-6 h-6 text-gray-400" />
                            <span className="hidden sm:inline">Lite Mode</span>
                        </>
                    )}
                </button>

                {user && (
                    <div className="flex items-center gap-4">
                        <Link to="/complete-profile" className="w-8 h-8 rounded-full bg-krishi-green/10 flex items-center justify-center text-krishi-green hover:bg-krishi-green hover:text-white transition-colors">
                            <User className="w-5 h-5" />
                        </Link>
                        <button onClick={handleLogout} className="text-sm text-red-500 hover:text-red-700 font-medium">
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
