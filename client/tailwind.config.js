/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#38bdf8',
          deepBlue: '#0284c7',
          purple: '#8b5cf6',
          deepPurple: '#6d28d9',
          yellow: '#f59e0b',
          lightYellow: '#fef08a',
          green: '#10b981',
          lightGreen: '#a7f3d0',
          orange: '#f97316',
          coral: '#fb7185',
          background: '#f0f9ff'
        }
      },
      fontFamily: {
        comic: ['"Nunito"', 'ui-rounded', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'bubbly': '0 8px 0 rgba(0, 0, 0, 0.08), 0 15px 25px -5px rgba(0, 0, 0, 0.05)',
        'bubbly-lg': '0 10px 0 rgba(0, 0, 0, 0.08), 0 20px 30px -5px rgba(0, 0, 0, 0.08)',
        'bubbly-primary': '0 6px 0 #0284c7',
        'bubbly-purple': '0 6px 0 #6d28d9',
        'bubbly-green': '0 6px 0 #059669',
        'bubbly-yellow': '0 6px 0 #d97706',
        'bubbly-orange': '0 6px 0 #ea580c',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pop: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '70%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
        'float-slow': 'float 5s ease-in-out infinite',
        pop: 'pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      }
    },
  },
  plugins: [],
}
