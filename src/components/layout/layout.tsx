import { FixTelegramViewport } from 'components/FixTelegramViewport'
import { TelegramInitializer } from 'components/TelegramInitializer'

import { Header } from './Header/Header'

export const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<FixTelegramViewport />
			<Header />
			<main>{children}</main>
			<TelegramInitializer />
		</>
	)
}
