import React, { useEffect, useState } from 'react';
import CropLivestockMonitor from './CropLivestockMonitor';
import WeatherAlertSystem from './WeatherAlertSystem';
import MarketplaceSnippet from './MarketplaceSnippet';
import CommunitySnippet from './CommunitySnippet';
import useStore from '../store/useStore';
import { Link } from 'react-router-dom';
import { Leaf, Sun, ShoppingBag, MessageCircle } from 'lucide-react';

const Dashboard = () => {
    const { isLiteMode, user } = useStore();
    const [greeting, setGreeting] = useState('Good Morning');

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good Morning');
        else if (hour < 18) setGreeting('Good Afternoon');
        else setGreeting('Good Evening');
    }, []);

    if (isLiteMode) {
        return (
            <div className="p-4 space-y-4 max-w-2xl mx-auto font-system">
                <h2 className="text-2xl font-bold border-b pb-2">KrishiCulture Lite</h2>
                <section>
                    <h3 className="font-bold text-lg">Quick Actions</h3>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li><button className="text-blue-600 underline">Scan Crop (Text Upload)</button></li>
                        <li><button className="text-blue-600 underline">Check Weather</button></li>
                        <li><Link to="/marketplace" className="text-blue-600 underline">Browse Market List</Link></li>
                        <li><Link to="/community" className="text-blue-600 underline">Community Forum</Link></li>
                    </ul>
                </section>
                <section className="bg-gray-100 p-2 rounded">
                    <p className="text-sm"><b>Status:</b> Lite Mode Active</p>
                </section>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-8 animate-fadeIn">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-krishi-teal to-krishi-moss">
                        {greeting}, {user?.fullName?.split(' ')[0] || 'Farmer'}
                    </h1>
                    <p className="text-gray-500 mt-1 font-medium">Here's your farm's intelligent overview today.</p>
                </div>
                <div className="flex gap-3">
                    <div className="px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100 flex items-center gap-2 text-sm text-gray-600">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        System Optimal
                    </div>
                </div>
            </header>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[800px]">

                {/* 1. Crop Monitor (2x2) */}
                <div className="md:col-span-2 md:row-span-2 glass-panel p-6 relative overflow-hidden group">
                    {/* Placeholder for CropLivestockMonitor content until refactored */}
                    <div className="absolute top-0 left-0 w-full h-full -z-10 bg-gradient-to-br from-gray-50 to-gray-100 opacity-50"></div>
                    <CropLivestockMonitor />
                </div>

                {/* 2. Weather System (1x2) */}
                <div className="md:col-span-1 md:row-span-2 glass-panel p-6 bg-gradient-to-b from-blue-50/50 to-white/50">
                    <WeatherAlertSystem />
                </div>

            </div>

            {/* Secondary Grid for Community & Market */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-panel p-6">
                    <MarketplaceSnippet />
                </div>

                <div className="glass-panel p-6">
                    <CommunitySnippet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
