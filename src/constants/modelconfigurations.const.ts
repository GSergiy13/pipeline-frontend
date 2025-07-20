import type { ModelConfigurationsItem } from 'types/ModelConfigurations.type'

const quantityOptions = [
	{ id: 'q1', name: '1', value: 1 },
	{ id: 'q2', name: '2', value: 2 },
	{ id: 'q4', name: '4', value: 4 },
	{ id: 'q6', name: '6', value: 6 }
]

export const ModelConfigurations: ModelConfigurationsItem[] = [
	{
		id: 1,
		type: 'Hailuo02',
		name: 'Hailuo02 Standard',
		price: 0,
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
					{ id: 'd2', name: '10 sec', value: 10 },
					{ id: 'd3', name: '20 sec', value: 20 },
					{ id: 'd4', name: 'Auto', value: 'auto' }
				]
			},
			quality: null
		}
	},

	{
		id: 2,
		type: 'Hailuo02',
		name: 'Hailuo02 Pro',
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
					{ id: 'd1', name: '5 sec', value: 5 },
					{ id: 'd2', name: '10 sec', value: 10 },
					{ id: 'd4', name: 'Auto', value: 'auto' },
					{ id: 'd5', name: '30 sec', value: 30 }
				]
			},
			quality: {
				id: 'quality',
				name: 'Quality',
				icon: '/icons/diamond.svg',
				options: [
					{ id: 'q480', name: '480p', value: '480' },
					{ id: 'q720', name: '720p', value: '720' },
					{ id: 'q1080', name: '1080p', value: '1080' },
					{ id: 'q4k', name: '4K', value: '4K' }
				]
			}
		}
	},

	{
		id: 3,
		type: 'Seedance',
		name: 'Seedance',
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
					{ id: 'd2', name: '10 sec', value: 10 },
					{ id: 'd3', name: '20 sec', value: 20 },
					{ id: 'd4', name: 'Auto', value: 'auto' },
					{ id: 'd5', name: '1 min', value: 60 }
				]
			},
			quality: {
				id: 'quality',
				name: 'Quality',
				icon: '/icons/diamond.svg',
				options: [
					{ id: 'q720', name: '720p', value: '720' },
					{ id: 'q1080', name: '1080p', value: '1080' },
					{ id: 'q2k', name: '2K', value: '2K' },
					{ id: 'q3k', name: '3K', value: '3000' }
				]
			}
		}
	},

	{
		id: 4,
		type: 'Seedance',
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
					{ id: 'd1', name: '10 sec', value: 10 },
					{ id: 'd2', name: '15 sec', value: 15 },
					{ id: 'd3', name: '30 sec', value: 30 },
					{ id: 'd4', name: 'Auto', value: 'auto' }
				]
			},
			quality: {
				id: 'quality',
				name: 'Quality',
				icon: '/icons/diamond.svg',
				options: [
					{ id: 'q480', name: '480p', value: '480' },
					{ id: 'q576', name: '576p', value: '576' },
					{ id: 'q720', name: '720p', value: '720' },
					{ id: 'q1080', name: '1080p', value: '1080' }
				]
			}
		}
	},

	// {
	// 	id: 5,
	// 	type: 'Seedance',
	// 	name: 'Seedance V1 Pro 720p',
	// 	price: 80,
	// 	options: {
	// 		quantity: {
	// 			id: 'quantity',
	// 			name: 'Quantity',
	// 			icon: '/icons/quantity/1.svg',
	// 			options: quantityOptions
	// 		},
	// 		duration: {
	// 			id: 'duration',
	// 			name: 'Duration',
	// 			icon: '/icons/clock.svg',
	// 			options: [
	// 				{ id: 'd1', name: '20 sec', value: 20 },
	// 				{ id: 'd2', name: '30 sec', value: 30 },
	// 				{ id: 'd3', name: '45 sec', value: 45 },
	// 				{ id: 'd4', name: 'Auto', value: 'auto' }
	// 			]
	// 		},
	// 		quality: {
	// 			id: 'quality',
	// 			name: 'Quality',
	// 			icon: '/icons/diamond.svg',
	// 			options: [
	// 				{ id: 'q720', name: '720p', value: '720' },
	// 				{ id: 'q900', name: '900p', value: '900' },
	// 				{ id: 'q1080', name: '1080p', value: '1080' },
	// 				{ id: 'q2k', name: '2K', value: '2K' }
	// 			]
	// 		}
	// 	}
	// },

	// {
	// 	id: 6,
	// 	type: 'Seedance',
	// 	name: 'Seedance V1 Pro 1080p',
	// 	price: 120,
	// 	options: {
	// 		quantity: {
	// 			id: 'quantity',
	// 			name: 'Quantity',
	// 			icon: '/icons/quantity/1.svg',
	// 			options: quantityOptions
	// 		},
	// 		duration: {
	// 			id: 'duration',
	// 			name: 'Duration',
	// 			icon: '/icons/clock.svg',
	// 			options: [
	// 				{ id: 'd1', name: '60 sec', value: 60 },
	// 				{ id: 'd2', name: '90 sec', value: 90 },
	// 				{ id: 'd3', name: '120 sec', value: 120 },
	// 				{ id: 'd4', name: 'Auto', value: 'auto' }
	// 			]
	// 		},
	// 		quality: {
	// 			id: 'quality',
	// 			name: 'Quality',
	// 			icon: '/icons/diamond.svg',
	// 			options: [
	// 				{ id: 'q1080', name: '1080p', value: '1080' },
	// 				{ id: 'q1440', name: '1440p', value: '1440' },
	// 				{ id: 'q2k', name: '2K', value: '2K' },
	// 				{ id: 'q3k', name: '3K', value: '3000' },
	// 				{ id: 'q4k', name: '4K', value: '4K' }
	// 			]
	// 		}
	// 	}
	// },

	{
		id: 7,
		type: 'Veo',
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
					{ id: 'd1', name: '10 sec', value: 10 },
					{ id: 'd2', name: '15 sec', value: 15 },
					{ id: 'd3', name: '20 sec', value: 20 },
					{ id: 'd4', name: 'Auto', value: 'auto' }
				]
			},
			quality: {
				id: 'quality',
				name: 'Quality',
				icon: '/icons/diamond.svg',
				options: [
					{ id: 'q720', name: '720p', value: '720' },
					{ id: 'q1080', name: '1080p', value: '1080' },
					{ id: 'q2k', name: '2K', value: '2K' },
					{ id: 'q4k', name: '4K', value: '4K' }
				]
			}
		}
	},

	{
		id: 8,
		type: 'Veo',
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
					{ id: 'd1', name: '5 sec', value: 5 },
					{ id: 'd2', name: '10 sec', value: 10 },
					{ id: 'd3', name: '20 sec', value: 20 },
					{ id: 'd4', name: 'Auto', value: 'auto' }
				]
			},
			quality: {
				id: 'quality',
				name: 'Quality',
				icon: '/icons/diamond.svg',
				options: [
					{ id: 'q480', name: '480p', value: '480' },
					{ id: 'q1080', name: '1080p', value: '1080' },
					{ id: 'q2k', name: '2K', value: '2K' },
					{ id: 'q3k', name: '3K', value: '3000' }
				]
			}
		}
	}

	// {
	// 	id: 9,
	// 	type: 'Veo',
	// 	name: 'Veo3 Fastk',
	// 	price: 40,
	// 	options: {
	// 		quantity: {
	// 			id: 'quantity',
	// 			name: 'Quantity',
	// 			icon: '/icons/quantity/1.svg',
	// 			options: quantityOptions
	// 		},
	// 		duration: {
	// 			id: 'duration',
	// 			name: 'Duration',
	// 			icon: '/icons/clock.svg',
	// 			options: [
	// 				{ id: 'd1', name: '6 sec', value: 6 },
	// 				{ id: 'd2', name: '12 sec', value: 12 },
	// 				{ id: 'd3', name: '18 sec', value: 18 },
	// 				{ id: 'd4', name: 'Auto', value: 'auto' }
	// 			]
	// 		},
	// 		quality: {
	// 			id: 'quality',
	// 			name: 'Quality',
	// 			icon: '/icons/diamond.svg',
	// 			options: [
	// 				{ id: 'q720', name: '720p', value: '720' },
	// 				{ id: 'q1080', name: '1080p', value: '1080' },
	// 				{ id: 'q1440', name: '1440p', value: '1440' },
	// 				{ id: 'q2k', name: '2K', value: '2K' }
	// 			]
	// 		}
	// 	}
	// },

	// {
	// 	id: 10,
	// 	type: 'Veo',
	// 	name: 'Veo3k',
	// 	price: 40,
	// 	options: {
	// 		quantity: {
	// 			id: 'quantity',
	// 			name: 'Quantity',
	// 			icon: '/icons/quantity/1.svg',
	// 			options: quantityOptions
	// 		},
	// 		duration: {
	// 			id: 'duration',
	// 			name: 'Duration',
	// 			icon: '/icons/clock.svg',
	// 			options: [
	// 				{ id: 'd1', name: '20 sec', value: 20 },
	// 				{ id: 'd2', name: '30 sec', value: 30 },
	// 				{ id: 'd3', name: '45 sec', value: 45 },
	// 				{ id: 'd4', name: 'Auto', value: 'auto' }
	// 			]
	// 		},
	// 		quality: {
	// 			id: 'quality',
	// 			name: 'Quality',
	// 			icon: '/icons/diamond.svg',
	// 			options: [
	// 				{ id: 'q3k', name: '3K', value: '3000' },
	// 				{ id: 'q4k', name: '4K', value: '4K' },
	// 				{ id: 'q5k', name: '5K', value: '5000' },
	// 				{ id: 'q6k', name: '6K', value: '6000' }
	// 			]
	// 		}
	// 	}
	// }
]
