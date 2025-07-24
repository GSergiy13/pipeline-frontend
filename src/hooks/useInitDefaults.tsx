import type { ModelConfigurations } from 'constants/modelconfigurations.const'
import { useEffect, useRef } from 'react'
import { setGenerationParams } from 'store/slices/generationSlice'
import type { AppDispatch } from 'store/store'

export function useInitDefaults(
	selectedModel: (typeof ModelConfigurations)[number] | null,
	dispatch: AppDispatch
) {
	const initedRef = useRef<string | null>(null)

	useEffect(() => {
		if (!selectedModel?.id || !selectedModel.options) return
		if (initedRef.current === selectedModel.id) return
		initedRef.current = selectedModel.id

		const { quantity, duration, quality, aspectRatio, audioModel } = selectedModel.options

		const payload: {
			quantity?: number
			duration?: number | 'auto'
			quality?: string
			aspectRatio?: string | null
			audioModel?: string | null
		} = {}

		if (quantity?.options?.[0]) payload.quantity = quantity.options[0].value
		if (duration?.options?.[0]) {
			const v = duration.options[0].value
			payload.duration = typeof v === 'number' || v === 'auto' ? v : 'auto'
		}
		if (quality?.options?.[0]) payload.quality = quality.options[0].value
		if (aspectRatio?.options?.[0]) payload.aspectRatio = aspectRatio.options[0].name
		if (audioModel?.options?.[0]) payload.audioModel = audioModel.options[0].value

		dispatch(setGenerationParams(payload))
	}, [selectedModel, dispatch])
}
