'use client'

import { FixTelegramViewport } from 'components/FixTelegramViewport'
import { TelegramInitializer } from 'components/TelegramInitializer'
import { usePathname } from 'next/navigation'
import { Toaster } from 'react-hot-toast'

import { Footer } from './Footer/Footer'
import { Header } from './Header/Header'

export const Layout = ({ children }: { children: React.ReactNode }) => {
	const pathname = usePathname()
	const isWelcome = pathname === '/welcome'

	return (
		<>
			<div className='flex flex-col min-h-screen'>
				{!isWelcome && <Header />}
				<main className='flex flex-grow w-full h-full px-1'>{children}</main>
				{!isWelcome && <Footer />}
			</div>

			<Toaster
				position='bottom-center'
				reverseOrder={false}
				toastOptions={{
					error: {
						duration: 6000
					},
					success: {
						duration: 3000
					}
				}}
			/>
			<FixTelegramViewport />
			<TelegramInitializer />
		</>
	)
}
