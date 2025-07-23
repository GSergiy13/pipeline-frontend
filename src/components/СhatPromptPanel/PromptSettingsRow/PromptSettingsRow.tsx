'use client'

import cn from 'clsx'
import { ModelConfigurations } from 'constants/modelconfigurations.const'
import Image from 'next/image'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCustomModel, setGenerationParams, setInstrumental } from 'store/slices/generationSlice'
import type { RootState } from 'store/store'
import { sanitizeOptionGroups } from 'utils/sanitizeOptionGroups'

import { OptionSelect } from '@/ui/OptionSelect/OptionSelect'
import { SeedInput } from '@/ui/Seed/SeedInput'
import { ToggleSwitch } from '@/ui/ToggleSwitch/ToggleSwitch'

interface PromptSettingsRowProps {
	onFileSelect: (file: File) => void
}

export const PromptSettingsRow = ({ onFileSelect }: PromptSettingsRowProps) => {
	const dispatch = useDispatch()
	const selectedModelId = useSelector((state: RootState) => state.generation.selectedModel?.id)
	const selectedModel = ModelConfigurations.find(model => model.id === selectedModelId)
	const instrumental = useSelector(
		(state: RootState) => state.generation.selectedParams.instrumental
	)
	const customModel = useSelector(
		(state: RootState) => state.generation.selectedParams.custom_model
	)

	useEffect(() => {
		if (!selectedModel || !selectedModel.options) return

		const payload: {
			quantity?: number
			duration?: number | 'auto'
			quality?: string
		} = {}

		const { quantity, duration, quality } = selectedModel.options

		if (quantity?.options?.[0]) {
			payload.quantity = quantity.options[0].value
		}

		if (duration?.options?.[0]) {
			const val = duration.options[0].value
			payload.duration = typeof val === 'number' || val === 'auto' ? val : 'auto'
		}

		if (quality?.options?.[0]) {
			payload.quality = quality.options[0].name
		}

		dispatch(setGenerationParams(payload))
	}, [selectedModel, dispatch])

	const handleInstrumentalChange = (value: boolean) => {
		dispatch(setInstrumental(value))
	}

	const handleCustomModelChange = (value: boolean) => {
		dispatch(setCustomModel(value))
	}

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
		if (optionType === 'model') payload.model = String(value)

		dispatch(setGenerationParams(payload))
	}

	return (
		<div className='flex items-center justify-between gap-1'>
			{selectedModel?.type_generation !== 'text-audio' && (
				<button
					onClick={handleFileUploadClick}
					className='flex items-center justify-center w-[30px] h-[30px] rounded-full border border-dark-bg-transparency-12  bg-dark-bg-transparency-4 hover:bg-dark-bg-transparency-8 transition-colors duration-200'
				>
					<Image
						src='/icons/attach.svg'
						alt='Attach Icon'
						width={16}
						height={16}
					/>
				</button>
			)}

			<div
				className={cn('flex items-center gap-1', {
					'w-full justify-between': selectedModel?.type_generation === 'text-audio'
				})}
			>
				{selectedModel?.type_generation === 'text-audio' && (
					<ToggleSwitch
						label='Instrumental'
						checked={instrumental}
						onChange={handleInstrumentalChange}
					/>
				)}
				{/* {selectedModel?.type_generation === 'text-audio' && (
					<ToggleSwitch
						label='Custom Mode'
						checked={customModel}
						onChange={handleCustomModelChange}
					/>
				)} */}
				{selectedModel?.options && (
					<OptionSelect
						data={sanitizeOptionGroups(selectedModel.options)}
						onChange={handleOptionChange}
					/>
				)}

				{selectedModel?.type_generation !== 'text-audio' && <SeedInput />}
			</div>
		</div>
	)
}
