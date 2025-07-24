export const Spinner = ({ size }: { size?: number }) => {
	const bars = 8
	const spinnerItems = Array.from({ length: bars })

	return (
		<div
			className={`relative ${size ? `w-${size} h-${size}` : 'w-20 h-20'} inline-block text-current`}
		>
			{spinnerItems.map((_, i) => {
				const angle = (i * 360) / bars
				const delay = -(1.2 - i * 0.15)

				return (
					<div
						key={i}
						className='absolute top-0 left-0 w-full h-full animate-spinner'
						style={{
							transform: `rotate(${angle}deg)`,
							animationDelay: `${delay}s`
						}}
					>
						<div
							className='absolute left-1/2 top-0 w-[2px] h-4 bg-current rounded-[10px]'
							style={{
								transform: 'translateX(-50%)'
							}}
						></div>
					</div>
				)
			})}
		</div>
	)
}
