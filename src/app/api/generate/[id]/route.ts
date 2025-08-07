import axios from 'axios'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import type { ApiResponse, GenerationDetails } from 'types/Generation.type'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const cookieStore = await cookies()
	const { id: generationId } = await params
	const tgId = cookieStore.get('telegramId')?.value

	if (!generationId) {
		const error: ApiResponse<null> = {
			success: false,
			message: 'Missing generationId'
		}
		return NextResponse.json(error, { status: 400 })
	}

	if (!tgId) {
		const error: ApiResponse<null> = {
			success: false,
			message: 'Unauthorized'
		}
		return NextResponse.json(error, { status: 401 })
	}

	try {
		const { data } = await axios.get<ApiResponse<GenerationDetails>>(
			`${process.env.API_URL}/generate/${generationId}`,
			{
				headers: {
					'Content-Type': 'application/json',
					'X-Telegram-ID': tgId
				}
			}
		)

		return NextResponse.json(data, { status: 200 })
	} catch (err: any) {
		console.error('❌ Помилка при отриманні генерації:', err?.response?.data || err.message)

		const error: ApiResponse<null> = {
			success: false,
			message: err?.response?.data?.message || err?.message || 'Failed to fetch generation'
		}
		return NextResponse.json(error, { status: 500 })
	}
}
