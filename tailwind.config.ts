import type { Config } from "tailwindcss";


const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      screens: {
        'sm': '100%',
        'md': '100%',
        'lg': '1472px',
      },
      center: true,
      padding: '1rem'
    },
    extend: {
      fontFamily: {
        'nunito-Sans': ['"Nunito Sans"', 'sans-serif'], // Add DM Sans as the sans font
        'sans': ['"Nunito Sans"', 'sans-serif'], // Add DM Sans as the sans font
        'serif': ['"Nunito Sans"', 'sans-serif'], // Add DM Sans as the sans font
        'mono': ['"Nunito Sans"', 'sans-serif'], // Add DM Sans as the sans font

      },
      fontWeight: {
        extraLight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semiBold: '600',
        bold: '700',
        extraBold: '800',
        black: '900',
      },
      backgroundSize:{
        '8': '8px',
      },
      backgroundPosition:{
        'lg-right-center': '89% center',
        'right-center': '95% center',
        'left-center': '16px center',
      },
      backgroundImage: {
        'select': "url('/images/icon-select.svg')",
        'car-1': "url('/images/bg-car-1.jpeg')",
        'car-2': "url('/images/bg-car-2.jpeg')",
        'quotes': "url('/images/quotes.svg')",
        'icon-sort': "url('/images/icon-select-sort.svg')",
        'check-list': "url('/images/check-list.svg')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'bannerHome-1':"url('/images/banner-home-01.jpg')",
        'bannerHome-2':"url('/images/banner-home-02.jpg')",
        'bannerHome-3':"url('/images/banner-home-03.jpg')",
        'bannerHome-4':"url('/images/banner-home-04.jpg')",
        'slider01': "url('/images/rooftop.jpg')",
        'coupe':"url('/images/minicars/car-coupe.png')",
        'hatchback':"url('/images/minicars/car-hatchback.png')",
        'sedan':"url('/images/minicars/car-sedan.png')",
        'vus':"url('/images/minicars/car-suv.png')",
        'convertible':"url('/images/minicars/car-convertible.png')",
        'station-wagon':"url('/images/minicars/station-wagon.png')",
        'pickup':"url('/images/minicars/car-pickup.png')",
        'van':"url('/images/minicars/car-van.png')",
        'slider-1':"url('/images/slider/slider-1.jpg')",
        'slider-2':"url('/images/slider/slider-2.jpg')",
        'slider-3':"url('/images/slider/slider-3.jpg')",
      },
      colors: {
        'agray-300': '#CDCDCD',
        'agray-400': '#F7F7F7',
        'agray-500': '#E9E9E9',
        'agray-600': '#4D5654',
        'agray-700': '#505463',
        'agray-800': '#050B20',
        'ablack-400': '#444444',
        'ablack-500': '#2C2C2C',
        'ablack-600': '#333333',
        'ablack-800': '#111111',
        'ared-400': '#0099cc',
        'white-20': 'rgba(255, 255, 255, 0.2)',
        'black-57': 'rgba(0, 0, 0, 0.57)',
        'primary': '#e92f27',
        'secondary': '#043874',
        'secondary-dark': '#051c3a',
        'dark-1': '#111111',
        'dark-2': '#222222',
        'dark-3': '#333333',
        'f1': '#f1f1f1',
        'f6': '#f6f6f6',
        'f7':'#f7f7f7',
        'ed':'#ededed',
      },
      backgroundColor: {
        'custom-light-pink': 'rgba(188, 49, 73, 0.05)',  // 2% opacity of #BC3149
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    function({ addComponents } : any) {
      const buttons = {
        '.btn': {
          padding: '.5rem 1rem',
          borderRadius: '.25rem',
          fontWeight: '600',
        },
        '.btn-primary': {
          backgroundColor: '#0099cc',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#8d8d8d',
          },
        },
        '.btn-outline': {
          border: '1px solid #0099cc',
          color: '#0099cc',
          '&:hover': {
            backgroundColor: '#333333',
            color: '#ffffff',
          },
        },
      }
      addComponents(buttons)
    }
  ],
};
export default config;
