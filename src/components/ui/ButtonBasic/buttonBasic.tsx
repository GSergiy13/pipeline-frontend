import { type ReactNode } from 'react'

interface ButtonBasicProps {
	children: ReactNode
	className?: string
	onClick?: () => void
	disabled?: boolean
}

export const ButtonBasic = ({ children, className, onClick, disabled }: ButtonBasicProps) => {
	return (
		<button
			className={`w-full flex items-center justify-center gap-2.5 text-sm text-primary-blue font-medium bg-blue-bg-transparency-12 p-3 rounded-[60px] border border-primary-blue transition-all duration-300 hover:bg-blue-bg-transparency-60 hover:text-white ${className || ''}`}
			onClick={onClick}
			disabled={disabled || false}
		>
			{children}
		</button>
	)
}
