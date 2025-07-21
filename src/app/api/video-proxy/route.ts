import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const videoUrl = req.nextUrl.searchParams.get('url')
	if (!videoUrl) {
		return NextResponse.json({ error: 'Missing video URL' }, { status: 400 })
	}

	try {
		const response = await fetch(videoUrl)
		const blob = await response.arrayBuffer()

		return new NextResponse(blob, {
			status: 200,
			headers: {
				'Content-Type': 'video/mp4',
				'Access-Control-Allow-Origin': '*'
			}
		})
	} catch (e) {
		console.error('Proxy error:', e)
		return NextResponse.json({ error: 'Failed to proxy video' }, { status: 500 })
	}
}
