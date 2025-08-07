import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import type { BaseGeneration } from 'types/Generation.type'

import type { RootState } from '../store'

const adapter = createEntityAdapter<BaseGeneration, string>({
	selectId: item => (item._id || item.id) as string
})

const generationDetailsSlice = createSlice({
	name: 'generationDetails',
	initialState: adapter.getInitialState(),
	reducers: {
		upsertGeneration: adapter.upsertOne,
		upsertManyGenerations: adapter.upsertMany,
		removeGeneration: adapter.removeOne,
		clearAllGenerations: adapter.removeAll
	}
})

export const { upsertGeneration, upsertManyGenerations, removeGeneration, clearAllGenerations } =
	generationDetailsSlice.actions

export default generationDetailsSlice.reducer

export const generationSelectors = adapter.getSelectors(
	(state: RootState) => state.generationDetails
)
