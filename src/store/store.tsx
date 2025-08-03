import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE,
	persistReducer,
	persistStore
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import controlPanelReducer from './slices/controlPanelSlice'
import generationDetailsReducer from './slices/generationDetailsSlice'
import generationProgressReducer from './slices/generationProgressSlice'
import userReducer from './slices/userSlice'

const rootReducer = combineReducers({
	user: userReducer,
	controlPanel: controlPanelReducer,
	generationProgress: generationProgressReducer,
	generationDetails: generationDetailsReducer
})

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['user', 'generationProgress', 'generationDetails']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
			}
		})
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
