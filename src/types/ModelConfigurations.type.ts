type OptionItem<T = string | number> = {
	id: string
	name: string
	value: T
}

export type OptionGroup<T = string | number> = {
	id: string
	name: string
	icon?: string
	options: OptionItem<T>[]
}

export type ModelConfigurationsItem = {
	id: number
	type: string
	name: string
	price: number
	options: {
		quantity: OptionGroup<number> | null
		duration: OptionGroup<number | 'auto'>
		quality: OptionGroup<string> | null
	}
}
