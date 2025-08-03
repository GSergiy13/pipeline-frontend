import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import type { RootState } from '../store'

export interface ProgressStatus {
	id: string
	isLoading: boolean
	isComplete: boolean
}

const adapter = createEntityAdapter<ProgressStatus>()

const generationProgressSlice = createSlice({
	name: 'generationProgress',
	initialState: adapter.getInitialState(),
	reducers: {
		upsertStatus: adapter.upsertOne,
		upsertManyStatuses: adapter.upsertMany,
		removeStatus: adapter.removeOne,
		clearAllProgress: adapter.removeAll
	}
})

export const { upsertStatus, upsertManyStatuses, removeStatus, clearAllProgress } =
	generationProgressSlice.actions

export default generationProgressSlice.reducer

export const progressSelectors = adapter.getSelectors(
	(state: RootState) => state.generationProgress
)
