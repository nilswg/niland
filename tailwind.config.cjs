const { fontFamily } = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx,astro}",
  ],
  theme: {
    darkMode: 'class',
    screens: {
      'xs': '320px',
      'sm': '480px',
      'md': '600px',
      'mdx': '768px',
      'lg': '1024px',
      'xl': '1176px',
      '2xl': '1440px',
      '3xl': '1920px',
      '4xl': '2560px',
    },
    extend: {
      fontFamily: {
        // roboto: ["var(--font-roboto)", ...fontFamily.serif],
        // notoSansTC: ["var(--font-noto-sans-tc)", ...fontFamily.serif],
        roboto: ["Roboto", ...fontFamily.sans],
        notoSansTC: ["Noto Sans TC", ...fontFamily.sans],
      },
      spacing: {
        navbar: 'var(--navbar-height)',
        footer: 'var(--footer-height)',
        section: 'calc(100vh - var(--navbar-height)'
      },
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        fromScript: "rgb(var(--color-from-script) / <alpha-value>)",
        base: "rgb(var(--color-base) / <alpha-value>)",
        invert: "rgb(var(--color-invert) / <alpha-value>)",

        // xq-blue
        'xq-blue-1': "var(--color-xq-blue-1)",
        'xq-blue-2': "var(--color-xq-blue-2)",
        'xq-blue-3': "var(--color-xq-blue-3)",
        'xq-blue-4': "var(--color-xq-blue-4)",
        'xq-blue-5': "var(--color-xq-blue-5)",
        'xq-blue-6': "var(--color-xq-blue-6)",
        'xq-blue-7': "var(--color-xq-blue-7)",

        // xq-yellow
        'xq-yellow-1': "var(--color-xq-yellow-1)",
        'xq-yellow-2': "var(--color-xq-yellow-2)",
        'xq-yellow-3': "var(--color-xq-yellow-3)",
        'xq-yellow-4': "var(--color-xq-yellow-4)",
        'xq-yellow-5': "var(--color-xq-yellow-5)",
        'xq-yellow-6': "var(--color-xq-yellow-6)",
        'xq-yellow-7': "var(--color-xq-yellow-7)",

        /* xq-red */
        'xq-red-1': "var(--color-xq-red-1)",
        'xq-red-2': "var(--color-xq-red-2)",
        'xq-red-3': "var(--color-xq-red-3)",
        'xq-red-4': "var(--color-xq-red-4)",
        'xq-red-5': "var(--color-xq-red-5)",

        /* xq-green */
        'xq-green-1': "var(--color-xq-green-1)",
        'xq-green-2': "var(--color-xq-green-2)",
        'xq-green-3': "var(--color-xq-green-3)",
        'xq-green-4': "var(--color-xq-green-4)",
        'xq-green-5': "var(--color-xq-green-5)",

        // xq-gray
        'xq-gray-1': "var(--color-xq-gray-1)",
        'xq-gray-2': "var(--color-xq-gray-2)",
        'xq-gray-3': "var(--color-xq-gray-3)",
        'xq-gray-4': "var(--color-xq-gray-4)",
        'xq-gray-5': "var(--color-xq-gray-5)",
        'xq-gray-6': "var(--color-xq-gray-6)",
        'xq-gray-7': "var(--color-xq-gray-7)",
        'xq-gray-8': "var(--color-xq-gray-8)",
        'xq-gray-9': "var(--color-xq-gray-9)",
        'xq-gray-10': "var(--color-xq-gray-10)",

        // xq-border-color
        'xq-border-outer': "var(--color-xq-border-outer)",
        'xq-border-inner': "var(--color-xq-border-inner)",

      },
      borderWidth: {
        '1': '0.0625rem', // 1px
      },
      boxShadow: {
        'xq-sm': 'var(--shadow-xq-sm)',
        'xq-md': 'var(--shadow-xq-md)',
        'xq-lg': 'var(--shadow-xq-lg)',
      },
    },
    'XQ_Typography': {
      h0: ['48px', '60px'],
      h1: ['36px', '48px'],
      h2: ['24px', '36px'],
      h3: ['18px', '24px'],
      h4: ['16px', '24px'],
      h5: ['14px', '18px'],
      h6: ['12px', '18px'],
      mh0: ['42px', '48px'], // m: mobile
      mh1: ['30px', '36px'],
      mh2: ['24px', '36px'],
      mh3: ['18px', '24px'],
      mh4: ['16px', '24px'],
      mh5: ['14px', '18px'],
      mh6: ['12px', '18px'],
    }
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    plugin(function ({ addComponents, matchUtilities, theme }) {
      matchUtilities(
        {
          'xq-text': (value) => {
            return {
              fontSize: value[0],
              lineHeight: value[1],
            }
          },
        }, {
        values: theme('XQ_Typography'),
      }),
        addComponents({
          '.xq-btn': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.375rem', //6px
          },
          '.xq-grid-layout': {
            position: 'relative',
            display: 'grid',
            width: '100%',
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            [`@media (min-width: ${theme('screens.sm')})`]: {
              gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            },
            [`@media (min-width: ${theme('screens.md')})`]: {
              gridTemplateColumns: 'repeat(8, minmax(0, 1fr))',
            },
            [`@media (min-width: ${theme('screens.lg')})`]: {
              gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
            },
            [`@media (min-width: ${theme('screens.xl')})`]: {
              maxWidth: `${theme('screens.xl')}`,
              gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
            }
          },
          '.xq-grid-layout-inherit': {
            gridColumn: '1/-1',
            gap: 'inherit',
            display: 'grid',
            gridTemplateColumns: 'inherit',
            [`@media (min-width: ${theme('screens.sm')})`]: {
              gridTemplateColumns: 'inherit',
            },
            [`@media (min-width: ${theme('screens.md')})`]: {
              gridTemplateColumns: 'inherit',
            },
            [`@media (min-width: ${theme('screens.lg')})`]: {
              gridTemplateColumns: 'inherit',
            },
            [`@media (min-width: ${theme('screens.xl')})`]: {
              maxWidth: 'inherit',
              gridTemplateColumns: 'inherit',
            }
          }
        })
    })
  ],
}
