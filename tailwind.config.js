// /** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./node_modules/tw-elements/dist/js/**/*.js"
	],
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				lg: '0rem'
			},
		},
		extend: {
			fontFamily: {
				'sans': ['Inter var', ...defaultTheme.fontFamily.sans],
			},
			colors: {
				primary: '#0284c7',
				secondary: '#0ea5e9',
				light: '#f5f5f5',
				dark: '#262626'
			}
		},
		screens: {
			'sm': "640px",
			'md': "768px",
			'lg': "1024px",
			'xl': "1280px",
			'2xl': "1400px"
		}
	},
	plugins: [
		require('prettier-plugin-tailwindcss'),
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
		require('tw-elements/dist/plugin')
	],
}
