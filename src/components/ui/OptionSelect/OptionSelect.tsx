'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import type { OptionGroup } from 'types/ModelConfigurations.type'
import { handleVibrate } from 'utils/handleVibrate'

import { OptionSelectList } from './OptionSelectList'

interface OptionSelectProps {
	data: Record<string, OptionGroup>
	onChange?: (groupId: string, value: string | number) => void
}

export const OptionSelect = ({ data, onChange }: OptionSelectProps) => {
	const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null)
	const [activeGroupName, setActiveGroupName] = useState<string | null>(null)
	const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})

	const spanRefs = useRef<Record<string, HTMLSpanElement | null>>({})
	const wrapperRef = useRef<HTMLDivElement>(null)

	const handleClick = (groupId: string) => {
		const span = spanRefs.current[groupId]
		handleVibrate('light', 100)
		if (span) {
			const rect = span.getBoundingClientRect()
			setAnchorRect(rect)
			setActiveGroupName(prev => (prev === groupId ? null : groupId))
		}
	}

	const handleOptionSelect = (groupId: string, optionId: string) => {
		const group = data[groupId]

		const selected = group.options.find(opt => opt.id === optionId)
		if (!selected) return

		setSelectedOptions(prev => ({ ...prev, [groupId]: optionId }))
		setActiveGroupName(null)
		handleVibrate('light', 100)
		onChange?.(groupId, selected.value)
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
				setTimeout(() => {
					setActiveGroupName(null)
				}, 0)
			}
		}

		document.addEventListener('click', handleClickOutside)
		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [])

	return (
		<div
			ref={wrapperRef}
			className='flex gap-2'
		>
			{Object.values(data).map(group => {
				if (!group || !group.options?.length) return null

				const groupId = group.id

				const selectedOption =
					group.options.find(opt => opt.id === selectedOptions[groupId]) || group.options[0]

				const iconSrc =
					groupId === 'quantity' ? `/icons/quantity/${selectedOption.value}.svg` : group.icon || ''

				return (
					<div
						key={groupId}
						className='relative'
					>
						<div
							onClick={() => handleClick(groupId)}
							className='flex gap-2 items-center justify-center p-2 h-[30px] w-auto rounded-full border border-dark-bg-transparency-12 bg-dark-bg-transparency-4 cursor-pointer hover:bg-dark-bg-transparency-8 transition-colors duration-200'
						>
							<Image
								src={iconSrc}
								alt='Option Icon'
								width={20}
								height={20}
							/>
							<span
								ref={el => {
									spanRefs.current[groupId] = el
								}}
							>
								{selectedOption.name}
							</span>
						</div>

						{activeGroupName === groupId && (
							<OptionSelectList
								group={group}
								anchorRect={anchorRect}
								selectedId={selectedOption.id}
								onSelect={optionId => handleOptionSelect(groupId, optionId)}
							/>
						)}
					</div>
				)
			})}
		</div>
	)
}
