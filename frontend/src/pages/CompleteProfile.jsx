import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useStore from '../store/useStore';

const CompleteProfile = () => {
    const navigate = useNavigate();
    const { token, setIsProfileComplete } = useStore();
    const [formData, setFormData] = useState({
        mobile: '',
        language: 'en',
        state: '',
        district: '',
        role: 'farmer',
        landSize: '',
        farmingType: 'crop',
        experienceYears: 0
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/auth/complete-profile', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setIsProfileComplete(true);
            navigate('/dashboard');
        } catch (error) {
            console.error('Profile Update Failed', error);
            alert('Failed to update profile. Please try again.');
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
            <h2 className="text-2xl font-bold mb-6 text-krishi-green">Complete Your Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                    <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                    <input type="text" name="mobile" onChange={handleChange} required className="w-full p-2 border rounded" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Generic Language</label>
                        <select name="language" onChange={handleChange} className="w-full p-2 border rounded">
                            <option value="en">English</option>
                            <option value="hi">Hindi</option>
                            <option value="te">Telugu</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <select name="role" onChange={handleChange} className="w-full p-2 border rounded">
                            <option value="farmer">Farmer</option>
                            <option value="expert">Agricultural Expert</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">State</label>
                        <input type="text" name="state" onChange={handleChange} required className="w-full p-2 border rounded" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">District</label>
                        <input type="text" name="district" onChange={handleChange} required className="w-full p-2 border rounded" />
                    </div>
                </div>

                {formData.role === 'farmer' && (
                    <div className="bg-green-50 p-4 rounded-lg space-y-4 border border-green-100">
                        <h3 className="font-semibold text-green-800">Farm Details</h3>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Land Size (Acres/Hectares)</label>
                            <input type="text" name="landSize" onChange={handleChange} className="w-full p-2 border rounded" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Farming Type</label>
                                <select name="farmingType" onChange={handleChange} className="w-full p-2 border rounded">
                                    <option value="crop">Crop Farming</option>
                                    <option value="livestock">Livestock Farming</option>
                                    <option value="both">Mixed</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
                                <input type="number" name="experienceYears" onChange={handleChange} className="w-full p-2 border rounded" />
                            </div>
                        </div>
                    </div>
                )}

                <button type="submit" className="w-full bg-krishi-green text-white p-3 rounded-lg font-bold hover:bg-green-700">
                    Save & Continue
                </button>
            </form>
        </div>
    );
};

export default CompleteProfile;
