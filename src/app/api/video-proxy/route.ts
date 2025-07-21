// /app/api/video-proxy/route.ts
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs' // потрібен стрімінг великих файлів

export async function GET(req: NextRequest) {
	const videoUrl = req.nextUrl.searchParams.get('url')
	if (!videoUrl) {
		return NextResponse.json({ error: 'Missing video URL' }, { status: 400 })
	}

	// --> 1. Проксіюємо з урахуванням Range
	const range = req.headers.get('range') || undefined
	const upstream = await fetch(videoUrl, { headers: range ? { range } : undefined })

	// --> 2. Копіюємо усі заголовки
	const headers = new Headers(upstream.headers)
	headers.set('Access-Control-Allow-Origin', '*') // додаємо свій CORS
	// Safari інколи вимогливий до Accept-Ranges/Content-Range
	if (!headers.has('accept-ranges')) headers.set('Accept-Ranges', 'bytes')

	// --> 3. Повертаємо той самий статус (200/206/3xx) і body як стрім
	return new NextResponse(upstream.body, {
		status: upstream.status,
		headers
	})
}
