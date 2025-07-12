import type { OptionSelectType } from 'constants/optionselect.const'
import Image from 'next/image'
import { useRef, useState } from 'react'

import { OptionSelectList } from './OptionSelectList'

interface OptionSelectProps {
	data: OptionSelectType
}

export const OptionSelect = ({ data }: OptionSelectProps) => {
	const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null)
	const [activeGroupName, setActiveGroupName] = useState<string | null>(null)

	const spanRefs = useRef<Record<string, HTMLSpanElement | null>>({})

	const handleClick = (groupName: string) => {
		const span = spanRefs.current[groupName]
		if (span) {
			const rect = span.getBoundingClientRect()
			setAnchorRect(rect)
			setActiveGroupName(prev => (prev === groupName ? null : groupName))
		}
	}

	return (
		<>
			{Object.entries(data).map(([key, group]) => (
				<div
					key={key}
					onClick={() => handleClick(group.name)}
					className='relative flex gap-2 items-center justify-center p-2 h-[30px] w-auto rounded-full border border-dark-bg-transparency-12 bg-dark-bg-transparency-4 cursor-pointer'
				>
					<Image
						src={group.icon}
						alt='Option Icon'
						width={20}
						height={20}
					/>

					<span
						ref={el => {
							spanRefs.current[group.name] = el
						}}
					>
						{group.options[0].name}
					</span>

					{activeGroupName === group.name && (
						<OptionSelectList
							group={group}
							anchorRect={anchorRect}
						/>
					)}
				</div>
			))}
		</>
	)
}
