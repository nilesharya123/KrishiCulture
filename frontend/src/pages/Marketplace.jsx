import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingBag, Search, Filter, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/marketplace/ProductCard';

const Marketplace = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/products');
                setProducts(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-8 animate-fadeIn">
            {/* Header with Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                        <ShoppingBag className="w-8 h-8 text-krishi-clay" /> Marketplace
                    </h2>
                    <p className="text-gray-500">Buy and sell authentic agricultural products.</p>
                </div>

                <div className="flex gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search seeds, tools, machinery..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-krishi-teal focus:outline-none"
                        />
                    </div>
                    <Link
                        to="/create-product"
                        className="bg-krishi-green text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-green-700 shadow-lg shadow-green-900/20 transition-all"
                    >
                        <Plus className="w-5 h-5" /> Sell <span className="hidden sm:inline">Product</span>
                    </Link>
                </div>
            </div>

            {/* Filter Tags (Mockup) */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {['All', 'Seeds', 'Fertilizers', 'Machinery', 'Vegetables', 'Services'].map((tag) => (
                    <button key={tag} className="px-4 py-1.5 rounded-full bg-white border border-gray-200 text-sm font-medium text-gray-600 hover:border-krishi-teal hover:text-krishi-teal whitespace-nowrap transition-colors">
                        {tag}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((n) => (
                        <div key={n} className="h-80 bg-gray-100 rounded-xl animate-pulse"></div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center text-gray-500">
                            <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-20" />
                            <p>No products found matching "{searchTerm}"</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Marketplace;
