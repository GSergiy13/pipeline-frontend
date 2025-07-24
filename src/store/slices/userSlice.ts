import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface UserState {
	user: {
		name: string | null
		balance: number
		tg_data: {
			id: number
			first_name: string
			last_name?: string
			username?: string
			photo_url?: string
		} | null
	} | null
	platform: string | null
	isMobileTelegram: boolean
}

const initialState: UserState = {
	user: {
		name: null,
		balance: 1200,
		tg_data: null
	},
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

			const name = [first_name, last_name].filter(Boolean).join(' ')

			if (!state.user) {
				state.user = {
					name,
					balance: 0,
					tg_data: {
						id,
						first_name,
						last_name,
						username,
						photo_url
					}
				}
			} else {
				state.user.name = name
				state.user.tg_data = {
					id,
					first_name,
					last_name,
					username,
					photo_url
				}
			}
		},

		setBalance(state, action: PayloadAction<number>) {
			if (state.user) {
				state.user.balance = action.payload
			}
		},

		increaseBalance(state, action: PayloadAction<number>) {
			if (state.user) {
				state.user.balance += action.payload
			}
		},

		decreaseBalance(state, action: PayloadAction<number>) {
			if (state.user) {
				state.user.balance -= action.payload
			}
		},

		setPlatform(state, action: PayloadAction<string>) {
			state.platform = action.payload
		},

		setIsMobileTelegram(state, action: PayloadAction<boolean>) {
			state.isMobileTelegram = action.payload
		},

		clearUserData(state) {
			state.user = {
				name: null,
				balance: 0,
				tg_data: null
			}
			state.platform = null
			state.isMobileTelegram = false
		}
	}
})

export const {
	setUserData,
	setBalance,
	increaseBalance,
	decreaseBalance,
	clearUserData,
	setPlatform,
	setIsMobileTelegram
} = userSlice.actions

export default userSlice.reducer
