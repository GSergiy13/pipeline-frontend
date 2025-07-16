import { configureStore } from '@reduxjs/toolkit'

import generationReducer from './slices/generationSlice'
import userReducer from './slices/userSlice'

export const store = configureStore({
	reducer: {
		user: userReducer,
		generation: generationReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
