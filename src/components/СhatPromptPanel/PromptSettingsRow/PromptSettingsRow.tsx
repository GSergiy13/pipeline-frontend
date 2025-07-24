'use client'

import { createSelector } from '@reduxjs/toolkit'
import cn from 'clsx'
import { ModelConfigurations } from 'constants/modelconfigurations.const'
import { useInitDefaults } from 'hooks/useInitDefaults'
import { memo, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setGenerationParams, setInstrumental } from 'store/slices/generationSlice'
import type { AppDispatch, RootState } from 'store/store'
import { sanitizeOptionGroups } from 'utils/sanitizeOptionGroups'

import { ImageAttachButton } from '@/ui/ImageAttachButton/ImageAttachButton'
import { OptionSelect } from '@/ui/OptionSelect/OptionSelect'
import { SeedInput } from '@/ui/Seed/SeedInput'
import { ToggleSwitch } from '@/ui/ToggleSwitch/ToggleSwitch'

const selectPS = createSelector(
	[
		(s: RootState) => s.generation.selectedModel?.id,
		(s: RootState) => s.generation.selectedParams.attachmentFilename,
		(s: RootState) => s.generation.selectedParams.instrumental
	],
	(id, attachmentFilename, instrumental) => ({ id, attachmentFilename, instrumental })
)

export const PromptSettingsRow = memo(
	({ onFileSelect }: { onFileSelect: (file: File) => void }) => {
		const dispatch = useDispatch<AppDispatch>()

		const { id: selectedModelId, attachmentFilename, instrumental } = useSelector(selectPS)

		const selectedModel = useMemo(
			() => ModelConfigurations.find(m => m.id === selectedModelId) ?? null,
			[selectedModelId]
		)

		useInitDefaults(selectedModel, dispatch)

		const handleOptionChange = useCallback(
			(groupId: string, value: string | number) => {
				const payload: Record<string, string | number> = {}

				if (groupId === 'quantity') payload.quantity = Number(value)
				else if (groupId === 'duration')
					payload.duration = value === 'auto' ? 'auto' : Number(value)
				else payload[groupId] = String(value)

				dispatch(setGenerationParams(payload))
			},
			[dispatch]
		)

		const handleInstrumentalChange = useCallback(
			(v: boolean) => {
				dispatch(setInstrumental(v))
			},
			[dispatch]
		)

		const sanitizedOptions = useMemo(() => {
			if (!selectedModel?.options) return undefined

			const opts =
				attachmentFilename && selectedModel.type_generation !== 'img-to-img'
					? { ...selectedModel.options, quantity: undefined }
					: selectedModel.options

			return sanitizeOptionGroups(opts)
		}, [selectedModelId, selectedModel?.type_generation, attachmentFilename])

		const isTextAudio = selectedModel?.type_generation === 'text-audio'

		return (
			<div className='flex items-center justify-between gap-1'>
				{selectedModel?.supportImage ? <ImageAttachButton onSelect={onFileSelect} /> : <div></div>}

				<div
					className={cn('flex items-center gap-1', {
						'w-full justify-between': isTextAudio
					})}
				>
					{isTextAudio && (
						<ToggleSwitch
							label='Instrumental'
							checked={instrumental}
							onChange={handleInstrumentalChange}
						/>
					)}

					{sanitizedOptions && (
						<OptionSelect
							data={sanitizedOptions}
							onChange={handleOptionChange}
						/>
					)}

					{!isTextAudio && <SeedInput />}
				</div>
			</div>
		)
	}
)

PromptSettingsRow.displayName = 'PromptSettingsRow'
