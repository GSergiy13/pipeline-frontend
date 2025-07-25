import { Layout } from 'components/layout/layout'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Script from 'next/script'
import { AppProviders } from 'providers/AppProviders'

import './globals.css'

const Gotham = localFont({
	src: [
		{
			path: '../fonts/Gotham-Book.woff2',
			weight: '400',
			style: 'normal'
		},
		{
			path: '../fonts/Gotham-Medium.woff2',
			weight: '500',
			style: 'normal'
		},
		{
			path: '../fonts/Gotham-Bold.woff2',
			weight: '700',
			style: 'normal'
		}
	]
})

export const metadata: Metadata = {
	title: 'Pipeline - Ai generated moves',
	description: 'Pipeline is a Telegram bot that generates moves for you using AI.'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang='en'
			style={
				{
					'--tg-viewport-height': '100vh',
					'--tg-viewport-stable-height': '100vh'
				} as React.CSSProperties
			}
		>
			<body className={`${Gotham.className} antialiased`}>
				<AppProviders>
					<Layout>{children}</Layout>
				</AppProviders>

				{
					<Script
						src='https://telegram.org/js/telegram-web-app.js'
						strategy='beforeInteractive'
					/>
				}
			</body>
		</html>
	)
}
