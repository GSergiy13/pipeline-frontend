'use client'

import { ModelConfigurations } from 'constants/modelconfigurations.const'
import Image from 'next/image'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setGenerationParams } from 'store/slices/generationSlice'
import type { RootState } from 'store/store'

import { OptionSelect } from '@/ui/OptionSelect/OptionSelect'

interface PromptSettingsRowProps {
	onFileSelect: (file: File) => void
}

export const PromptSettingsRow = ({ onFileSelect }: PromptSettingsRowProps) => {
	const dispatch = useDispatch()
	const selectedModelId = useSelector((state: RootState) => state.generation.selectedModel?.id)
	const selectedModel = ModelConfigurations.find(model => model.id === selectedModelId)

	useEffect(() => {
		if (!selectedModel) return

		const defaultQuantity = selectedModel.options.quantity.options[0]?.value
		const defaultDuration = selectedModel.options.duration.options[0]?.value
		const defaultQuality = selectedModel.options.quality.options[0]?.value

		dispatch(
			setGenerationParams({
				quantity: defaultQuantity,
				duration: defaultDuration,
				quality: defaultQuality
			})
		)
	}, [selectedModel, dispatch])

	const handleFileUploadClick = () => {
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

	const handleOptionChange = (optionType: string, value: string | number) => {
		const payload: Record<string, string | number> = {}

		if (optionType === 'quantity') payload.quantity = Number(value)
		if (optionType === 'duration') payload.duration = value === 'auto' ? 'auto' : Number(value)
		if (optionType === 'quality') payload.quality = String(value)

		dispatch(setGenerationParams(payload))
	}

	return (
		<div className='flex items-center justify-between gap-1'>
			<button
				onClick={handleFileUploadClick}
				className='flex items-center justify-center w-[30px] h-[30px] rounded-full border border-dark-bg-transparency-12 bg-dark-bg-transparency-4 hover:bg-dark-bg-transparency-8 transition-colors duration-200'
			>
				<Image
					src='/icons/attach.svg'
					alt='Attach Icon'
					width={20}
					height={20}
				/>
			</button>

			<div className='flex items-center gap-1'>
				<OptionSelect
					data={selectedModel?.options || {}}
					onChange={handleOptionChange}
				/>

				<button className='flex items-center justify-center w-[30px] h-[30px] rounded-full border border-dark-bg-transparency-12 bg-dark-bg-transparency-4 hover:bg-dark-bg-transparency-8 transition-colors duration-200'>
					<Image
						src='/icons/grow.svg'
						alt='Grow Icon'
						width={20}
						height={20}
					/>
				</button>
			</div>
		</div>
	)
}
