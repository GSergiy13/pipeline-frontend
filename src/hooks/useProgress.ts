import { useEffect, useMemo, useRef, useState } from 'react'
import type { VideoLoadingStatus } from 'store/slices/generationSlice'

type Interval = ReturnType<typeof setInterval>

export function useProgress(
	loadingState: { id: string; status: VideoLoadingStatus }[],
	persist = true
) {
	const storageKey = useMemo(
		() =>
			persist
				? `fp:${loadingState
						.map(i => i.id)
						.sort()
						.join('|')}`
				: '',
		[loadingState, persist]
	)

	const [fakeProgress, setFakeProgress] = useState<number>(() => {
		if (!persist || typeof window === 'undefined') return 0
		const saved = Number(sessionStorage.getItem(storageKey))
		return isNaN(saved) ? 0 : saved
	})

	const intervalRef = useRef<Interval | null>(null)

	useEffect(() => {
		const total = loadingState.length
		if (total === 0) {
			setFakeProgress(0)
			if (persist) sessionStorage.removeItem(storageKey)
			return
		}

		const completed = loadingState.filter(item => !item.status.isLoading).length
		const step = 100 / total
		const baseTarget = step * completed
		const maxFakeStop = step * (completed + 0.99)

		setFakeProgress(prev => (baseTarget > prev ? baseTarget : prev))

		if (intervalRef.current) {
			clearInterval(intervalRef.current)
			intervalRef.current = null
		}

		if (completed < total) {
			const interval = setInterval(() => {
				setFakeProgress(prev => {
					let next = prev
					if (prev < baseTarget + step * 0.6) next = prev + 2
					else if (prev < baseTarget + step * 0.9) next = prev + 1
					else if (prev < maxFakeStop) next = +(prev + 0.1).toFixed(1)

					if (next >= maxFakeStop) {
						clearInterval(interval)
						intervalRef.current = null
						return maxFakeStop
					}
					return next
				})
			}, 800)
			intervalRef.current = interval
		} else {
			setFakeProgress(100)
			if (persist) sessionStorage.removeItem(storageKey)
		}

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current)
				intervalRef.current = null
			}
		}
	}, [loadingState, persist, storageKey])

	useEffect(() => {
		if (persist && typeof window !== 'undefined') {
			sessionStorage.setItem(storageKey, String(fakeProgress))
		}
	}, [fakeProgress, persist, storageKey])

	return fakeProgress
}
