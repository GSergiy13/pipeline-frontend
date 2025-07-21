import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

import fs from 'fs/promises'

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

		const arrayBuffer = await file.arrayBuffer()
		const buffer = Buffer.from(arrayBuffer)

		const ext = file.name.split('.').pop()
		const filename = `image_${Date.now()}_${uuidv4()}.${ext}`
		const uploadDir = path.join(process.cwd(), 'public', 'uploads', telegramId)

		await fs.mkdir(uploadDir, { recursive: true })

		const filePath = path.join(uploadDir, filename)
		await fs.writeFile(filePath, buffer)

		const relativeUrl = `/uploads/${telegramId}/${filename}`
		const fullUrl = `${process.env.API_URL}${relativeUrl}`

		return NextResponse.json({
			success: true,
			message: 'Успішно завантажено зображення',
			url: fullUrl,
			filename: `${telegramId}/${filename}`
		})
	} catch (error) {
		console.error('Upload error:', error)
		return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
	}
}
