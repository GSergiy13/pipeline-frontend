import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
	const cookieStore = await cookies()
	const telegramId = cookieStore.get('telegramId')?.value

	if (!telegramId) {
		return new Response('Unauthorized: No telegramId cookie', { status: 401 })
	}

	const backendUrl = `${process.env.API_URL}/api/sse/user/${telegramId}/generation/status-stream?token=${telegramId}`

	const backendResponse = await fetch(backendUrl)

	if (!backendResponse.ok || !backendResponse.body) {
		return new Response('Failed to connect to SSE backend', { status: 500 })
	}

	return new Response(backendResponse.body, {
		status: 200,
		headers: {
			'Content-Type': 'text/event-stream',
			'Cache-Control': 'no-cache',
			Connection: 'keep-alive'
		}
	})
}
