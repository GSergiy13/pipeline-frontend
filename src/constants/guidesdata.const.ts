export interface Guide {
	image: string
	title: string
	description: string
}

export const GUIDE_DATA: Guide[] = [
	{
		image: '/guides/1.jpg',
		title: 'Як створити довше відео',
		description:
			'Для більш тривалого відео використовуйте seed код попереднього. Seed код доступний при відкритті відео в режимі перегляду біля кнопки завантаження.'
	},
	{
		image: '/guides/2.jpg',
		title: 'Налаштування якості відео',
		description: 'Оберіть тривалість, кількість, роздільну здатність та seed перед генерацією.'
	}
]
