import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	try {
		const body = await req.json()

		const response = await axios.post(`${process.env.API_URL}/generate/t2v`, body, {
			headers: {
				'Content-Type': 'application/json',
				'X-Telegram-ID': body.telegramId || 'default-id'
			}
		})

		return NextResponse.json(response.data, { status: 200 })
	} catch (error: any) {
		console.error('Server Error:', error.message)
		return NextResponse.json({ message: 'Error generating video' }, { status: 500 })
	}
}
