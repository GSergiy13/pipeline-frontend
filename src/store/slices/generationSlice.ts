import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { ModelConfigurationsItem } from 'types/ModelConfigurations.type'

type QuantityType = number
type DurationType = number | 'auto'
type QualityType = string

interface ModelOptions {
	quantities: QuantityType[]
	durations: DurationType[]
	qualities: QualityType[]
}

interface GenerationState {
	selectedModel: ModelConfigurationsItem | null
	availableOptions: ModelOptions
	selectedParams: {
		quantity: QuantityType | null
		duration: DurationType | null
		quality: QualityType | null
		seed: number | null
		prompt: string
	}
	videoCollectionIds: string[]
}
export type SelectedParams = GenerationState['selectedParams']

const initialState: GenerationState = {
	selectedModel: null,
	availableOptions: {
		quantities: [],
		durations: [],
		qualities: []
	},
	selectedParams: {
		quantity: null,
		duration: null,
		quality: null,
		seed: null,
		prompt: ''
	},
	videoCollectionIds: []
}

const generationSlice = createSlice({
	name: 'generation',
	initialState,
	reducers: {
		setSelectedModel(state, action: PayloadAction<ModelConfigurationsItem>) {
			state.selectedModel = action.payload
		},
		setGenerationParams(
			state,
			action: PayloadAction<{
				quantity?: QuantityType
				duration?: DurationType
				quality?: QualityType
				seed?: number
			}>
		) {
			const { quantity, duration, quality, seed } = action.payload
			if (quantity !== undefined) state.selectedParams.quantity = quantity
			if (duration !== undefined) state.selectedParams.duration = duration
			if (quality !== undefined) state.selectedParams.quality = quality
			if (seed !== undefined) state.selectedParams.seed = seed
		},
		setQuantity(state, action: PayloadAction<QuantityType>) {
			state.selectedParams.quantity = action.payload
		},
		setDuration(state, action: PayloadAction<DurationType>) {
			state.selectedParams.duration = action.payload
		},
		setQuality(state, action: PayloadAction<QualityType>) {
			state.selectedParams.quality = action.payload
		},
		setSeed(state, action: PayloadAction<number | null>) {
			state.selectedParams.seed = action.payload
		},
		clearSeed(state) {
			state.selectedParams.seed = null
		},
		setPrompt(state, action: PayloadAction<string>) {
			state.selectedParams.prompt = action.payload
		},
		resetGeneration(state) {
			state.selectedModel = null
			state.availableOptions = { quantities: [], durations: [], qualities: [] }
			state.selectedParams = {
				quantity: null,
				duration: null,
				quality: null,
				seed: null,
				prompt: ''
			}
		},
		clearVideoCollection(state) {
			state.videoCollectionIds = []
		},
		addVideoToCollection(state, action: PayloadAction<string>) {
			if (!state.videoCollectionIds.includes(action.payload)) {
				state.videoCollectionIds.push(action.payload)
			}
		},
		addVideosToCollection(state, action: PayloadAction<string[]>) {
			state.videoCollectionIds = [...new Set([...state.videoCollectionIds, ...action.payload])]
		}
	}
})

export const {
	setSelectedModel,
	setQuantity,
	setDuration,
	setQuality,
	setSeed,
	clearSeed,
	setPrompt,
	resetGeneration,
	setGenerationParams,
	addVideoToCollection,
	addVideosToCollection,
	clearVideoCollection
} = generationSlice.actions

export default generationSlice.reducer
