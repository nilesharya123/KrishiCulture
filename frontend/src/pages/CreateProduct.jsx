import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import { ImagePlus, Camera, Sparkles, Tag, Check, X } from 'lucide-react';

const CreateProduct = () => {
    const navigate = useNavigate();
    const { token } = useStore();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Seeds',
        stock: ''
    });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [aiTags, setAiTags] = useState([]);
    const [isTagging, setIsTagging] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
            simulateAutoTagging();
        }
    };

    const simulateAutoTagging = () => {
        setIsTagging(true);
        setTimeout(() => {
            setAiTags(['Organic', 'High Yield', 'Certified']);
            setIsTagging(false);
        }, 1500);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (image) data.append('image', image);
        // Note: AI tags are simulated and not sent to backend in this version

        try {
            await axios.post('http://localhost:5000/api/products', data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate('/marketplace');
        } catch (error) {
            console.error('Error creating product:', error);
            alert('Failed to create listing');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-3xl w-full glass-panel p-8 relative">
                <button onClick={() => navigate('/marketplace')} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                    <X className="w-6 h-6" />
                </button>

                <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
                    <Sparkles className="text-krishi-teal" /> Sell Your Harvest
                </h2>
                <p className="text-gray-400 mb-8">List your produce or equipment for thousands of buyers.</p>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Left Column: Image & AI Tags */}
                    <div className="space-y-6">
                        <div className="relative group">
                            <div className={`h-64 rounded-2xl border-2 border-dashed border-gray-600 flex flex-col items-center justify-center bg-gray-800/50 overflow-hidden transition-colors ${!preview && 'hover:bg-gray-700/50 hover:border-gray-500'}`}>
                                {preview ? (
                                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="text-center p-4">
                                        <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 text-krishi-teal">
                                            <Camera className="w-8 h-8" />
                                        </div>
                                        <p className="text-gray-300 font-medium">Click to Upload Photo</p>
                                        <p className="text-xs text-gray-500 mt-2">Supports JPG, PNG</p>
                                    </div>
                                )}
                                <input type="file" onChange={handleImageChange} accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" />
                            </div>
                            {preview && (
                                <button type="button" onClick={() => { setImage(null); setPreview(null); setAiTags([]) }} className="absolute top-2 right-2 bg-red-500/80 p-1.5 rounded-full text-white hover:bg-red-600 transition-colors">
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        {/* AI Auto-Tagging Section */}
                        {(preview || isTagging) && (
                            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="text-sm font-bold text-gray-300 flex items-center gap-2">
                                        <Sparkles className="w-4 h-4 text-krishi-teal" /> AI Auto-Tags
                                    </h4>
                                    {isTagging && <span className="text-xs text-krishi-teal animate-pulse">Analyzing...</span>}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {isTagging ? (
                                        [1, 2, 3].map(i => <div key={i} className="h-6 w-16 bg-gray-700 rounded-full animate-pulse"></div>)
                                    ) : (
                                        aiTags.map((tag, i) => (
                                            <span key={i} className="px-3 py-1 bg-krishi-teal/20 text-krishi-teal text-xs font-bold rounded-full border border-krishi-teal/30 flex items-center gap-1 animate-fadeIn">
                                                <Tag className="w-3 h-3" /> {tag}
                                            </span>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Form Details */}
                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Product Name</label>
                            <input type="text" name="name" onChange={handleChange} required
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-krishi-teal focus:outline-none"
                                placeholder="e.g. Fresh Tomatoes"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Price (₹)</label>
                                <input type="number" name="price" onChange={handleChange} required
                                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-krishi-teal focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Stock Qty</label>
                                <input type="number" name="stock" onChange={handleChange}
                                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-krishi-teal focus:outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Category</label>
                            <select name="category" onChange={handleChange}
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-krishi-teal focus:outline-none"
                            >
                                <option value="Seeds">Seeds</option>
                                <option value="Tools">Farming Tools</option>
                                <option value="Fertilizer">Fertilizers</option>
                                <option value="Produce">Harvested Produce</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Description</label>
                            <textarea name="description" rows="4" onChange={handleChange}
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-krishi-teal focus:outline-none resize-none"
                                placeholder="Describe quality, origin, etc."
                            ></textarea>
                        </div>

                        <button type="submit" className="w-full py-3 bg-krishi-teal hover:bg-teal-600 text-white font-bold rounded-xl shadow-lg shadow-teal-900/50 flex items-center justify-center gap-2 transition-all transform active:scale-95">
                            <Check className="w-5 h-5" /> Publish Listing
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;
