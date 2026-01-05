import React, { useState } from 'react';
import { CloudRain, Wind, Droplets, ArrowRight } from 'lucide-react';
import useStore from '../store/useStore';

const WeatherAlertSystem = () => {
    const { isOffline } = useStore();
    const [selectedDay, setSelectedDay] = useState(0);

    const forecast = [
        { day: 'Today', temp: '24°C', condition: 'Rain', advice: 'Avoid spraying pesticides due to expected rain.', risk: 'High' },
        { day: 'Tomorrow', temp: '22°C', condition: 'Windy', advice: 'Secure greenhouse vents. High wind speeds likely.', risk: 'Medium' },
        { day: 'Wed', temp: '25°C', condition: 'Sunny', advice: 'Optimal day for irrigation and fertilizer application.', risk: 'Low' },
    ];

    if (isOffline) {
        return (
            <div className="h-full flex flex-col justify-center items-center text-center p-6 bg-yellow-50 rounded-xl border border-yellow-200">
                <CloudRain className="w-12 h-12 text-yellow-500 mb-2" />
                <h3 className="font-bold text-yellow-800">You are Offline</h3>
                <p className="text-sm text-yellow-700">Showing cached advice: Check drainage systems.</p>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <CloudRain className="text-krishi-teal" /> Agronomic Forecast
            </h3>

            {/* Main Alert Card */}
            <div className={`flex-1 rounded-xl p-6 mb-4 relative overflow-hidden transition-all ${forecast[selectedDay].risk === 'High' ? 'bg-gradient-to-br from-red-50 to-white border-l-4 border-red-500' : 'bg-gradient-to-br from-green-50 to-white border-l-4 border-green-500'}`}>
                <div className="relative z-10">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1 block">Action Required</span>
                    <p className="text-lg font-bold text-gray-800 mb-2 leading-relaxed">
                        "{forecast[selectedDay].advice}"
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-4">
                        <span className="flex items-center gap-1 bg-white/50 px-2 py-1 rounded-lg"><CloudRain className="w-4 h-4" /> 80% Precip</span>
                        <span className="flex items-center gap-1 bg-white/50 px-2 py-1 rounded-lg"><Wind className="w-4 h-4" /> 15 km/h</span>
                    </div>
                </div>
            </div>

            {/* Daily Selector */}
            <div className="grid grid-cols-3 gap-2">
                {forecast.map((f, i) => (
                    <button
                        key={i}
                        onClick={() => setSelectedDay(i)}
                        className={`p-3 rounded-lg text-center transition-all ${selectedDay === i ? 'bg-krishi-teal text-white shadow-md' : 'bg-white hover:bg-gray-50 text-gray-600'}`}
                    >
                        <p className="text-xs font-bold mb-1">{f.day}</p>
                        <p className="text-sm">{f.temp}</p>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default WeatherAlertSystem;
