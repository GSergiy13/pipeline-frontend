export type OptionGroup = {
	id: string
	name: string
	options: readonly {
		id: string
		name: string
		value: string | number
	}[]
}

export const OPTION_SELECT = {
	quantity: {
		id: 'quantity',
		icon: '/icons/quantity/1.svg',
		name: 'Quantity',
		options: [
			{ id: 'q1', name: '1', value: 1 },
			{ id: 'q2', name: '2', value: 2 },
			{ id: 'q3', name: '3', value: 3 },
			{ id: 'q4', name: '4', value: 4 }
		]
	},
	duration: {
		id: 'duration',
		icon: '/icons/clock.svg',
		name: 'Duration',
		options: [
			{ id: 'd1', name: '5 sec', value: 5 },
			{ id: 'd2', name: '10 sec', value: 10 },
			{ id: 'd3', name: '20 sec', value: 20 },
			{ id: 'd4', name: '1 min', value: 60 }
		]
	},
	quality: {
		id: 'quality',
		icon: '/icons/diamond.svg',
		name: 'Quality',
		options: [
			{ id: 'k2', name: '480p', value: '480' },
			{ id: 'l3', name: '720p', value: '720' },
			{ id: 'l3', name: '1080p', value: '1080' },
			{ id: 'd2', name: '3K', value: '3000' }
		]
	}
} as const

export type OptionSelectType = typeof OPTION_SELECT
