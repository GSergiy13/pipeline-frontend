import axios from 'axios'
import FormData from 'form-data'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	const cookieStore = await cookies()

	const tgId = cookieStore.get('telegramId')?.value

	if (!tgId) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

	try {
		const formData = await req.formData()
		const file = formData.get('image') as File | null

		if (!file) {
			return NextResponse.json({ success: false, message: 'Image not provided' }, { status: 400 })
		}

		const arrayBuffer = await file.arrayBuffer()
		const buffer = Buffer.from(arrayBuffer)

		const forwardForm = new FormData()
		forwardForm.append('image', buffer, file.name)

		const { data } = await axios.post(`${process.env.API_URL}/api/images/upload`, forwardForm, {
			headers: {
				...forwardForm.getHeaders(),
				'X-Telegram-ID': tgId
			}
		})

		return NextResponse.json(data, { status: 200 })
	} catch (err: any) {
		console.error('Forward upload error:', err.message)
		return NextResponse.json({ success: false, message: 'Upload failed' }, { status: 500 })
	}
}
