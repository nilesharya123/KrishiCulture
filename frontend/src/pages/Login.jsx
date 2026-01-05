import React, { useState } from 'react';
import { LayoutDashboard, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useStore from '../store/useStore';
import loginBg from '../assets/login-bg.png';

const Login = () => {
    const navigate = useNavigate();
    const { setToken, setIsProfileComplete } = useStore();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:5000/auth/google';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const endpoint = isLogin ? '/auth/login' : '/auth/register';
            const { data } = await axios.post(`http://localhost:5000${endpoint}`, formData);

            setToken(data.token);
            localStorage.setItem('token', data.token);
            setIsProfileComplete(data.isProfileComplete);

            if (data.isProfileComplete) {
                navigate('/dashboard');
            } else {
                navigate('/complete-profile');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img src={loginBg} alt="Farm Background" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-krishi-ink/40 backdrop-blur-[2px]"></div>
            </div>

            {/* Liquid Glass Card */}
            <div className="max-w-md w-full p-8 glass-panel relative z-10 mx-4">
                <div className="mb-6 flex justify-center">
                    <div className="bg-white/20 p-3 rounded-full backdrop-blur-md shadow-inner border border-white/30">
                        <LayoutDashboard className="w-10 h-10 text-white" />
                    </div>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2 text-center text-shadow-sm">
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-gray-100 mb-8 text-center text-sm font-light">
                    {isLogin ? 'Sign in to monitor your harvest' : 'Join the future of agriculture'}
                </p>

                {error && <div className="bg-red-500/80 text-white p-3 rounded-lg mb-4 text-sm text-center backdrop-blur-sm">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-5 mb-6">
                    {!isLogin && (
                        <div className="relative group">
                            <User className="w-5 h-5 absolute left-3 top-3 text-gray-300 group-focus-within:text-white transition-colors" />
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Full Name"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full pl-10 p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
                                required
                            />
                        </div>
                    )}
                    <div className="relative group">
                        <Mail className="w-5 h-5 absolute left-3 top-3 text-gray-300 group-focus-within:text-white transition-colors" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full pl-10 p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
                            required
                        />
                    </div>
                    <div className="relative group">
                        <Lock className="w-5 h-5 absolute left-3 top-3 text-gray-300 group-focus-within:text-white transition-colors" />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full pl-10 p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-krishi-teal hover:bg-teal-700 text-white font-semibold py-3 rounded-xl transition-all shadow-lg hover:shadow-teal-900/40 flex items-center justify-center gap-2"
                    >
                        {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Get Started')} <ArrowRight className="w-4 h-4" />
                    </button>
                </form>

                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/20"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 text-gray-200 bg-transparent">or</span>
                    </div>
                </div>

                <button
                    onClick={handleGoogleLogin}
                    type="button"
                    className="w-full flex items-center justify-center gap-3 bg-white/90 hover:bg-white border border-transparent text-gray-800 font-semibold py-3 px-6 rounded-xl transition-all mb-6 shadow-md"
                >
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                    Sign in with Google
                </button>

                <p className="text-center text-sm text-gray-200">
                    {isLogin ? "New to KrishiCulture? " : "Already have an account? "}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-white font-bold hover:underline decoration-krishi-sand underline-offset-4"
                    >
                        {isLogin ? 'Sign up' : 'Log in'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;
