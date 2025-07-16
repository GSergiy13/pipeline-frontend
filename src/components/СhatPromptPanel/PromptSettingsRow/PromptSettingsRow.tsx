import { modelgenerate } from 'constants/modelgenerate.const'
import Image from 'next/image'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDuration, setQuality, setQuantity } from 'store/slices/generationSlice'
import type { RootState } from 'store/store'

import { OptionSelect } from '@/ui/OptionSelect/OptionSelect'

interface PromptSettingsRowProps {
	onFileSelect: (file: File) => void
}

export const PromptSettingsRow = ({ onFileSelect }: PromptSettingsRowProps) => {
	const dispatch = useDispatch()
	const data_options = useSelector((state: RootState) => state.generation.selectedModel?.id)

	const DATA = modelgenerate.find(item => item.id === data_options)

	useEffect(() => {
		if (!DATA) return

		const quantity = DATA.options.quantity.options[0]?.value
		const duration = DATA.options.duration.options[0]?.value
		const quality = DATA.options.quality.options[0]?.value

		if (quantity != null) dispatch(setQuantity(quantity))
		if (duration != null) dispatch(setDuration(duration))
		if (quality != null) dispatch(setQuality(quality))
	}, [DATA, dispatch])

	const handleAttachClick = () => {
		const input = document.createElement('input')
		input.type = 'file'
		input.accept = 'image/*'
		input.onchange = e => {
			const file = (e.target as HTMLInputElement).files?.[0]
			if (file) {
				onFileSelect(file)
			}
		}
		input.click()
	}

	const handleChange = (groupId: string, value: string | number) => {
		if (groupId === 'quantity') dispatch(setQuantity(Number(value)))
		if (groupId === 'duration') {
			const val = value === 'auto' ? 'auto' : Number(value)
			dispatch(setDuration(val))
		}
		if (groupId === 'quality') dispatch(setQuality(String(value)))
	}

	return (
		<div className='flex items-center justify-between gap-1'>
			<button
				onClick={handleAttachClick}
				className='flex items-center justify-center w-[30px] h-[30px] rounded-full border border-dark-bg-transparency-12 bg-dark-bg-transparency-4 hover:bg-dark-bg-transparency-8 transition-colors duration-200'
			>
				<Image
					src={'/icons/attach.svg'}
					alt='Plus Icon'
					width={20}
					height={20}
				/>
			</button>

			<div className='flex items-center gap-1'>
				<OptionSelect
					data={DATA?.options || {}}
					onChange={handleChange}
				/>

				<button className='flex items-center justify-center w-[30px] h-[30px] rounded-full border border-dark-bg-transparency-12 bg-dark-bg-transparency-4 hover:bg-dark-bg-transparency-8 transition-colors duration-200'>
					<Image
						src={'/icons/grow.svg'}
						alt='Plus Icon'
						width={20}
						height={20}
					/>
				</button>
			</div>
		</div>
	)
}
