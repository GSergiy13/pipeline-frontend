import { FixTelegramViewport } from 'components/FixTelegramViewport'
import { TelegramInitializer } from 'components/TelegramInitializer'

import { Footer } from './Footer/Footer'
import { Header } from './Header/Header'

export const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<div className='flex flex-col min-h-screen'>
				<Header />
				<main className='flex flex-grow w-full h-full'>{children}</main>
				<Footer />
			</div>

			<FixTelegramViewport />
			<TelegramInitializer />
		</>
	)
}
