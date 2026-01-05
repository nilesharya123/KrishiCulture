/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'krishi-green': '#2e7d32',
                'krishi-light': '#e8f5e9',
                'earth-brown': '#795548',
            },
        },
    },
    plugins: [],
}
