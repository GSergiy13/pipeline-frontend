'use client'

import cn from 'clsx'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import type { OptionGroup } from 'types/ModelConfigurations.type'

interface OptionSelectListProps {
	group: OptionGroup
	selectedId: string
	onSelect: (optionId: string) => void
}

export const OptionSelectList = ({ group, selectedId, onSelect }: OptionSelectListProps) => {
	const [visible, setVisible] = useState(false)
	const contentRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const r = requestAnimationFrame(() => setVisible(true))
		return () => cancelAnimationFrame(r)
	}, [])

	return (
		<div
			ref={contentRef}
			className={cn(
				' absolute bottom-0 -right-5 min-w-[150px] rounded-2xl shadow-seed-shadow bg-[#232327]/90 text-white p-3 ' +
					'transition-all duration-500  ' +
					'overflow-y-auto max-h-[calc(100vh-32px)]',
				{
					'opacity-0 translate-y-1 pointer-events-none': !visible,
					'opacity-100 -translate-y-[40px] pointer-events-auto': visible
				}
			)}
		>
			<h3 className='text-xs opacity-60 mb-2'>{group.name}</h3>

			<ul className='flex flex-col gap-4'>
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
							<span className='text-sm'>{option.name}</span>
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
		</div>
	)
}
