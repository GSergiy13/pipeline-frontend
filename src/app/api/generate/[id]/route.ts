import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'
import type { GetGenerationError, GetGenerationResponse } from 'types/IVideo.type'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest, context: { params: { id: string } }) {
	const generationId = context.params.id
	const telegramId = req.headers.get('x-telegram-id') ?? ''

	if (!generationId) {
		const error: GetGenerationError = {
			success: false,
			message: 'Missing generationId'
		}
		return NextResponse.json(error, { status: 400 })
	}

	try {
		const { data } = await axios.get<GetGenerationResponse>(
			`${process.env.API_URL}/generate/${generationId}`,
			{
				headers: {
					'Content-Type': 'application/json',
					'X-Telegram-ID': telegramId
				}
			}
		)

		return NextResponse.json(data, { status: 200 })
	} catch (err: any) {
		console.error('Помилка при отриманні генерації:', err.message)
		const error: GetGenerationError = {
			success: false,
			message: 'Failed to fetch generation'
		}
		return NextResponse.json(error, { status: 500 })
	}
}
