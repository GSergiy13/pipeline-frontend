## API Документація

Проект надає наступні API ендпоінти для генерації відео:

### Загальні вимоги до всіх запитів

**Обов'язкові заголовки (Headers):**

```
X-Telegram-ID: 123456789  // Ідентифікатор користувача в Telegram
```

Всі запити повинні містити заголовок `X-Telegram-ID` з ідентифікатором користувача в Telegram. Цей
заголовок використовується для авторизації та відстеження генерацій користувача.

## API для генерації відео

### Text-to-Video Generation

**Endpoint:** `POST /generate/t2v`

**Опис:** Генерує відео на основі текстового опису.

**Request Body:**

```json
{
	"seedPrompt": "A beautiful sunset over the ocean", // Обов'язковий параметр, текстовий опис для генерації відео
	"model": "seedance-lite",
	"duration": 5,
	"seed": 42,
	"generationCount": 1
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
	"seed": 42 // Необов'язковий параметр, seed для відтворюваності результатів
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
