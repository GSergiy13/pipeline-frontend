export const handleVibrate = (
	type: 'light' | 'medium' | 'heavy' = 'medium',
	fallbackDuration = 100
) => {
	if (typeof window === 'undefined') return

	if (
		window.Telegram?.WebApp?.HapticFeedback?.impactOccurred &&
		typeof window.Telegram.WebApp.HapticFeedback.impactOccurred === 'function'
	) {
		try {
			window.Telegram.WebApp.HapticFeedback.impactOccurred(type)
		} catch (error) {
			if (navigator.vibrate) {
				navigator.vibrate(fallbackDuration)
			}
		}
	} else if (navigator.vibrate) {
		navigator.vibrate(fallbackDuration)
	} else {
		// console.warn('Haptic feedback is not supported on this device.')
	}
}
