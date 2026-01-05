/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'krishi-teal': '#316263',
                'krishi-moss': '#3E5C47',
                'krishi-clay': '#C36A4A',
                'krishi-sand': '#E7D8C6',
                'krishi-ink': '#101417',
                // Keep legacy compatibility for now, map to new values
                'krishi-green': '#3E5C47',
                'krishi-light': '#E7D8C6',
                'earth-brown': '#C36A4A',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'], // Modern mode font
                system: ['system-ui', 'sans-serif'], // Lite mode font
            },
        },
    },
    plugins: [],
}
