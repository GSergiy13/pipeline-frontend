// app/api/generate/[id]/route.ts
import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'
import type { GetGenerationError, GetGenerationResponse } from 'types/IVideo.type'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
	const generationId = params.id

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
					'X-Telegram-ID': '5621694270' // або динамічно з сесії
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
