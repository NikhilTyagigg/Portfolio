/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#8B5CF6',
        background: '#0F172A',
        card: '#1E293B',
        text: '#F8FAFC',
        muted: '#94A3B8'
      },
      boxShadow: {
        glow: '0 0 30px rgba(59, 130, 246, 0.35)'
      },
      backgroundImage: {
        grid: 'radial-gradient(circle at 1px 1px, rgba(148,163,184,0.12) 1px, transparent 0)'
      }
    }
  },
  plugins: []
}
