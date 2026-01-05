import React, { useState } from 'react';
import { Tag, MapPin, User, ArrowRight } from 'lucide-react';

const ProductCard = ({ product }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <div className="glass-panel group relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-krishi-teal/20">
            {/* Image Container with Progressive Loading */}
            <div className="relative h-48 overflow-hidden rounded-t-xl bg-gray-200">
                {!imageLoaded && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                        <span className="text-gray-400 text-sm">Loading...</span>
                    </div>
                )}
                <img
                    src={product.image ? `http://localhost:5000${product.image}` : 'https://placehold.co/400x300?text=No+Image'}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${imageLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-lg'}`}
                    onLoad={() => setImageLoaded(true)}
                />
                <div className="absolute top-2 right-2 bg-black/50 backdrop-blur text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <Tag className="w-3 h-3" /> {product.category}
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1 group-hover:text-krishi-teal transition-colors">
                    {product.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                    {product.description}
                </p>

                <div className="flex items-end justify-between">
                    <div>
                        <div className="flex items-center gap-1 text-xs text-gray-400 mb-1">
                            <User className="w-3 h-3" /> {product.seller?.fullName || 'Seller'}
                        </div>
                        <p className="text-xl font-bold text-krishi-teal">
                            ₹{product.price}
                        </p>
                    </div>
                    <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-krishi-teal hover:text-white transition-colors">
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
