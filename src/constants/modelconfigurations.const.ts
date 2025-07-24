import type { ModelConfigurationsItem } from 'types/ModelConfigurations.type'
import { v4 as uuidv4 } from 'uuid'

const quantityOptions = [
	{ id: uuidv4(), name: '1', value: 1 },
	{ id: uuidv4(), name: '2', value: 2 }
	// { id: 'q4', name: '4', value: 4 },
	// { id: 'q6', name: '6', value: 6 }
]

const quantityOptionsImg = [
	{ id: uuidv4(), name: '1', value: 1 },
	{ id: uuidv4(), name: '2', value: 2 },
	{ id: uuidv4(), name: '4', value: 4 }
	// { id: uuidv4(), name: '6', value: 6 }
]

export const ModelConfigurations: ModelConfigurationsItem[] = [
	{
		id: uuidv4(),
		type: 'audio_v3',
		type_generation: 'text-audio',
		title: 'Text To Audio',
		name: 'Suno',
		price: 60,
		type_icon: 'suno',
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
					{ id: uuidv4(), name: 'v3_5', value: 'v3_5' },
					{ id: uuidv4(), name: 'v4', value: 'v4' },
					{ id: uuidv4(), name: 'v4_5', value: 'v4_5' }
				]
			}
		}
	},
	{
		id: uuidv4(),
		type: 'flux-pro-kontext-max',
		type_generation: 'img-to-img',
		title: 'Img To Img',
		name: 'Flux Pro',
		price: 40,
		type_icon: 'flux',
		options: {
			quantity: {
				id: 'quantity',
				name: 'Quantity',
				icon: '/icons/quantity/1.svg',
				options: quantityOptionsImg
			},
			duration: null,
			quality: null,
			aspectRatio: {
				id: 'aspectRatio',
				name: 'Aspect Ratio',
				icon: '/icons/aspect-ratio/1-1.svg',
				options: [
					{ id: uuidv4(), name: '1:1', value: '1-1' },
					{ id: uuidv4(), name: '2:3', value: '2-3' },
					{ id: uuidv4(), name: '3:2', value: '3-2' },
					{ id: uuidv4(), name: '3:4', value: '3-4' },
					{ id: uuidv4(), name: '4:3', value: '4-3' },
					{ id: uuidv4(), name: '9:16', value: '9-16' },
					{ id: uuidv4(), name: '9:21', value: '9-21' },
					{ id: uuidv4(), name: '16:9', value: '16-9' },
					{ id: uuidv4(), name: '21:9', value: '21-9' }
				]
			}
		}
	},
	{
		id: uuidv4(),
		type: 'hailuo02-standard',
		type_generation: 'text-video',
		title: 'Video Generation',
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
					{ id: uuidv4(), name: '6 sec', value: 6 },
					{ id: uuidv4(), name: '10 sec', value: 10 }
				]
			},
			quality: null
		}
	},

	{
		id: uuidv4(),
		type: 'hailuo02-pro',
		title: 'Video Generation',
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
		id: uuidv4(),
		type: 'seedance-lite',
		type_generation: 'text-video',
		title: 'Video Generation',
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
					{ id: uuidv4(), name: '5 sec', value: 5 },
					{ id: uuidv4(), name: '10 sec', value: 10 }
				]
			},
			quality: null
		}
	},

	{
		id: uuidv4(),
		type: 'seedance-v1-pro',
		type_generation: 'text-video',
		title: 'Video Generation',
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
					{ id: uuidv4(), name: '5 sec', value: 5 },
					{ id: uuidv4(), name: '10 sec', value: 10 }
				]
			},
			quality: {
				id: 'quality',
				name: 'Quality',
				icon: '/icons/diamond.svg',
				options: [
					{ id: uuidv4(), name: '480p', value: '480' },
					{ id: uuidv4(), name: '720p', value: '720' },
					{ id: uuidv4(), name: '1080p', value: '1080' }
				]
			}
		}
	},

	{
		id: uuidv4(),
		type: 'veo3',
		type_generation: 'text-video',
		title: 'Video Generation',
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
					{ id: uuidv4(), name: '8 sec', value: 8 },
					{ id: uuidv4(), name: 'Auto', value: 'auto' }
				]
			},
			quality: null
		}
	},
	{
		id: uuidv4(),
		type: 'veo3_fast',
		type_generation: 'text-video',
		title: 'Video Generation',
		type_icon: 'Veo',
		name: 'Veo Fast',
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
					{ id: uuidv4(), name: '8 sec', value: 8 },
					{ id: uuidv4(), name: 'Auto', value: 'auto' }
				]
			},
			quality: null
		}
	},

	{
		id: uuidv4(),
		type: 'kling-v2.1-t2v-master',
		type_generation: 'text-video',
		title: 'Video Generation',
		type_icon: 'kling',
		name: 'Kling v2.1 Master',
		price: 60,
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
					{ id: uuidv4(), name: '5 sec', value: 5 },
					{ id: uuidv4(), name: '10 sec', value: 10 }
				]
			},
			quality: null
		}
	}
]
