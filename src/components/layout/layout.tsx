import { FixTelegramViewport } from 'components/FixTelegramViewport'
import { TelegramInitializer } from 'components/TelegramInitializer'

import { Header } from './Header/Header'

export const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='flex flex-col min-h-screen'>
			<FixTelegramViewport />
			<Header />
			<main className='flex-grow flex w-full h-full'>{children}</main>
			<footer className='text-[10px] text-white/40 text-center pt-1'>Name AI v. 0.1 beta</footer>
			<TelegramInitializer />
		</div>
	)
}
