import { type Config } from 'tailwindcss'

export default {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {
			colors: {
				'primary-dark': '#0F0F14',
				'primary-blue': '#49B9FF',
				'dark-bg-transparency-4': 'rgba(255, 255, 255, 0.04)',
				'dark-bg-transparency-8': 'rgba(255, 255, 255, 0.08)',
				'dark-bg-transparency-12': 'rgba(255, 255, 255, 0.12)',
				'blue-bg-transparency-12': 'rgba(0, 144, 233, 0.12)',
				'blue-bg-transparency-40': 'rgba(0, 144, 233, 0.40)',
				'blue-bg-transparency-60': 'rgba(0, 144, 233, 0.60)',
				'wight-bg-transparency-04': 'rgba(0, 0, 0, 0.04)',
				'wight-bg-transparency-60': 'rgba(255, 255, 255, 0.60)'
			},
			backgroundImage: {
				'chat-gradient':
					'linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(15, 15, 20, 0.00) 100%)',
				'video-gradient': 'linear-gradient(180deg, rgba(15, 15, 20, 0.00) 0%, #0F0F14 100%)',
				'progress-bar-gradient': 'linear-gradient(90deg, rgba(15, 15, 20, 0.00) 0%, #FFF 100%);'
			},
			width: {
				'vw-8': 'calc(100vw - 8px)'
			},
			animation: {
				spinner: 'spinner 1.2s linear infinite'
			},
			keyframes: {
				spinner: {
					'0%': { opacity: '1' },
					'100%': { opacity: '0' }
				}
			}
		},

		screens: {
			mobile: { max: '580px' }
		}
	},
	plugins: []
} satisfies Config
