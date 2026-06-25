/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#F8F8F8',
          100: '#E8E8E8',
          200: '#D0D0D0',
          300: '#A8A8A8',
          400: '#808080',
          500: '#585858',
          600: '#404040',
          700: '#2A2A2A',
          800: '#1A1A1A',
          900: '#0D0D0D',
          950: '#050505',
        },
        pearl: {
          50: '#FFFFFF',
          100: '#FAFAFA',
          200: '#F0F0F0',
          300: '#E0E0E0',
          400: '#C0C0C0',
        },
        primary: '#FFFFFF',
        secondary: '#A0A0A0',
        border: 'rgba(255,255,255,0.15)',
        borderLight: 'rgba(255,255,255,0.08)',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Bodoni Moda', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Lora', 'Cormorant Garamond', 'Georgia', 'serif'],
      },
      boxShadow: {
        'soft': '0 8px 24px rgba(0, 0, 0, 0.3)',
        'soft-lg': '0 14px 36px rgba(0, 0, 0, 0.4)',
        'glow': '0 0 20px rgba(255,255,255,0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'petal-fall': 'petalFall 8s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        petalFall: {
          '0%': { transform: 'translateY(-10px) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(10px) rotate(180deg)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
