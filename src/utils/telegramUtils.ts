import type { Dispatch } from '@reduxjs/toolkit'
import { setPlatform, setUserData } from 'store/slices/userSlice'

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

export const isMobileDevice = (): boolean => {
	if (typeof navigator === 'undefined') return false
	return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

export const initializeTelegram = (dispatch: Dispatch<any>) => {
	const tg = getTelegram()

	if (tg) {
		tg.ready()
		const user = tg.initDataUnsafe?.user

		if (user) {
			dispatch(setUserData(user))
		}

		tg.expand()

		try {
			const version = tg.version || '0.0'
			console.log(`Telegram WebApp version: ${version}`)
			const [major, minor] = version.split('.').map(Number)

			const disableSwipesSupported = major > 6 || (major === 6 && minor >= 1)
			const fullscreenSupported = major > 7 || (major === 7 && minor >= 0)

			if (disableSwipesSupported && typeof tg.disableVerticalSwipes === 'function') {
				tg.disableVerticalSwipes()
			}

			dispatch(
				setPlatform({
					platform: tg.platform,
					isMobileTelegram: ['android', 'ios'].includes(tg.platform) && window.innerWidth < 768
				})
			)

			if (isMobileDevice() && fullscreenSupported && typeof tg.requestFullscreen === 'function') {
				tg.requestFullscreen()
				tg.enableClosingConfirmation()
			}
		} catch (error) {
			console.error('Error disabling vertical swipes or requesting fullscreen:', error)
		}
	}
}
