// import { updateUserName } from '@/store/slices/settingsSlice'
// import { setFullScreen } from '@/store/slices/telegramSlice'

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
// dispatch: Dispatch<any>
export const initializeTelegram = () => {
	const tg = getTelegram()

	console.log('Initializing Telegram WebApp...')

	if (tg) {
		tg.ready()
		const user = tg.initDataUnsafe?.user || null

		console.log('Telegram WebApp initialized:', tg)

		if (user?.username) {
			// dispatch(updateUserName(user.username))
		}

		tg.expand()
		// dispatch(setFullScreen(false)) // Початковий стан

		// Відстежуємо зміни вікна (включаємо fullscreen або вихід з нього)
		tg.onEvent('viewportChanged', () => {
			// dispatch(setFullScreen(tg.isExpanded || false))
			console.log('viewportChanged -> isExpanded:', tg.isExpanded)
		})

		console.log('Telegram WebApp initialized ----', tg.isExpanded)

		try {
			const version = tg.version || '0.0'
			console.log(`Telegram WebApp version: ${version}`)
			const [major, minor] = version.split('.').map(Number)

			const disableSwipesSupported = major > 6 || (major === 6 && minor >= 1)
			const fullscreenSupported = major > 7 || (major === 7 && minor >= 0) // Bot API 8.0+

			if (disableSwipesSupported && typeof tg.disableVerticalSwipes === 'function') {
				tg.disableVerticalSwipes()
			}

			// Якщо мобільний пристрій, автоматично відкриваємо fullscreen
			if (isMobileDevice() && fullscreenSupported && typeof tg.requestFullscreen === 'function') {
				tg.requestFullscreen()
				tg.enableClosingConfirmation()
				// dispatch(setFullScreen(true))
			}
		} catch (error) {
			console.error('Error disabling vertical swipes or requesting fullscreen:', error)
		}
	}
}
