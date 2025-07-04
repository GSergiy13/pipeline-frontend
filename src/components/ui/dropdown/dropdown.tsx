'use client'

import type { ModelGenerateItem } from 'constants/modelgenerate.const'
import Image from 'next/image'
import { useState } from 'react'

import { DropDownList } from './dropdownList'

interface DropDownProps {
	data: ModelGenerateItem[]
}

export const DropDown = ({ data }: DropDownProps) => {
	const [active, setActive] = useState(data[0])
	const [show, setShow] = useState(false)

	const toggleShow = () => {
		setShow(!show)
	}

	const handleSelect = (item: ModelGenerateItem) => {
		setActive(item)
		setShow(false)
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
					className='ml-auto'
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
