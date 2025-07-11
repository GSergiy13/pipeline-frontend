'use client'

import cn from 'clsx'
import type { ModelGenerateItem } from 'constants/modelgenerate.const'
import Image from 'next/image'
import { useState } from 'react'
import { handleVibrate } from 'utils/handleVibrate'

import { DropDownList } from './DropDownList'

interface DropDownProps {
	data: ModelGenerateItem[]
}

export const DropDown = ({ data }: DropDownProps) => {
	const [active, setActive] = useState(data[0])
	const [show, setShow] = useState(false)

	const toggleShow = () => {
		setShow(!show)
		handleVibrate('light', 100)
	}

	const handleSelect = (item: ModelGenerateItem) => {
		setActive(item)
		setShow(false)
		handleVibrate('light', 100)
	}

	return (
		<div className='relative'>
			<button
				onClick={toggleShow}
				className='flex items-center gap-1 py-1.5 px-2 border border-dark-bg-transparency-12 rounded-3xl min-w-[226px]'
				aria-expanded='false'
			>
				<Image
					src={`/models/${active.type}.svg`}
					width={16}
					height={16}
					alt='Model logo'
				/>
				<span className='text-sm'>{active.name}</span>
				<Image
					className={cn('ml-auto transition-all duration-300', {
						'rotate-180': show
					})}
					src={'/icons/dropdown.svg'}
					width={24}
					height={42}
					alt='Model logo'
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
