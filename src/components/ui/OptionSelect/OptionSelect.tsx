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
	const [activeGroupId, setActiveGroupId] = useState<string | null>(null)
	const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
	const wrapperRef = useRef<HTMLDivElement>(null)

	const handleClick = (groupId: string) => {
		handleVibrate('light', 100)
		setActiveGroupId(prev => (prev === groupId ? null : groupId))
	}

	const handleOptionSelect = (groupId: string, optionId: string) => {
		const group = data[groupId]
		const selected = group.options.find(opt => opt.id === optionId)
		if (!selected) return

		setSelectedOptions(prev => ({ ...prev, [groupId]: optionId }))
		setActiveGroupId(null)
		handleVibrate('light', 200)
		onChange?.(groupId, groupId === 'aspectRatio' ? selected.name : selected.value)
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
				setActiveGroupId(null)
			}
		}

		document.addEventListener('click', handleClickOutside)
		return () => document.removeEventListener('click', handleClickOutside)
	}, [])

	return (
		<div
			ref={wrapperRef}
			className='flex gap-1'
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
							className='flex gap-1 items-center justify-center p-2 h-[30px] w-auto rounded-full border border-dark-bg-transparency-12 bg-dark-bg-transparency-4 cursor-pointer hover:bg-dark-bg-transparency-8 transition-colors duration-200'
						>
							{iconSrc && (
								<Image
									src={iconSrc}
									alt='Option Icon'
									width={16}
									height={16}
									className='shrink-0'
								/>
							)}

							<span className='text-xs'>{selectedOption.name}</span>
						</div>

						{activeGroupId === groupId && (
							<OptionSelectList
								group={group}
								selectedId={selectedOption.id}
								onSelect={optionId => handleOptionSelect(groupId, optionId)}
								// className='absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50'
							/>
						)}
					</div>
				)
			})}
		</div>
	)
}
