import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const url = req.nextUrl.searchParams.get('url')
	const filename = req.nextUrl.searchParams.get('filename') ?? 'video.mp4'

	if (!url) {
		return NextResponse.json({ error: 'Missing URL' }, { status: 400 })
	}

	const res = await fetch(url)
	const buffer = await res.arrayBuffer()

	return new NextResponse(Buffer.from(buffer), {
		status: 200,
		headers: {
			'Content-Type': 'video/mp4',
			'Content-Disposition': `attachment; filename="${filename}"`
		}
	})
}
