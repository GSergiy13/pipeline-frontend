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
			<div
				className='flex flex-col w-full overflow-hidden'
				style={{ height: 'var(--app-height)' }}
			>
				{!isWelcome && <Header />}
				<main className='flex flex-1 w-full px-1 overflow-hidden'>{children}</main>
				{!isWelcome && <Footer />}
			</div>

			<Toaster
				position='bottom-center'
				reverseOrder={false}
				toastOptions={{
					error: { duration: 6000 },
					success: { duration: 3000 }
				}}
			/>

			<FixTelegramViewport />
			<TelegramInitializer />
		</>
	)
}
