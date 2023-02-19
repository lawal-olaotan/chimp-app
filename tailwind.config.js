/** @type {import('tailwindcss').Config} */

module.exports = {
  mode:'jit',
  content:['./pages/**/*.{js,tx,jsx,tsx}','./components/**/*.{js,tx,jsx,tsx}'],
  media:false,
  theme: {
    screens:{
      'sm':"320px",
      'md':"768px",
      'lg':'1024px',
      'xl':'1440px',
      '2xl':'1920px',
      '4xl':'2560px'
    },
    extend: {
      fontFamily:{
        "sans": ['Poppins', 'sans-serif']
      },
      colors:{
        primary:'#6969CE',
        section:'#EBEBEB',
      
      },
      boxShadow:{
        '5xl': 'rgb(0 0 0 / 8%) 0px 2px 12px 0px',
        '6xl': 'rgba(0, 0, 0, 0.15) 0px 2px 8px', 
      },
      fontSize:{
        '4xl':['2.25rem',{
          lineHeight:'3rem',
          fontWeight:'750',

        }
        ],
        'lg':['1.125rem',{
          lineHeight:'2rem'
        }]
      }
    },
  },
  plugins: [],
}