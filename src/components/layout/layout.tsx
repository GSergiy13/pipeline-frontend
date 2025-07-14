import { FixTelegramViewport } from 'components/FixTelegramViewport'
import { TelegramInitializer } from 'components/TelegramInitializer'

import { Header } from './Header/Header'

export const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<FixTelegramViewport />
			<Header />
			<main>{children}</main>
			<footer>
				<p className='pt-1 text-[10px] text-white/40 text-center'>Name AI v. 0.1 beta</p>
			</footer>
			<TelegramInitializer />
		</>
	)
}
