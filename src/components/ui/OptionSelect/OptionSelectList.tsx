import cn from 'clsx'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { OptionGroup } from 'types/ModelConfigurations.type'

interface OptionSelectListProps {
	group: OptionGroup
	anchorRect: DOMRect | null
	selectedId: string
	onSelect: (optionId: string) => void
}

export const OptionSelectList = ({
	group,
	anchorRect,
	selectedId,
	onSelect
}: OptionSelectListProps) => {
	const [mounted, setMounted] = useState(false)
	const [visible, setVisible] = useState(false)
	const contentRef = useRef<HTMLDivElement>(null)
	const [contentHeight, setContentHeight] = useState(0)

	useEffect(() => {
		setMounted(true)
		const timeout = setTimeout(() => {
			setVisible(true)
			if (contentRef.current) {
				setContentHeight(contentRef.current.getBoundingClientRect().height)
			}
		}, 10)
		return () => clearTimeout(timeout)
	}, [])

	if (!mounted || !anchorRect) return null

	const dropdownWidth = 180
	const minSpacing = 16
	const additionalSpacing = 10

	const actualContentHeight = contentHeight || 160

	const baseSpacing = Math.max(66, actualContentHeight + additionalSpacing)

	const maxTop = window.scrollY + anchorRect.top - minSpacing
	const neededTop = window.scrollY + anchorRect.top - baseSpacing
	const top = Math.max(minSpacing, Math.min(neededTop, maxTop))

	const left = anchorRect.left + anchorRect.width / 2 - dropdownWidth / 2 + window.scrollX
	const safeLeft = Math.max(
		minSpacing,
		Math.min(left, window.innerWidth - dropdownWidth - minSpacing)
	)

	const styles: React.CSSProperties = {
		position: 'absolute',
		top,
		left: safeLeft,
		width: dropdownWidth,
		zIndex: 100,
		maxHeight: `calc(100vh - ${top + minSpacing}px)`
	}

	return createPortal(
		<div
			ref={contentRef}
			style={styles}
			className={cn(
				'rounded-2xl bg-black/30 backdrop-blur-xl shadow-2xl text-white p-3 transition-all duration-300 transform isolate will-change-[transform,opacity,backdrop-filter] overflow-y-auto',
				{
					'opacity-0 translate-y-2 pointer-events-none': !visible,
					'opacity-100 translate-y-0 pointer-events-auto': visible
				}
			)}
		>
			<h3 className='text-xs opacity-60 mb-2'>{group.name}</h3>

			<ul className='flex flex-col gap-6'>
				{group.options.map(option => (
					<li
						key={option.id}
						onClick={e => {
							e.stopPropagation()
							onSelect(option.id)
						}}
						className='flex items-center justify-between gap-2 cursor-pointer'
					>
						<div className='flex items-center gap-2'>
							<Image
								src={
									group.id === 'quantity'
										? `/icons/quantity/${option.value}.svg`
										: group.icon || '/icons/quantity/1.svg'
								}
								alt={option.name}
								width={24}
								height={24}
							/>

							<span>{option.name}</span>
						</div>
						<div
							className={cn('w-6 h-6 flex items-center justify-center border rounded-full', {
								'bg-white/20 border-white/5': option.id === selectedId,
								'bg-dark-bg-transparency-4 border-white/20': option.id !== selectedId
							})}
						>
							<div
								className={cn('w-1.5 h-1.5 rounded-full transition-colors', {
									'bg-primary-blue': option.id === selectedId,
									'bg-transparent': option.id !== selectedId
								})}
							/>
						</div>
					</li>
				))}
			</ul>
		</div>,
		document.body
	)
}
