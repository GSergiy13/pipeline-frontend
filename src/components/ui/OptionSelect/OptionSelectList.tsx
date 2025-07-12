import cn from 'clsx'
import type { OptionGroup } from 'constants/optionselect.const'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface OptionSelectListProps {
	group: OptionGroup
	anchorRect: DOMRect | null
}

export const OptionSelectList = ({ group, anchorRect }: OptionSelectListProps) => {
	const [mounted, setMounted] = useState(false)
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		setMounted(true)
		const timeout = setTimeout(() => setVisible(true), 10)
		return () => clearTimeout(timeout)
	}, [])

	if (!mounted || !anchorRect) return null

	const dropdownWidth = 180
	const dropdownHeight = 160
	const spacing = 55

	const left = anchorRect.left + anchorRect.width / 2 - dropdownWidth / 2 + window.scrollX
	const top = anchorRect.top + window.scrollY - dropdownHeight - spacing

	const safeLeft = Math.max(8, Math.min(left, window.innerWidth - dropdownWidth - 8))

	const styles: React.CSSProperties = {
		position: 'absolute',
		top,
		left: safeLeft,
		width: dropdownWidth,
		zIndex: 1000
	}

	return createPortal(
		<div
			style={styles}
			className={cn(
				'rounded-2xl bg-black/30 backdrop-blur-xl shadow-2xl text-white p-3 transition-all duration-300 transform',
				{
					'opacity-0 translate-y-2 pointer-events-none': !visible,
					'opacity-100 translate-y-0 pointer-events-auto': visible
				}
			)}
		>
			<h3 className='text-xs opacity-60 mb-2'>{group.name}</h3>

			<ul className='flex flex-col'>
				{group.options.map(option => (
					<li
						className='py-2 flex items-center justify-between gap-2'
						key={option.id}
					>
						<span>{option.name}</span>
						<div className='w-[16px] h-[16px] border border-white rounded-full' />
					</li>
				))}
			</ul>
		</div>,
		document.body
	)
}
