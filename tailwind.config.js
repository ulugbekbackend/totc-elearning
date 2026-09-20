/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      screens: {
        // Figma kadri 1920px — shu kenglikdan boshlab dizayn 1:1 o'lchamlarda
        fhd: '1900px',
      },
      colors: {
        // Figmadan chiqarilgan palitra
        teal: {
          DEFAULT: '#49BBBD',
          light: '#83E6E8',
          dark: '#2A9D9F',
          50: '#EAF9F9',
        },
        navy: {
          DEFAULT: '#252641',
          deep: '#171B41',
          title: '#2F327D',
        },
        body: '#696984',
        muted: '#5B5B5B',
        line: '#DCE2EE',
        lilac: '#B2B3CF',
        sky: '#9DCCFF',
        indigo: '#545AE8',
        cyan: '#23BDEE',
        orange: '#F48C06',
        amber: '#FBA333',
        coral: '#EE645B',
        rose: '#EE6767',
        mint: '#55EFC4',
        green: '#33EFA0',
        sand: '#F6C566',
        cloud: '#F5F5FC',
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Figmadagi "Explore Course" bo'limi Roboto'da
        roboto: ['Roboto', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Figmadagi "Our Features" sarlavhalari Nunito Sans'da
        nunito: ['"Nunito Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Figmadagi shkala
        'display': ['64px', { lineHeight: '1.25', fontWeight: '700' }],
        'h1': ['50px', { lineHeight: '1.3', fontWeight: '700' }],
        'h2': ['45px', { lineHeight: '1.35', fontWeight: '600' }],
        'h3': ['30px', { lineHeight: '1.4', fontWeight: '600' }],
        'h4': ['24px', { lineHeight: '1.45', fontWeight: '600' }],
        'lead': ['20px', { lineHeight: '1.6' }],
      },
      borderRadius: {
        card: '20px',
        pill: '60px',
        soft: '12px',
        lg2: '24px',
      },
      boxShadow: {
        card: '0 10px 40px rgba(37, 38, 65, 0.08)',
        float: '2px 20px 60px rgba(61, 155, 185, 0.10)',
        pop: '0 15px 50px rgba(37, 38, 65, 0.12)',
      },
      maxWidth: {
        // Figma (1920px): kontent x=160…1760 → 1600px + 2×32px padding
        shell: '1664px',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
