import { type CaseReducer, type Draft, type PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { RootState } from 'store/store'

type Quantity = number
type Duration = number | 'auto'
type Quality = string
type ModelId = string

export interface ModelOptions {
	quantities: Quantity[]
	durations: Duration[]
	qualities: Quality[]
	models?: ModelId[]
	audioModels?: ModelId[]
}

export interface ControlPanelState {
	options: ModelOptions
	selected: {
		modelId: string | null
		quantity: Quantity | null
		duration: Duration | null
		quality: Quality | null
		seed: number | null
		prompt: string
		aspectRatio: string | null
		audioModel: string | null
		model: ModelId | null
		instrumental: boolean
		customModel: boolean
		attachmentFilename: string | null
		titleAudio?: string
		lyricsAudio?: string
	}
	focusInput: boolean
}

const initial: ControlPanelState = {
	options: {
		quantities: [],
		durations: [],
		qualities: [],
		models: [],
		audioModels: []
	},
	selected: {
		modelId: null,
		quantity: null,
		duration: null,
		quality: null,
		seed: null,
		prompt: '',
		aspectRatio: null,
		audioModel: null,
		model: null,
		instrumental: false,
		customModel: false,
		attachmentFilename: null,
		titleAudio: '',
		lyricsAudio: ''
	},
	focusInput: false
}

type SelectedKey = keyof ControlPanelState['selected']
type SetSelectedPayload<K extends SelectedKey> = {
	key: K
	value: ControlPanelState['selected'][K]
}

const setSelectedReducer = <K extends SelectedKey = SelectedKey>(
	state: Draft<ControlPanelState>,
	action: PayloadAction<SetSelectedPayload<K>>
) => {
	state.selected[action.payload.key] = action.payload.value as any
}

const controlPanelSlice = createSlice({
	name: 'controlPanel',
	initialState: initial,
	reducers: {
		setOptions(state, a: PayloadAction<ModelOptions>) {
			state.options = a.payload
		},

		setSelected: setSelectedReducer as CaseReducer<
			ControlPanelState,
			PayloadAction<SetSelectedPayload<SelectedKey>>
		>,

		patchSelected(state, a: PayloadAction<Partial<ControlPanelState['selected']>>) {
			Object.assign(state.selected, a.payload)
		},

		setFocusInput(state, a: PayloadAction<boolean>) {
			state.focusInput = a.payload
		},

		resetForm(state) {
			state.selected = initial.selected
			state.focusInput = false
		}
	}
})

export const selectSelected = (state: RootState) => state.controlPanel.selected
export const selectFocusInput = (state: RootState) => state.controlPanel.focusInput
export const selectModelId = (state: RootState) => state.controlPanel.selected.modelId
export const selectPrompt = (state: RootState) => state.controlPanel.selected.prompt
export const selectSeed = (state: RootState) => state.controlPanel.selected.seed

export const { setOptions, setSelected, patchSelected, setFocusInput, resetForm } =
	controlPanelSlice.actions

export default controlPanelSlice.reducer
