/* store/slices/generationProgressSlice.ts */
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import type { RootState } from '../store'

// ↩ підстрой, якщо інший шлях

/* ── Тип одного запису ── */
export interface ProgressStatus {
	id: string // videoId
	isLoading: boolean
	isComplete: boolean
}

/* ── Entity-adapter: без selectId – використано дефолт (entity.id) ── */
const adapter = createEntityAdapter<ProgressStatus>()

/* ── Slice ── */
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

/* ── Експорт екшенів ── */
export const { upsertStatus, upsertManyStatuses, removeStatus, clearAllProgress } =
	generationProgressSlice.actions

/* ── Ред’юсер за замовченням ── */
export default generationProgressSlice.reducer

/* ── Селектори ── */
export const progressSelectors = adapter.getSelectors(
	(state: RootState) => state.generationProgress
)
