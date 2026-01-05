import React from 'react';
import { ShoppingBag, Users } from 'lucide-react';

import { Link } from 'react-router-dom';

const MarketplaceCommunity = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Marketplace Preview */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-earth-brown mb-4 flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5" />
                    Marketplace
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex justify-between">
                        <span>Organic Fertilizer</span>
                        <span className="font-bold text-krishi-green">₹500</span>
                    </li>
                    <li className="flex justify-between">
                        <span>Wheat Seeds (High Yield)</span>
                        <span className="font-bold text-krishi-green">₹1200</span>
                    </li>
                </ul>
                <Link to="/marketplace" className="mt-4 block w-full text-center text-krishi-green border border-krishi-green rounded-lg py-2 hover:bg-green-50">
                    Visit E-shop
                </Link>
            </div>

            {/* Community Preview */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-earth-brown mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Community
                </h3>
                <div className="space-y-3">
                    <div className="text-sm">
                        <p className="font-bold text-gray-800">Ramesh K.</p>
                        <p className="text-gray-600 truncate">Does anyone know the best time to plant potatoes this season?</p>
                    </div>
                    <div className="text-sm">
                        <p className="font-bold text-gray-800">Sita D.</p>
                        <p className="text-gray-600 truncate">Sharing my success with drip irrigation...</p>
                    </div>
                </div>
                <button className="mt-4 w-full text-center text-krishi-green border border-krishi-green rounded-lg py-2 hover:bg-green-50">
                    Join Discussion
                </button>
            </div>
        </div>
    );
};

export default MarketplaceCommunity;
