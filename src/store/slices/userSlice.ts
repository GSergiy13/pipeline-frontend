import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface UserItem {
	key: string
	value: string | number
}

interface UserState {
	data: UserItem[] | null
}

const initialState: UserState = {
	data: null
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserData(state, action: PayloadAction<UserItem[]>) {
			state.data = action.payload
		},
		clearUserData(state) {
			state.data = null
		},
		updateUserItem(state, action: PayloadAction<{ key: string; value: string | number }>) {
			if (!Array.isArray(state.data)) return

			const index = state.data.findIndex(item => item.key === action.payload.key)
			if (index !== -1) {
				state.data[index].value = action.payload.value
			} else {
				state.data.push({
					key: action.payload.key,
					value: action.payload.value
				})
			}
		}
	}
})

export const { setUserData, clearUserData, updateUserItem } = userSlice.actions
export default userSlice.reducer
