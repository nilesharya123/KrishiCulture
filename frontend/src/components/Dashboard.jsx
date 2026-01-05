import React from 'react';
import CropLivestockMonitor from './CropLivestockMonitor';
import WeatherAlertSystem from './WeatherAlertSystem';
import MarketplaceCommunity from './MarketplaceCommunity';
import useStore from '../store/useStore';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { isLiteMode } = useStore();

    if (isLiteMode) {
        return (
            <div className="p-4 space-y-4 max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold border-b pb-2">KrishiCulture Lite</h2>

                <section>
                    <h3 className="font-bold text-lg">Quick Actions</h3>
                    <ul className="list-disc pl-5 mt-2">
                        <li><button className="text-blue-600 underline">Scan Crop (Text Upload)</button></li>
                        <li><button className="text-blue-600 underline">Check Weather</button></li>
                        <li><Link to="/marketplace" className="text-blue-600 underline">Browse Market List</Link></li>
                    </ul>
                </section>

                <section className="bg-gray-100 p-2 rounded">
                    <p className="text-sm"><b>Status:</b> You are in Lite Mode for better performance.</p>
                </section>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-4 space-y-6">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Welcome, Farmer</h1>
                <p className="text-gray-600">Your smart agriculture dashboard</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <CropLivestockMonitor />
                    <MarketplaceCommunity />
                </div>
                <div className="lg:col-span-1">
                    <WeatherAlertSystem />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
