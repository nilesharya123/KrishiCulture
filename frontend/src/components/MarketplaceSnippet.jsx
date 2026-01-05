import React, { useRef } from 'react';
import { ShoppingBag, ChevronRight, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const MarketplaceSnippet = () => {
    const scrollRef = useRef(null);

    const products = [
        { id: 1, name: 'Organic Fertilizer', price: '₹500', distance: '2km', img: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?q=80&w=300&auto=format&fit=crop' },
        { id: 2, name: 'Wheat Seeds', price: '₹1200', distance: '5km', img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=300&auto=format&fit=crop' },
        { id: 3, name: 'Tractor Rent', price: '₹800/hr', distance: '10km', img: 'https://images.unsplash.com/photo-1595180373070-5db9582d92d4?q=80&w=300&auto=format&fit=crop' },
        { id: 4, name: 'Pesticide Sprayer', price: '₹2500', distance: '12km', img: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=300&auto=format&fit=crop' },
        { id: 5, name: 'Solar Pump', price: '₹15000', distance: '15km', img: 'https://images.unsplash.com/photo-1599583647363-2396d830b8bf?q=80&w=300&auto=format&fit=crop' },
    ];

    const scroll = (offset) => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft += offset;
        }
    };

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                    <ShoppingBag className="text-krishi-clay" /> Marketplace
                </h3>
                <div className="flex gap-2">
                    <button onClick={() => scroll(-200)} className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600"><ChevronLeft className="w-4 h-4" /></button>
                    <button onClick={() => scroll(200)} className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600"><ChevronRight className="w-4 h-4" /></button>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {products.map((product) => (
                    <Link to="/marketplace" key={product.id} className="min-w-[140px] snap-start group cursor-pointer block">
                        <div className="h-32 w-full rounded-xl overflow-hidden mb-2 relative">
                            <img
                                src={product.img}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                loading="lazy"
                            />
                            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-2">
                                <span className="text-white font-bold text-sm block">{product.price}</span>
                            </div>
                        </div>
                        <h4 className="font-medium text-gray-800 text-sm truncate">{product.name}</h4>
                        <p className="text-xs text-gray-500">{product.distance} away</p>
                    </Link>
                ))}
            </div>

            <Link to="/marketplace" className="mt-auto text-center text-sm text-krishi-teal hover:underline py-2">View All Products</Link>
        </div>
    );
};

export default MarketplaceSnippet;
