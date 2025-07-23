import type { StatusItem } from 'components/StatusPanel/StatusPanel'
import { useEffect, useRef, useState } from 'react'

export function useProgress(loadingState: StatusItem[]) {
	const [fakeProgress, setFakeProgress] = useState(0)
	const intervalRef = useRef<NodeJS.Timeout | null>(null)

	useEffect(() => {
		const total = loadingState.length
		if (total === 0) {
			setFakeProgress(0)
			return
		}

		const completed = loadingState.filter(item => !item.status).length
		const step = 100 / total
		const baseTarget = step * completed
		const maxFakeStop = step * (completed + 0.99)

		if (intervalRef.current) {
			clearInterval(intervalRef.current)
			intervalRef.current = null
		}

		setFakeProgress(prev => (baseTarget > prev ? baseTarget : prev))

		if (completed < total) {
			const interval = setInterval(() => {
				setFakeProgress(prev => {
					let next = prev
					if (prev < baseTarget + step * 0.6) {
						next = prev + 2
					} else if (prev < baseTarget + step * 0.9) {
						next = prev + 1
					} else if (prev < maxFakeStop) {
						next = +(prev + 0.1).toFixed(1)
					}

					if (next >= maxFakeStop) {
						clearInterval(interval)
						intervalRef.current = null
						return maxFakeStop
					}

					return next
				})
			}, 800)
			intervalRef.current = interval
		}

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current)
				intervalRef.current = null
			}
		}
	}, [loadingState])

	return fakeProgress
}
