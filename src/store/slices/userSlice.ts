import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface UserState {
	user: {
		id: number | null
		name: string | null
		photo: string | null
		username: string | null
		languageCode: string | null
		allowPm: boolean
	} | null
}

const initialState: UserState = {
	user: null
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserData(
			state,
			action: PayloadAction<{
				id: number
				first_name: string
				last_name?: string
				username?: string
				photo_url?: string
				language_code?: string
				allows_write_to_pm?: boolean
			}>
		) {
			const { id, first_name, last_name, username, photo_url, language_code, allows_write_to_pm } =
				action.payload

			state.user = {
				id,
				name: [first_name, last_name].filter(Boolean).join(' '),
				username: username || null,
				photo: photo_url || null,
				languageCode: language_code || null,
				allowPm: !!allows_write_to_pm
			}
		},
		clearUserData(state) {
			state.user = null
		}
	}
})

export const { setUserData, clearUserData } = userSlice.actions
export default userSlice.reducer
