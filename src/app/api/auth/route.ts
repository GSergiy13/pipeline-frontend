import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	try {
		const telegramId = req.headers.get('X-Telegram-ID')

		if (!telegramId) {
			return NextResponse.json({ message: 'Missing X-Telegram-ID header' }, { status: 400 })
		}

		const { data } = await axios.post(
			`${process.env.API_URL}/api/users/verify`,
			{
				telegramId
			},
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)

		return NextResponse.json(data, { status: 200 })
	} catch (e: any) {
		console.error('Verify Error:', e?.response?.data || e.message)
		return NextResponse.json(
			{ message: 'Error verifying user', error: e?.response?.data || e.message },
			{ status: e?.response?.status || 500 }
		)
	}
}
