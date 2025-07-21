'use client'

import cn from 'clsx'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import type { ModelConfigurationsItem } from 'types/ModelConfigurations.type'
import { handleVibrate } from 'utils/handleVibrate'

import { DropDownList } from './DropDownList'

interface DropDownProps {
	data: ModelConfigurationsItem[]
	onSelect: (item: ModelConfigurationsItem) => void
}

export const DropDown = ({ data, onSelect }: DropDownProps) => {
	const [active, setActive] = useState(data[0])
	const [show, setShow] = useState(false)

	const ref = useRef<HTMLDivElement>(null)

	const toggleShow = () => {
		setShow(prev => !prev)
		handleVibrate('light', 100)
	}

	const handleSelect = (item: ModelConfigurationsItem) => {
		setActive(item)
		setShow(false)
		onSelect(item)
		handleVibrate('light', 100)
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setShow(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	return (
		<div
			ref={ref}
			className='relative'
		>
			<button
				onClick={toggleShow}
				className='flex items-center gap-1 py-1.5 px-2 border border-dark-bg-transparency-12 rounded-3xl transition-all duration-300'
				aria-expanded={show}
			>
				<Image
					src={`/models/${active.type_icon}.svg`}
					width={16}
					height={16}
					alt='Model logo'
				/>
				<span className='text-sm'>{active.name}</span>
				<Image
					className={cn('ml-auto transition-all duration-300', {
						'rotate-180': show
					})}
					src='/icons/dropdown.svg'
					width={24}
					height={42}
					alt='Dropdown icon'
				/>
			</button>

			<DropDownList
				show={show}
				data={data}
				active={active}
				handleSelect={handleSelect}
			/>
		</div>
	)
}
