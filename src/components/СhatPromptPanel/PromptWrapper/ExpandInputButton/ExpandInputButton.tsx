import Image from 'next/image'

interface ExpandButtonProps {
	onExpand: () => void
	isExpanded: boolean
}

export const ExpandButton = ({ onExpand, isExpanded }: ExpandButtonProps) => {
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
