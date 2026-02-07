/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './components/**/*.{js,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#6233B9',
        primaryHover: '#492095',
        textPrimary: '#151515',
        textSecondary: '#785BC0',
        background: '#F9F9F9',
        borders: '#E0E0E0',
        placeholder: '#CCCCCC',
        disabled: '#BDBDBD',
        customGray: '#F5F5F5',
        onPrimary: '#FFFFFF',
        error: '#CF2D2D',
        errorHover: '#991010',
        success: '#3E9B4B',
        successHover: '#216B35',
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        poppinsBold: ['PoppinsBold', 'sans-serif'],
        poppinsSemiBold: ['PoppinsSemiBold', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
