import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface UserState {
	user: {
		id: number | null
		name: string | null
		photo: string | null
		username: string | null
	} | null
	platform: string | null
	isMobileTelegram: boolean
}

const initialState: UserState = {
	user: null,
	platform: null,
	isMobileTelegram: false
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
			}>
		) {
			const { id, first_name, last_name, username, photo_url } = action.payload

			state.user = {
				id,
				name: [first_name, last_name].filter(Boolean).join(' '),
				username: username || null,
				photo: photo_url || null
			}
		},
		setPlatform(state, action: PayloadAction<string>) {
			const platform = action.payload
			state.platform = platform

			const isPhone =
				['android', 'ios'].includes(platform) &&
				typeof window !== 'undefined' &&
				window.innerWidth < 768

			state.isMobileTelegram = isPhone
		},
		clearUserData(state) {
			state.user = null
		}
	}
})

export const { setUserData, clearUserData, setPlatform } = userSlice.actions
export default userSlice.reducer
