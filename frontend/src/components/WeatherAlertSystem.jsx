import React from 'react';
import { CloudRain, AlertTriangle } from 'lucide-react';
import useStore from '../store/useStore';

const WeatherAlertSystem = () => {
    const { isOffline } = useStore();

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-krishi-green mb-4 flex items-center gap-2">
                <CloudRain className="w-5 h-5" />
                Weather Alerts
            </h3>

            {isOffline ? (
                <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 mt-0.5" />
                    <div>
                        <p className="font-bold">Offline Mode</p>
                        <p className="text-sm">Showing last known cached weather data.</p>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-blue-50 text-blue-800 rounded-lg">
                        <span className="font-medium">Tomorrow</span>
                        <span className="text-sm bg-blue-100 px-2 py-1 rounded">Rain Expected</span>
                    </div>
                    <p className="text-sm text-gray-600">
                        Advisory: Heavy rain expected in your region. Ensure good drainage.
                    </p>
                </div>
            )}
        </div>
    );
};

export default WeatherAlertSystem;
