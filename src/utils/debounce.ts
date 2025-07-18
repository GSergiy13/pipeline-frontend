export function debounce<T extends (...args: any[]) => void>(
	func: T,
	delay = 500
): (...args: Parameters<T>) => void {
	let timeoutId: ReturnType<typeof setTimeout>

	return (...args: Parameters<T>) => {
		clearTimeout(timeoutId)
		timeoutId = setTimeout(() => {
			func(...args)
		}, delay)
	}
}
