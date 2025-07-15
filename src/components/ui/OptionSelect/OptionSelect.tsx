import type { OptionSelectType } from 'constants/optionselect.const'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { handleVibrate } from 'utils/handleVibrate'

import { OptionSelectList } from './OptionSelectList'

interface OptionSelectProps {
	data: OptionSelectType
}
export const OptionSelect = ({ data }: OptionSelectProps) => {
	const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null)
	const [activeGroupName, setActiveGroupName] = useState<string | null>(null)
	const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})

	const spanRefs = useRef<Record<string, HTMLSpanElement | null>>({})

	const handleClick = (groupName: string) => {
		const span = spanRefs.current[groupName]
		handleVibrate('light', 100)
		if (span) {
			const rect = span.getBoundingClientRect()
			setAnchorRect(rect)
			setActiveGroupName(prev => (prev === groupName ? null : groupName))
		}
	}

	const handleOptionSelect = (groupName: string, optionId: string) => {
		setSelectedOptions(prev => ({ ...prev, [groupName]: optionId }))
		setActiveGroupName(null)
		handleVibrate('light', 100)
	}

	return (
		<>
			{Object.entries(data).map(([key, group]) => {
				const selectedOption =
					group.options.find(opt => opt.id === selectedOptions[group.id]) || group.options[0]

				const iconSrc =
					group.id === 'quantity' ? `/icons/quantity/${selectedOption.value}.svg` : group.icon || ''

				return (
					<div
						key={key}
						onClick={() => handleClick(group.id)}
						className='relative flex gap-2 items-center justify-center p-2 h-[30px] w-auto rounded-full border border-dark-bg-transparency-12 bg-dark-bg-transparency-4 cursor-pointer'
					>
						<Image
							src={iconSrc}
							alt='Option Icon'
							width={20}
							height={20}
						/>

						<span
							ref={el => {
								spanRefs.current[group.id] = el
							}}
						>
							{selectedOption.name}
						</span>

						{activeGroupName === group.id && (
							<OptionSelectList
								group={group}
								anchorRect={anchorRect}
								selectedId={selectedOption.id}
								onSelect={optionId => handleOptionSelect(group.id, optionId)}
							/>
						)}
					</div>
				)
			})}
		</>
	)
}
