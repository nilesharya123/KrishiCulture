import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useStore from '../store/useStore';

const AuthCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { setToken, setIsProfileComplete } = useStore(); // Need to update store for these

    useEffect(() => {
        const token = searchParams.get('token');
        const isProfileComplete = searchParams.get('isProfileComplete') === 'true';
        const redirectPath = searchParams.get('redirect');

        if (token) {
            // Save token (localStorage for persistence + Zustand)
            localStorage.setItem('token', token);
            // we might want to add token to store if we implement that

            if (redirectPath) {
                navigate(redirectPath);
            } else {
                navigate('/dashboard');
            }
        } else {
            // Error handling
            navigate('/login');
        }
    }, [searchParams, navigate]);

    return (
        <div className="flex justify-center items-center h-screen">
            <p className="text-xl">Authenticating...</p>
        </div>
    );
};

export default AuthCallback;
