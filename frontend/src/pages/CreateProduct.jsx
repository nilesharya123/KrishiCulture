import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import { ImagePlus } from 'lucide-react';

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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (image) data.append('image', image);

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
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-krishi-green">List a New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <input type="text" name="name" onChange={handleChange} required className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-krishi-green" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                        <input type="number" name="price" onChange={handleChange} required className="w-full p-2 border rounded-lg" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                        <input type="number" name="stock" onChange={handleChange} className="w-full p-2 border rounded-lg" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select name="category" onChange={handleChange} className="w-full p-2 border rounded-lg">
                        <option value="Seeds">Seeds</option>
                        <option value="Tools">Farming Tools</option>
                        <option value="Fertilizer">Fertilizers</option>
                        <option value="Produce">Harvested Produce</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea name="description" rows="3" onChange={handleChange} className="w-full p-2 border rounded-lg"></textarea>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors relative cursor-pointer">
                        <input type="file" onChange={handleImageChange} accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                        {preview ? (
                            <img src={preview} alt="Preview" className="h-40 mx-auto object-contain" />
                        ) : (
                            <div className="text-gray-500">
                                <ImagePlus className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                                <span className="text-sm">Click to upload image</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex gap-4 pt-4">
                    <button type="button" onClick={() => navigate('/marketplace')} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
                    <button type="submit" className="flex-1 px-4 py-2 bg-krishi-green text-white rounded-lg hover:bg-green-700 font-medium">Create Listing</button>
                </div>
            </form>
        </div>
    );
};

export default CreateProduct;
