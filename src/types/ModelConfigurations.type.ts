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
	id: string
	type: string
	type_generation?: string
	type_icon?: string
	title: string
	name: string
	price: number
	instrumental?: boolean
	custom_model?: boolean
	options?: {
		quantity: OptionGroup<number> | null
		duration: OptionGroup<number | string> | null
		quality: OptionGroup<string> | null
		model?: OptionGroup<string> | null
	}
}
