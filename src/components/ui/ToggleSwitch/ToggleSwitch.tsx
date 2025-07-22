import cn from 'clsx'
import { useState } from 'react'
import { handleVibrate } from 'utils/handleVibrate'

interface ToggleSwitchProps {
	label?: string
	checked?: boolean
	onChange?: (value: boolean) => void
}

export const ToggleSwitch = ({
	label = 'Toggle',
	checked = false,
	onChange
}: ToggleSwitchProps) => {
	const [isChecked, setIsChecked] = useState(checked)

	const handleToggle = () => {
		const newValue = !isChecked
		setIsChecked(newValue)
		onChange?.(newValue)
		handleVibrate('light', 100)
	}

	return (
		<label
			className={cn(
				'flex items-center gap-1 cursor-pointer border rounded-full px-2 py-1.5 border-dark-bg-transparency-12 text-white/60'
			)}
		>
			<div className='relative'>
				<input
					type='checkbox'
					className='sr-only'
					checked={isChecked}
					onChange={handleToggle}
				/>
				<div
					className={cn(
						'w-6 h-4 rounded-full transition-colors border',
						isChecked
							? 'bg-primary-blue/20 border-primary-blue'
							: 'bg-dark-bg-transparency-12 border-white/40'
					)}
				>
					<div
						className={cn(
							'h-3 w-3 rounded-full  absolute top-1/2 left-[2px] -translate-y-1/2 transition-transform',
							isChecked ? 'translate-x-[8px] bg-primary-blue' : 'translate-x-0 bg-white'
						)}
					/>
				</div>
			</div>
			<span className='text-xs'>{label}</span>
		</label>
	)
}
