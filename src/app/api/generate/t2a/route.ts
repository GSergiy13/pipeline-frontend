import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	try {
		const payload = await req.json()
		const telegramId = req.headers.get('X-Telegram-ID') || 'default-id'

		const { data } = await axios.post(`${process.env.API_URL}/generate/t2a`, payload, {
			headers: {
				'Content-Type': 'application/json',
				'X-Telegram-ID': telegramId
			}
		})

		return NextResponse.json(data, { status: 200 })
	} catch (e: any) {
		console.error('Server Error:', e.message)
		return NextResponse.json({ message: 'Error generating video' }, { status: 500 })
	}
}
