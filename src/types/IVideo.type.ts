export type DurationType = number | 'auto'
export type QuantityType = number
export type QualityType = string

export interface T2VGeneration {
	generationId: string
	id: string
	status: 'pending' | 'completed' | 'failed'
	index: number
}

export interface T2VResponse {
	message: string
	generations: T2VGeneration[]
	status: 'processing'
}

export interface I2VGeneration {
	id: string
	status: 'pending' | 'completed' | 'failed'
	pairIndex: number
	seedPrompt: string
}

export interface I2VResponse {
	message: string
	generations: I2VGeneration[]
	totalCount: number
}

export interface GenerationDetails {
	id: string
	userId: string
	telegramId: string
	status: 'pending' | 'completed' | 'failed'
	type: 't2v' | 'i2v'
	prompt: string
	model: string
	service: string
	seed: number
	duration: number
	jobId: string
	resultUrl: string
	downloadUrl: string
	createdAt: string
	updatedAt: string
	startTime: string
	endTime: string
}

export interface GetGenerationResponse {
	success: true
	generation: GenerationDetails
}

export interface GetGenerationError {
	success: false
	message: string
}

export interface ErrorResponse {
	error: string
	message: string
}

export type T2VRequest =
	| {
			seedPrompt: string
			model?: string
			duration?: DurationType
			seed?: number
			generationCount?: QuantityType
			quality?: QualityType
	  }
	| {
			pairs: Array<{
				seedPrompt: string
				imageUrl: string
			}>
			model?: string
			duration?: DurationType
			seed?: number
			quality?: QualityType
	  }

export interface ImageUploadResponse {
	success: true
	message: string
	url: string
	filename: string
}

export interface ImageUploadError {
	success: false
	message: string
}
