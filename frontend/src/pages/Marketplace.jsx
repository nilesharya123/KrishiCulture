import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingBag, Tag, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Marketplace = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-earth-brown flex items-center gap-2">
                    <ShoppingBag className="w-6 h-6" /> Marketplace
                </h2>
                <Link
                    to="/create-product"
                    className="bg-krishi-green text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
                >
                    <Plus className="w-5 h-5" /> Sell Product
                </Link>
            </div>

            {loading ? (
                <p>Loading products...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div key={product._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                            {product.image ? (
                                <img src={`http://localhost:5000${product.image}`} alt={product.name} className="w-full h-48 object-cover" />
                            ) : (
                                <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">
                                    No Image
                                </div>
                            )}
                            <div className="p-4 flex-grow">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-gray-900 line-clamp-1">{product.name}</h3>
                                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded inline-flex items-center gap-1">
                                        <Tag className="w-3 h-3" /> {product.category}
                                    </span>
                                </div>
                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                                <div className="flex justify-between items-end mt-auto">
                                    <div>
                                        <p className="text-gray-500 text-xs">Seller: {product.seller?.fullName || 'Unknown'}</p>
                                        <p className="text-lg font-bold text-krishi-green">₹{product.price}</p>
                                    </div>
                                    <button className="text-sm border border-krishi-green text-krishi-green px-3 py-1 rounded hover:bg-green-50">
                                        Contact
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Marketplace;
