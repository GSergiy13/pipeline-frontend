import { Header } from './header/header'

export const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Header />
			<main>{children}</main>
		</>
	)
}
