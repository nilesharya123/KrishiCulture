import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useStore from '../store/useStore';
import { User, MapPin, Sprout, ChevronRight, ChevronLeft, Check } from 'lucide-react';

const CompleteProfile = () => {
    const navigate = useNavigate();
    const { token, setIsProfileComplete } = useStore();

    const [step, setStep] = useState(1);
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

    const handleRoleSelect = (role) => {
        setFormData({ ...formData, role });
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

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
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Blob for aesthetic */}
            <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-krishi-teal/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-krishi-moss/30 rounded-full blur-3xl"></div>

            <div className="max-w-2xl w-full glass-panel p-8 relative z-10">
                {/* Progress Bar */}
                <div className="flex justify-between mb-8 relative">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-700 -z-10 rounded-full"></div>
                    {[1, 2, 3].map((s) => (
                        <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${step >= s ? 'bg-krishi-teal text-white shadow-lg scale-110' : 'bg-gray-800 text-gray-400'}`}>
                            {step > s ? <Check className="w-5 h-5" /> : s}
                        </div>
                    ))}
                </div>

                <h2 className="text-3xl font-bold text-white mb-2 text-center">Complete Your Profile</h2>
                <p className="text-gray-400 text-center mb-8">Tell us a bit about yourself to get started.</p>

                <form onSubmit={handleSubmit}>
                    {step === 1 && (
                        <div className="space-y-6 animate-fadeIn">
                            <h3 className="text-xl text-white font-semibold flex items-center gap-2"><User className="text-krishi-teal" /> Who are you?</h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div
                                    onClick={() => handleRoleSelect('farmer')}
                                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${formData.role === 'farmer' ? 'border-krishi-teal bg-krishi-teal/10' : 'border-gray-700 hover:border-gray-500 bg-gray-800/50'}`}
                                >
                                    <h4 className="font-bold text-white text-lg">I am a Farmer</h4>
                                    <p className="text-sm text-gray-400 mt-1">I own or manage agricultural land.</p>
                                </div>
                                <div
                                    onClick={() => handleRoleSelect('expert')}
                                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${formData.role === 'expert' ? 'border-krishi-teal bg-krishi-teal/10' : 'border-gray-700 hover:border-gray-500 bg-gray-800/50'}`}
                                >
                                    <h4 className="font-bold text-white text-lg">I am an Expert</h4>
                                    <p className="text-sm text-gray-400 mt-1">I provide agricultural advice and services.</p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Mobile Number</label>
                                <input
                                    type="text"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-krishi-teal focus:outline-none"
                                    placeholder="+91 98765 43210"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Preferred Language</label>
                                <select
                                    name="language"
                                    value={formData.language}
                                    onChange={handleChange}
                                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-krishi-teal focus:outline-none"
                                >
                                    <option value="en">English</option>
                                    <option value="hi">Hindi</option>
                                    <option value="te">Telugu</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6 animate-fadeIn">
                            <h3 className="text-xl text-white font-semibold flex items-center gap-2"><MapPin className="text-krishi-teal" /> Where are you located?</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-krishi-teal focus:outline-none"
                                        placeholder="e.g. Punjab"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">District</label>
                                    <input
                                        type="text"
                                        name="district"
                                        value={formData.district}
                                        onChange={handleChange}
                                        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-krishi-teal focus:outline-none"
                                        placeholder="e.g. Ludhiana"
                                    />
                                </div>
                            </div>
                            {/* Map Placeholder */}
                            <div className="h-48 bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700 border-dashed">
                                <p className="text-gray-500">Map Selection Coming Soon</p>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6 animate-fadeIn">
                            <h3 className="text-xl text-white font-semibold flex items-center gap-2"><Sprout className="text-krishi-teal" /> Farm Details</h3>

                            {formData.role === 'expert' ? (
                                <div className="bg-gray-800 p-4 rounded-lg text-gray-300">
                                    Experts do not need to provide farm details. You can finish your profile setup.
                                </div>
                            ) : (
                                <>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Land Size (Acres)</label>
                                        <input
                                            type="text"
                                            name="landSize"
                                            value={formData.landSize}
                                            onChange={handleChange}
                                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-krishi-teal focus:outline-none"
                                            placeholder="e.g. 5.5"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">Farming Type</label>
                                            <select
                                                name="farmingType"
                                                value={formData.farmingType}
                                                onChange={handleChange}
                                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-krishi-teal focus:outline-none"
                                            >
                                                <option value="crop">Crops Only</option>
                                                <option value="livestock">Livestock Only</option>
                                                <option value="both">Mixed</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">Years of Exp.</label>
                                            <input
                                                type="number"
                                                name="experienceYears"
                                                value={formData.experienceYears}
                                                onChange={handleChange}
                                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-krishi-teal focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    <div className="flex justify-between mt-8">
                        {step > 1 ? (
                            <button
                                type="button"
                                onClick={prevStep}
                                className="px-6 py-2 rounded-lg text-gray-400 hover:text-white flex items-center gap-2 transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4" /> Back
                            </button>
                        ) : <div></div>}

                        {step < 3 ? (
                            <button
                                type="button"
                                onClick={nextStep}
                                className="px-6 py-2 bg-white text-gray-900 rounded-lg font-bold hover:bg-gray-200 flex items-center gap-2 transition-all shadow-lg"
                            >
                                Next <ChevronRight className="w-4 h-4" />
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="px-8 py-2 bg-krishi-teal text-white rounded-lg font-bold hover:bg-teal-600 flex items-center gap-2 transition-all shadow-lg shadow-teal-900/50"
                            >
                                Finish Setup <Check className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompleteProfile;
