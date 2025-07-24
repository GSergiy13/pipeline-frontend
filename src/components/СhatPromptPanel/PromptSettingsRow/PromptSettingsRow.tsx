'use client'

import cn from 'clsx'
import { ModelConfigurations } from 'constants/modelconfigurations.const'
import Image from 'next/image'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { setGenerationParams, setInstrumental } from 'store/slices/generationSlice'
import type { RootState } from 'store/store'
import { sanitizeOptionGroups } from 'utils/sanitizeOptionGroups'

import { OptionSelect } from '@/ui/OptionSelect/OptionSelect'
import { SeedInput } from '@/ui/Seed/SeedInput'
import { ToggleSwitch } from '@/ui/ToggleSwitch/ToggleSwitch'

interface PromptSettingsRowProps {
	onFileSelect: (file: File) => void
	isFileUploaded?: boolean
	setIsFileUploaded: (value: boolean) => void
}

const toastStyle = { style: { borderRadius: '10px', background: '#333', color: '#fff' } }

export const PromptSettingsRow = ({
	onFileSelect,
	isFileUploaded,
	setIsFileUploaded
}: PromptSettingsRowProps) => {
	const dispatch = useDispatch()
	const selectedModelId = useSelector((state: RootState) => state.generation.selectedModel?.id)
	const selectedModel = ModelConfigurations.find(model => model.id === selectedModelId)
	const instrumental = useSelector(
		(state: RootState) => state.generation.selectedParams.instrumental
	)

	// console.log('Selected Model:', selectedModelId)

	// const customModel = useSelector(
	// 	(state: RootState) => state.generation.selectedParams.custom_model
	// )

	useEffect(() => {
		if (!selectedModel || !selectedModel.options) return

		const payload: {
			quantity?: number
			duration?: number | 'auto'
			quality?: string
			aspectRatio?: string | null
			audioModel?: string | null
		} = {}

		const { quantity, duration, quality, aspectRatio, audioModel } = selectedModel.options

		if (quantity?.options?.[0]) {
			payload.quantity = quantity.options[0].value
		}

		if (duration?.options?.[0]) {
			const val = duration.options[0].value
			payload.duration = typeof val === 'number' || val === 'auto' ? val : 'auto'
		}

		if (quality?.options?.[0]) {
			payload.quality = quality.options[0].value
		}

		if (aspectRatio?.name?.[0]) {
			payload.aspectRatio = aspectRatio.options[0].name
		}

		if (selectedModel.options.audioModel?.options?.[0]) {
			payload.audioModel = selectedModel.options.audioModel.options[0].value
		}

		dispatch(setGenerationParams(payload))
	}, [selectedModel, dispatch])

	const handleInstrumentalChange = (value: boolean) => {
		dispatch(setInstrumental(value))
	}

	// const handleCustomModelChange = (value: boolean) => {
	// 	dispatch(setCustomModel(value))
	// }

	const handleFileUploadClick = () => {
		const input = document.createElement('input')
		input.type = 'file'
		input.accept = '.jpg,.jpeg,.png'
		input.onchange = e => {
			const file = (e.target as HTMLInputElement).files?.[0]
			if (!file) return

			const allowedExtensions = ['jpg', 'jpeg', 'png']
			const fileExtension = file.name.split('.').pop()?.toLowerCase()

			if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
				toast.error(
					`❌ $Неподдерживаемый формат. Загрузите изображения в формате JPG, JPEG или PNG.`,
					toastStyle
				)
				return
			}
			setIsFileUploaded(true)
			onFileSelect(file)
		}
		input.click()
	}
	const handleOptionChange = (optionType: string, value: string | number) => {
		const payload: Record<string, string | number> = {}

		if (optionType === 'quantity') payload.quantity = Number(value)
		if (optionType === 'duration') payload.duration = value === 'auto' ? 'auto' : Number(value)
		if (optionType === 'quality') payload.quality = String(value)
		if (optionType === 'model') payload.model = String(value)
		if (optionType === 'aspectRatio') payload.aspectRatio = String(value)
		if (optionType === 'audioModel') payload.audioModel = String(value)

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
						data={sanitizeOptionGroups(
							isFileUploaded && selectedModel?.type_generation !== 'img-to-img'
								? {
										...selectedModel.options,
										quantity: undefined
									}
								: selectedModel.options
						)}
						onChange={handleOptionChange}
					/>
				)}

				{selectedModel?.type_generation !== 'text-audio' && <SeedInput />}
			</div>
		</div>
	)
}
