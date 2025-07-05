interface ButtonBasicProps {
	text: string
	className?: string
	onClick?: () => void
	disabled?: boolean
}

export const ButtonBasic = (props: ButtonBasicProps) => {
	return (
		<button
			className={`w-full text-sm text-primary-blue font-medium bg-blue-bg-transparency-12 p-3 rounded-[60px] border border-primary-blue transition-all duration-300 hover:bg-blue-bg-transparency-60 hover:text-white ${props.className || ''}`}
			onClick={props.onClick}
			disabled={props.disabled || false}
		>
			{props.text}
		</button>
	)
}
