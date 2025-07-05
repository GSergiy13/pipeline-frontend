import Image from 'next/image'

interface ExpandInputButtonProps {
	onExpand: () => void
	isExpanded: boolean
}

export const ExpandInputButton = ({ onExpand, isExpanded }: ExpandInputButtonProps) => {
	return (
		<button
			onClick={onExpand}
			className='absolute right-2 top-2 bg-transparent border-none'
		>
			<Image
				src={isExpanded ? '/icons/minimize.svg' : '/icons/expand.svg'}
				alt={isExpanded ? 'minimize input' : 'Expand input'}
				width={20}
				height={20}
			/>
		</button>
	)
}
