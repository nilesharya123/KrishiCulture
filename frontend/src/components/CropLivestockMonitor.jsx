import React, { useState } from 'react';
import { Camera, Scan, Activity, Droplets, Thermometer, AlertCircle } from 'lucide-react';
import satelliteMap from '../assets/satellite-map.png';

const CropLivestockMonitor = () => {
    const [selectedZone, setSelectedZone] = useState(null);

    const zones = [
        { id: 'A', x: '20%', y: '30%', health: 'Critical', color: 'bg-red-500', moisture: '30%', nitrogen: 'Low' },
        { id: 'B', x: '60%', y: '40%', health: 'Good', color: 'bg-green-500', moisture: '65%', nitrogen: 'Optimal' },
        { id: 'C', x: '40%', y: '70%', health: 'Warning', color: 'bg-yellow-500', moisture: '45%', nitrogen: 'Moderate' },
    ];

    return (
        <div className="w-full h-full relative">
            <div className="absolute top-4 left-4 z-20 bg-black/40 backdrop-blur-md p-3 rounded-lg border border-white/10">
                <h3 className="text-white font-bold flex items-center gap-2">
                    <Activity className="text-krishi-teal w-5 h-5" /> Crop Health Index
                </h3>
                <p className="text-xs text-gray-300">Live Satellite Feed • Updated 10m ago</p>
            </div>

            {/* Satellite Image Container */}
            <div className="w-full h-[400px] md:h-full relative overflow-hidden rounded-xl">
                <img src={satelliteMap} alt="Satellite View" className="w-full h-full object-cover" />

                {/* Tech Grid Overlay */}
                <div className="absolute inset-0 bg-[url('https://grain-ui.vercel.app/grid.svg')] opacity-20 pointer-events-none"></div>

                {/* Interactive Zones */}
                {zones.map((zone) => (
                    <button
                        key={zone.id}
                        onClick={() => setSelectedZone(zone)}
                        className={`absolute w-8 h-8 rounded-full border-2 border-white shadow-[0_0_15px_rgba(255,255,255,0.5)] flex items-center justify-center transition-all hover:scale-125 focus:scale-125 z-10 animate-pulse ${zone.color} ${selectedZone?.id === zone.id ? 'scale-150 ring-4 ring-white/30' : ''}`}
                        style={{ top: zone.y, left: zone.x }}
                    >
                        <span className="text-[10px] font-bold text-white">{zone.id}</span>
                    </button>
                ))}
            </div>

            {/* Zone Details Pop-up */}
            {selectedZone && (
                <div className="absolute bottom-4 right-4 z-30 w-64 glass-panel p-4 animate-slideUp bg-gray-900/90 border-gray-700">
                    <div className="flex justify-between items-start mb-2">
                        <h4 className="text-white font-bold">Zone {selectedZone.id} Analysis</h4>
                        <button onClick={() => setSelectedZone(null)} className="text-gray-400 hover:text-white text-xs">Close</button>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-400 flex items-center gap-1"><Activity className="w-3 h-3" /> Health</span>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded ${selectedZone.color === 'bg-red-500' ? 'text-red-400 bg-red-900/20' : selectedZone.color === 'bg-green-500' ? 'text-green-400 bg-green-900/20' : 'text-yellow-400 bg-yellow-900/20'}`}>
                                {selectedZone.health}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-400 flex items-center gap-1"><Droplets className="w-3 h-3" /> Moisture</span>
                            <span className="text-xs text-white font-mono">{selectedZone.moisture}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-400 flex items-center gap-1"><Thermometer className="w-3 h-3" /> N-Levels</span>
                            <span className="text-xs text-white font-mono">{selectedZone.nitrogen}</span>
                        </div>
                    </div>
                </div>
            )}

            <div className="absolute bottom-4 left-4 z-20">
                <button className="bg-krishi-teal/90 backdrop-blur hover:bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 shadow-lg transition-all">
                    <Scan className="w-4 h-4" /> AI Diagnostics Scan
                </button>
            </div>
        </div>
    );
};

export default CropLivestockMonitor;
