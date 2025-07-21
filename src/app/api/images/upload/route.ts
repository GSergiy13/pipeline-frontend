import axios from 'axios'
import FormData from 'form-data'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	try {
		const telegramId = req.headers.get('X-Telegram-ID')
		if (!telegramId) {
			return NextResponse.json({ success: false, message: 'Missing telegramId' }, { status: 400 })
		}

		const formData = await req.formData()
		const file = formData.get('image') as File | null

		if (!file) {
			return NextResponse.json({ success: false, message: 'Image not provided' }, { status: 400 })
		}

		// Читання файла в buffer
		const arrayBuffer = await file.arrayBuffer()
		const buffer = Buffer.from(arrayBuffer)

		const forwardForm = new FormData()
		forwardForm.append('image', buffer, file.name)

		const { data } = await axios.post(`${process.env.API_URL}/api/images/upload`, forwardForm, {
			headers: {
				...forwardForm.getHeaders(),
				'X-Telegram-ID': telegramId
			}
		})

		return NextResponse.json(data, { status: 200 })
	} catch (err: any) {
		console.error('Forward upload error:', err.message)
		return NextResponse.json({ success: false, message: 'Upload failed' }, { status: 500 })
	}
}
