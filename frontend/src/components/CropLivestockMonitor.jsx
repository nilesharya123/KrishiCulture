import React, { useState } from 'react';
import { Camera } from 'lucide-react';

const CropLivestockMonitor = () => {
    const [analyzing, setAnalyzing] = useState(false);

    const handleScan = () => {
        setAnalyzing(true);
        // Simulate AI analysis delay
        setTimeout(() => {
            setAnalyzing(false);
            alert("AI Diagnostics: Crop appears healthy!");
        }, 2000);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-krishi-green mb-4 flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Crop & Livestock Monitor
            </h3>
            <div className="text-center p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                <button
                    onClick={handleScan}
                    disabled={analyzing}
                    className="bg-krishi-green hover:bg-green-800 text-white font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105 flex items-center gap-2 mx-auto disabled:opacity-50"
                >
                    {analyzing ? 'Analyzing...' : 'Scan Now'}
                </button>
                <p className="mt-4 text-sm text-gray-500">
                    Upload or take a photo for AI-based disease detection.
                </p>
            </div>
        </div>
    );
};

export default CropLivestockMonitor;
