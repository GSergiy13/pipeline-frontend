## API Документація

Проект надає наступні API ендпоінти для генерації відео та аудіо:

### Загальні вимоги до всіх запитів

**Обов'язкові заголовки (Headers):**

```
X-Telegram-ID: 123456789  // Ідентифікатор користувача в Telegram
```

Всі запити повинні містити заголовок `X-Telegram-ID` з ідентифікатором користувача в Telegram. Цей
заголовок використовується для авторизації та відстеження генерацій користувача.

## API для генерації відео та зображень

### Text-to-Video Generation

**Endpoint:** `POST /generate/t2v`

**Опис:** Генерує відео на основі текстового опису.

**Request Body:**

```json
{
	"seedPrompt": "A beautiful sunset over the ocean", // Обов'язковий параметр, текстовий опис для генерації відео
	"model": "seedance-lite", // Необов'язковий параметр, модель для генерації відео
	"duration": 5, // Необов'язковий параметр, тривалість відео в секундах
	"seed": 42, // Необов'язковий параметр, seed для відтворюваності результатів
	"generationCount": 1, // Необов'язковий параметр, кількість відео для генерації (1 або 2)
	"negativePrompt": "bad quality, blurry", // Необов'язковий параметр, текст, який описує що НЕ повинно бути у відео (для моделей Kling)
	"guidanceScale": 0.7, // Необов'язковий параметр, сила впливу промпту від 0.0 до 1.0 (для моделей Kling)
	"aspectRatio": "16:9" // Необов'язковий параметр, співвідношення сторін відео: '16:9', '9:16' або '1:1' (для моделей Kling T2V)
}
```

**Доступні моделі:**

- seedance-lite (доступні тривалості: 5, 10 секунд)
- hailuo02-standard (доступні тривалості: 6, 10 секунд)
- hailuo02-pro (тривалість встановлюється автоматично)
- seedance-v1-pro-480p (доступні тривалості: 5, 10 секунд)
- seedance-v1-pro-720p (доступні тривалості: 5, 10 секунд)
- seedance-v1-pro-1080p (доступні тривалості: 5, 10 секунд)
- veo3 (тривалість встановлюється автоматично, 8 секунд)
- veo3_fast (тривалість встановлюється автоматично, 8 секунд)
- kling-v2.1-t2v-master (доступні тривалості: 5, 10 секунд)

**Response (Success - 200):**

```json
{
	"message": "Запит на генерацію 1 відео з тексту прийнято",
	"generations": [
		{
			"generationId": "60f7b0b3e6b3a1234567890a",
			"status": "pending",
			"index": 0
		}
	],
	"status": "processing"
}
```

Приклад відповіді при запиті з `generationCount: 2`:

```json
{
	"message": "Запит на генерацію 2 відео з тексту прийнято",
	"generations": [
		{
			"generationId": "60f7b0b3e6b3a1234567890a",
			"status": "pending",
			"index": 0
		},
		{
			"generationId": "60f7b0b3e6b3a1234567891b",
			"status": "pending",
			"index": 1
		}
	],
	"status": "processing"
}
```

**Response (Error - 400):**

```json
{
	"error": "Невалідна модель",
	"message": "Невалідна модель"
}
```

### Image-to-Video Generation

**Endpoint:** `POST /generate/i2v`

**Опис:** Генерує відео на основі зображення та текстового опису.

**Важливо:** Більше ніж 1 пару промпт + зображення можна додати тільки для seedance моделей
(seedance-lite, seedance-v1-pro-480p, seedance-v1-pro-720p, seedance-v1-pro-1080p).

**Request Body:**

```json
{
	"pairs": [
		{
			"seedPrompt": "A beautiful sunset over the ocean", // Обов'язковий параметр, текстовий опис для генерації відео
			"imageUrl": "https://example.com/image.jpg" // Обов'язковий параметр, URL зображення для генерації відео
		}
	],
	"model": "seedance-lite", // Необов'язковий параметр, модель для генерації відео
	"duration": 5, // Необов'язковий параметр, тривалість відео в секундах
	"seed": 42, // Необов'язковий параметр, seed для відтворюваності результатів
	"negativePrompt": "bad quality, blurry", // Необов'язковий параметр, текст, який описує що НЕ повинно бути у відео (для моделей Kling)
	"guidanceScale": 0.7 // Необов'язковий параметр, сила впливу промпту від 0.0 до 1.0 (для моделей Kling)
}
```

**Доступні моделі:**

- seedance-lite (доступні тривалості: 5, 10 секунд)
- hailuo02-standard (доступні тривалості: 6, 10 секунд)
- hailuo02-pro (тривалість встановлюється автоматично)
- seedance-v1-pro-480p (доступні тривалості: 5, 10 секунд)
- seedance-v1-pro-720p (доступні тривалості: 5, 10 секунд)
- seedance-v1-pro-1080p (доступні тривалості: 5, 10 секунд)
- veo3 (тривалість встановлюється автоматично, 8 секунд)
- kling-v2.1-i2v-master (доступні тривалості: 5, 10 секунд)

**Response (Success - 200):**

```json
{
	"message": "Запит на генерацію 1 відео з зображень прийнято",
	"generations": [
		{
			"id": "60f7b0b3e6b3a1234567890a",
			"status": "pending",
			"pairIndex": 0,
			"seedPrompt": "A beautiful sunset over the ocean"
		}
	],
	"totalCount": 1
}
```

Приклад відповіді при запиті з кількома парами зображення-текст:

```json
{
	"message": "Запит на генерацію 2 відео з зображень прийнято",
	"generations": [
		{
			"id": "60f7b0b3e6b3a1234567890a",
			"status": "pending",
			"pairIndex": 0,
			"seedPrompt": "A beautiful sunset over the ocean"
		},
		{
			"id": "60f7b0b3e6b3a1234567891b",
			"status": "pending",
			"pairIndex": 1,
			"seedPrompt": "A mountain landscape with snow"
		}
	],
	"totalCount": 2
}
```

**Response (Error - 400):**

```json
{
	"error": "Потрібно вказати URL зображення",
	"message": "URL зображення повинен бути непорожнім рядком"
}
```

### Image-to-Image Generation

**Endpoint:** `POST /generate/i2i`

**Опис:** Генерує зображення на основі зображення та текстового опису.

**Request Body:**

```json
{
	"seedPrompt": "A beautiful sunset over the ocean", // Обов'язковий параметр, текстовий опис для генерації зображення
	"imageUrl": "https://example.com/image.jpg", // Обов'язковий параметр, URL вхідного зображення
	"model": "flux-pro-kontext-max",
	"guidanceScale": 3.5, // Необов'язковий параметр, сила впливу промпту (від 1 до 20)
	"numImages": 2, // Необов'язковий параметр, кількість зображень для генерації (за замовчуванням 1)
	"outputFormat": "png", // Необов'язковий параметр, формат вихідного зображення ("jpeg" або "png")
	"safetyTolerance": "3", // Необов'язковий параметр, рівень толерантності безпеки (від "1" до "6")
	"aspectRatio": "1:1", // Необов'язковий параметр, співвідношення сторін зображення ("21:9", "16:9", "4:3", "3:2", "1:1", "2:3", "3:4", "9:16", "9:21")
	"seed": 42 // Необов'язковий параметр, seed для відтворюваності результатів
}
```

**Доступні моделі:**

- flux-pro-kontext-max (модель від fal.ai для image-to-image генерації)

**Response (Success - 200):**

```json
{
	"message": "Запит на генерацію зображення прийнято",
	"flowId": "60f7b0b3e6b3a1234567890a",
	"generations": [
		{
			"id": "60f7b0b3e6b3a1234567890a",
			"status": "pending",
			"index": 0,
			"seedPrompt": "A beautiful sunset over the ocean"
		}
	],
	"totalCount": 1
}
```

**Response (Error - 400):**

```json
{
	"error": "Невалідний imageUrl",
	"message": "imageUrl повинен бути непорожнім рядком"
}
```

**Response (Error - 429):**

```json
{
	"success": false,
	"error": "У вас вже є активна генерація. Будь ласка, дочекайтесь її завершення перед створенням нової.",
	"lockInfo": {
		"telegramId": "123456789",
		"flowId": "60f7b0b3e6b3a1234567890a",
		"expiresAt": "2025-07-23T14:30:00.000Z"
	}
}
```

### Отримання інформації про генерацію

**Endpoint:** `GET /generate/:id`

**Опис:** Отримує інформацію про конкретну генерацію за її ID. Користувач може отримати інформацію
тільки про свої генерації.

**URL Parameters:**

- `id` - ID генерації (обов'язковий параметр)

**Response (Success - 200):**

```json
{
	"success": true,
	"generation": {
		"id": "60f7b0b3e6b3a1234567890a",
		"userId": "507f1f77bcf86cd799439011",
		"telegramId": "123456789",
		"status": "completed",
		"type": "t2v",
		"prompt": "A beautiful sunset over the ocean",
		"model": "veo3",
		"service": "fal",
		"seed": 42,
		"duration": 4,
		"jobId": "job_123456789",
		"resultUrl": "https://example.com/video.mp4",
		"downloadUrl": "videos/123456789/video_123456789.mp4",
		"createdAt": "2025-07-11T18:30:00.000Z",
		"updatedAt": "2025-07-11T18:35:00.000Z",
		"startTime": "2025-07-11T18:30:00.000Z",
		"endTime": "2025-07-11T18:35:00.000Z"
	}
}
```

**Response (Error - 404):**

```json
{
	"success": false,
	"message": "Генерацію не знайдено"
}
```

### Додаткові параметри для моделей Kling

Моделі Kling (kling-v2.1-t2v-master та kling-v2.1-i2v-master) підтримують додаткові параметри для
більш точного контролю над генерацією відео:

**Для Text-to-Video (T2V):**

- `negativePrompt` (string) - текст, який описує що НЕ повинно бути у відео
- `guidanceScale` (number) - сила впливу промпту, значення від 0.00 до 1.00 (більше значення =
  сильніший вплив промпту)
- `aspectRatio` (string) - співвідношення сторін відео, можливі значення: '16:9', '9:16', '1:1'

**Для Image-to-Video (I2V):**

- `negativePrompt` (string) - текст, який описує що НЕ повинно бути у відео
- `guidanceScale` (number) - сила впливу промпту, значення від 0.00 до 1.00 (більше значення =
  сильніший вплив промпту)

**Приклад запиту для T2V з Kling моделлю:**

```json
{
	"seedPrompt": "A beautiful sunset over the ocean with palm trees",
	"model": "kling-v2.1-t2v-master",
	"duration": 5,
	"negativePrompt": "bad quality, blurry, distorted faces",
	"guidanceScale": 0.7,
	"aspectRatio": "16:9"
}
```

**Приклад запиту для I2V з Kling моделлю:**

```json
{
	"pairs": [
		{
			"seedPrompt": "A beautiful sunset over the ocean with palm trees",
			"imageUrl": "http://example.com/sunset.jpg"
		}
	],
	"model": "kling-v2.1-i2v-master",
	"duration": 5,
	"negativePrompt": "bad quality, blurry, distorted faces",
	"guidanceScale": 0.7
}
```

## API для роботи з зображеннями

### Завантаження зображення

**Endpoint:** `POST /api/images/upload`

**Опис:** Завантажує зображення на сервер. Зображення зберігаються в папці користувача за його
telegramId.

**Request Format:** `multipart/form-data`

**Form Fields:**

- `image` - Файл зображення (обов'язковий параметр)

**Response (Success - 200):**

```json
{
	"success": true,
	"message": "Успішно завантажено зображення",
	"url": "http://example.com/images/123456789/image_123456789.jpg",
	"filename": "123456789/image_123456789.jpg"
}
```

**Response (Error - 400):**

```json
{
	"success": false,
	"message": "Файл не завантажений"
}
```

## API для генерації аудіо

### Text-to-Audio Generation

**Endpoint:** `POST /generate/t2a`

**Опис:** Генерує аудіо на основі текстового опису (промпту).

**Request Body:**

```json
{
	"seedPrompt": "Create a relaxing piano melody", // Обов'язковий параметр, текстовий опис для генерації аудіо
	"model": "V4", // Необов'язковий параметр, модель для генерації аудіо
	"customMode": true, // Необов'язковий параметр, вмикає розширені налаштування
	"style": "Classical", // Необов'язковий параметр, стиль аудіо (при customMode=true)
	"title": "Moonlight Sonata", // Необов'язковий параметр, назва твору (при customMode=true)
	"instrumental": true, // Необов'язковий параметр, тільки інструментальна музика без вокалу
	"negativeTags": ["rock", "heavy metal"] // Необов'язковий параметр, масив тегів, які не повинні бути в аудіо
}
```

**Response:**

```json
{
	"message": "Запит на генерацію аудіо з тексту прийнято",
	"flowId": "64a7b3c8d9e0f1g2h3i4j5k6",
	"generations": [
		{
			"generationId": "76a8b9c0d1e2f3g4h5i6j7k8",
			"status": "processing",
			"index": 0
		}
	],
	"status": "processing"
}
```

**Доступні моделі:**

- V3_5 (базова модель)
- V4 (покращена модель)
- V4_5 (найновіша модель)

**Особливості:**

- Кожен запит генерує кілька варіантів аудіо (1-2 варіанти)
- Доступ до згенерованих аудіо файлів здійснюється через URL виду
  `/audios/{telegramId}/{filename}.mp3`
- Генерація відбувається асинхронно з використанням колбеків

## API для роботи з користувачами

### Перевірка Telegram ID

**Endpoint:** `POST /api/users/verify`

**Опис:** Перевіряє, чи зареєстрований користувач з вказаним Telegram ID в системі.

**Request Body:**

```json
{
	"telegramId": "123456789" // Обов'язковий параметр, Telegram ID користувача
}
```

**Response (Success - 200, користувач зареєстрований):**

```json
{
	"success": true,
	"isRegistered": true,
	"isAdmin": false,
	"credits": 100
}
```

**Response (Success - 200, користувач не зареєстрований):**

```json
{
	"success": true,
	"isRegistered": false
}
```

**Response (Error - 400):**

```json
{
	"success": false,
	"message": "Необхідно вказати Telegram ID"
}
```

**Response (Error - 500):**

```json
{
	"success": false,
	"message": "Внутрішня помилка сервера"
}
```

**Особливості:**

- Публічний ендпоінт, не потребує авторизації
- Використовується для перевірки реєстрації користувача перед початком роботи з системою
