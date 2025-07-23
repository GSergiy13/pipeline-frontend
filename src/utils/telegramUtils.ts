import type { Dispatch } from '@reduxjs/toolkit'
import { setIsMobileTelegram, setPlatform, setUserData } from 'store/slices/userSlice'

declare global {
	interface Window {
		Telegram: any
	}
}

export const getTelegram = () => {
	if (typeof window !== 'undefined' && window.Telegram) {
		return window.Telegram.WebApp
	}
	return null
}

export const initializeTelegram = (dispatch: Dispatch<any>) => {
	const tg = getTelegram()

	if (tg) {
		tg.ready()
		const user = tg.initDataUnsafe?.user

		if (user && user.id) {
			document.cookie = `telegramId=${user.id}; path=/; max-age=31536000; secure; SameSite=Lax`
		}

		if (user) {
			dispatch(setUserData(user))
		}

		tg.expand()

		try {
			const version = tg.version || '0.0'
			// console.log(`Telegram WebApp version: ${version}`)
			const [major, minor] = version.split('.').map(Number)

			const disableSwipesSupported = major > 6 || (major === 6 && minor >= 1)
			const fullscreenSupported = major > 7 || (major === 7 && minor >= 0)

			if (disableSwipesSupported && typeof tg.disableVerticalSwipes === 'function') {
				tg.disableVerticalSwipes()
			}

			const isPhone =
				['android', 'ios'].includes(tg.platform) &&
				/Mobi|iPhone|Android(?!.*Tablet)/i.test(navigator.userAgent) &&
				window.innerWidth < 768

			dispatch(setPlatform(tg.platform))
			dispatch(setIsMobileTelegram(isPhone))

			if (isPhone && fullscreenSupported && typeof tg.requestFullscreen === 'function') {
				tg.requestFullscreen()
				tg.enableClosingConfirmation()
			}
		} catch (error) {
			console.error('Error disabling vertical swipes or requesting fullscreen:', error)
		}
	}
}
