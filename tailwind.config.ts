import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
      colors: {
        lovable: {
          pink: '#FF66C4',
          rose: '#FF4D8D',
          purple: '#A855F7',
          violet: '#7C3AED',
          orange: '#FB923C',
          peach: '#FDBA74',
          ink: '#0F172A',
          cloud: '#F8FAFC',
        },
      },
      backgroundImage: {
        'lovable-gradient':
          'linear-gradient(135deg, #FF66C4 0%, #A855F7 50%, #FB923C 100%)',
        'lovable-gradient-soft':
          'linear-gradient(135deg, rgba(255,102,196,0.12) 0%, rgba(168,85,247,0.10) 50%, rgba(251,146,60,0.12) 100%)',
      },
      fontFamily: {
        sans: [
          'Manrope',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        display: [
          'Manrope',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        lovable:
          '0 10px 40px -12px rgba(168, 85, 247, 0.35), 0 4px 16px -8px rgba(255, 102, 196, 0.25)',
      },
    },
  },
  plugins: [],
} satisfies Config
