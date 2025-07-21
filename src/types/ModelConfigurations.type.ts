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
	type_icon?: string
	name: string
	price: number
	options: {
		quantity: OptionGroup<number> | null
		duration: OptionGroup<number | string> | null
		quality: OptionGroup<string> | null
	}
}
