import { create } from 'zustand'

const useStore = create((set) => ({
    user: null,
    token: localStorage.getItem('token') || null,
    isProfileComplete: false,
    setToken: (token) => set({ token }),
    setIsProfileComplete: (status) => set({ isProfileComplete: status }),
    setUser: (user) => set({ user }),
    logout: () => {
        localStorage.removeItem('token');
        set({ token: null, user: null, isProfileComplete: false });
    },

    language: 'en',
    setLanguage: (lang) => set({ language: lang }),

    isLiteMode: false,
    toggleLiteMode: () => set((state) => ({ isLiteMode: !state.isLiteMode })),

    isOffline: !navigator.onLine,
    setIsOffline: (status) => set({ isOffline: status }),
}))

window.addEventListener('online', () => useStore.getState().setIsOffline(false));
window.addEventListener('offline', () => useStore.getState().setIsOffline(true));

export default useStore;
