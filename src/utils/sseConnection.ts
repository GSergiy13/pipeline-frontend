export interface SSEConnectionOptions {
	url: string
	maxRetries?: number
	retryInterval?: number
	onOpen?: () => void
	onError?: (e: Event) => void
	onMessage?: (ev: MessageEvent) => void
}

export const createSSEConnection = ({
	url,
	maxRetries = 3,
	retryInterval = 3000,
	onOpen,
	onError,
	onMessage
}: SSEConnectionOptions) => {
	let es: EventSource | null = null
	let connected = false
	let attempts = 0
	let timer: ReturnType<typeof setTimeout> | null = null

	const close = () => {
		es?.close()
		es = null
		connected = false
		attempts = 0
		if (timer) clearTimeout(timer)
	}

	const connect = () => {
		if (connected) return
		es = new EventSource(url)
		connected = true

		es.onopen = () => {
			attempts = 0
			onOpen?.()
		}

		es.onerror = e => {
			onError?.(e)
			close()
			if (attempts < maxRetries) {
				attempts++
				timer = setTimeout(connect, retryInterval)
			}
		}

		es.onmessage = ev => onMessage?.(ev)
	}

	return { connect, close, isConnected: () => connected }
}
