import axios from 'axios'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	const cookieStore = await cookies()
	const tgId = cookieStore.get('telegramId')?.value
	const payload = await req.json()

	if (!payload) {
		return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
	}
	if (!tgId) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

	try {
		const { data } = await axios.post(`${process.env.API_URL}/generate/t2v`, payload, {
			headers: {
				'Content-Type': 'application/json',
				'X-Telegram-ID': tgId
			}
		})

		return NextResponse.json(data, { status: 200 })
	} catch (e: any) {
		console.error('Server Error:', e.message)
		return NextResponse.json({ message: 'Error generating video' }, { status: 500 })
	}
}
