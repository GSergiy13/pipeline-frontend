import type { ModelConfigurationsItem } from 'types/ModelConfigurations.type'

const quantityOptions = [
	{ id: 'q1', name: '1', value: 1 },
	{ id: 'q2', name: '2', value: 2 }
	// { id: 'q4', name: '4', value: 4 },
	// { id: 'q6', name: '6', value: 6 }
]

export const ModelConfigurations: ModelConfigurationsItem[] = [
	{
		id: 1,
		type: 'hailuo02-standard',
		type_generation: 'text-video',
		type_icon: 'Hailuo02',
		name: 'Hailuo02 Standard',
		price: 20,
		options: {
			quantity: {
				id: 'quantity',
				name: 'Quantity',
				icon: '/icons/quantity/1.svg',
				options: quantityOptions
			},
			duration: {
				id: 'duration',
				name: 'Duration',
				icon: '/icons/clock.svg',
				options: [
					{ id: 'd1', name: '6 sec', value: 6 },
					{ id: 'd2', name: '10 sec', value: 10 }
				]
			},
			quality: null
		}
	},

	{
		id: 2,
		type: 'hailuo02-pro',
		type_generation: 'text-video',
		type_icon: 'Hailuo02',
		name: 'Hailuo02 Pro',
		price: 20,
		options: {
			quantity: {
				id: 'quantity',
				name: 'Quantity',
				icon: '/icons/quantity/1.svg',
				options: quantityOptions
			},
			duration: null,
			quality: null
		}
	},

	{
		id: 3,
		type: 'seedance-lite',
		type_generation: 'text-video',
		type_icon: 'Seedance',
		name: 'Seedance Lite',
		price: 20,
		options: {
			quantity: {
				id: 'quantity',
				name: 'Quantity',
				icon: '/icons/quantity/1.svg',
				options: quantityOptions
			},
			duration: {
				id: 'duration',
				name: 'Duration',
				icon: '/icons/clock.svg',
				options: [
					{ id: 'd2', name: '5 sec', value: 5 },
					{ id: 'd3', name: '10 sec', value: 10 }
				]
			},
			quality: null
		}
	},

	{
		id: 4,
		type: 'seedance-v1-pro',
		type_generation: 'text-video',
		type_icon: 'Seedance',
		name: 'Seedance V1 Pro',
		price: 40,
		options: {
			quantity: {
				id: 'quantity',
				name: 'Quantity',
				icon: '/icons/quantity/1.svg',
				options: quantityOptions
			},
			duration: {
				id: 'duration',
				name: 'Duration',
				icon: '/icons/clock.svg',
				options: [
					{ id: 'd1', name: '5 sec', value: 5 },
					{ id: 'd2', name: '10 sec', value: 10 }
				]
			},
			quality: {
				id: 'quality',
				name: 'Quality',
				icon: '/icons/diamond.svg',
				options: [
					{ id: 'q480', name: '480p', value: '480' },
					{ id: 'q1080', name: '720p', value: '720' },
					{ id: 'q3k', name: '1080p', value: '1080' }
				]
			}
		}
	},

	{
		id: 7,
		type: 'veo3',
		type_generation: 'text-video',
		type_icon: 'Veo',
		name: 'Veo 2',
		price: 40,
		options: {
			quantity: {
				id: 'quantity',
				name: 'Quantity',
				icon: '/icons/quantity/1.svg',
				options: quantityOptions
			},
			duration: {
				id: 'duration',
				name: 'Duration',
				icon: '/icons/clock.svg',
				options: [
					{ id: 'd1', name: '8 sec', value: 8 },
					{ id: 'd4', name: 'Auto', value: 'auto' }
				]
			},
			quality: null
		}
	},
	{
		id: 8,
		type: 'veo3_fast',
		type_generation: 'text-video',
		type_icon: 'Veo',
		name: 'Veo 3',
		price: 40,
		options: {
			quantity: {
				id: 'quantity',
				name: 'Quantity',
				icon: '/icons/quantity/1.svg',
				options: quantityOptions
			},
			duration: {
				id: 'duration',
				name: 'Duration',
				icon: '/icons/clock.svg',
				options: [
					{ id: 'd1', name: '8 sec', value: 8 },
					{ id: 'd4', name: 'Auto', value: 'auto' }
				]
			},
			quality: null
		}
	},
	{
		id: 9,
		type: 'audio_v3',
		type_generation: 'text-audio',
		name: 'V3',
		price: 60,
		instrumental: false,
		custom_model: false,
		options: {
			quantity: null,
			duration: null,
			quality: null,
			model: {
				id: 'model',
				name: 'Model',
				options: [
					{ id: 'm1', name: 'V3_5', value: 'v3_5' },
					{ id: 'm2', name: 'V4', value: 'v4' },
					{ id: 'm3', name: 'v4_5', value: 'v4_5' }
				]
			}
		}
	}
]
