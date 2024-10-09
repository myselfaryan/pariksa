/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
  	extend: {
  		colors: {
  			'main-text-color': '#ECE2E7',
  			'logo-color': '#B88BB5',
  			'secondary-body-bg': '#3E315E',
  			'body-bg': '#1B0929',
  			'navbar-bg': '#140323',
  			'navbar-boder': '#464646',
  			'main-body-bg': '#1A1A1A',
  			'problem-page-bg': '#121212',
  			'main-white': '#FFFFFF',
  			'easy-green': '#00B8A3',
  			'main-grey': '#D9D9D9',
  			'main-dark': '#AAAAAA',
  			'hover-blue': '#0A84FF',
  			'code-bg': '#282828',
  			'example-text': '#A8A8A8',
  			'case-bg-code': '#3C3C3C',
  			'testcase-green': '#02B128',
  			'catppuccin-green': '#a6e3a1',
  			'catppuccin-yellow': '#f9e2af',
  			'catppuccin-red': '#f38ba8',
  			'err-bg': '#362B2A',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		padding: {
  			'84': '22rem'
  		},
  		borderWidth: {
  			'1': '1px'
  		},
  		boxShadow: {
  			'signup-box': '0 4px 8px rgba(0, 0, 0, 0.1)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
