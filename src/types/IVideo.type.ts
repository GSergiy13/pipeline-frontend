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
	_id?: string
	flowId: string
	userId: string
	telegramId: string
	status: 'pending' | 'completed' | 'failed'
	type: 't2v' | 'i2v' | 't2a' | 't2i' | 'i2i'
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

export interface GenerationDetailsImgToImg {
	id: string
	_id?: string
	userId: string
	telegramId: string
	flowId: string
	generationIndex: number
	status: 'completed' | 'pending' | 'failed' | string
	type: 'i2i'
	prompt: string
	model: string
	service: string
	numImages: number

	imageUrl: string
	imageResultUrls: string[]
	imageDownloadUrls: string[]

	audioResultUrls: string[]
	audioDownloadUrls: string[]

	resultUrl: string
	downloadUrl: string

	jobId: string

	startTime: string
	endTime: string
	createdAt: string
	updatedAt: string
}

export interface DetailsImgToImgResponse {
	success: true
	generation: GenerationDetailsImgToImg
}

export interface GetGenerationResponse {
	success: true
	generation: GenerationDetails
}

export interface GenerationAudioResponse {
	success: boolean
	generation: AudioGenerationDetails
}
export interface AudioDownloadItem {
	link: string
	image: string
	_id?: string
}

export interface AudioGenerationDetails {
	userId: string
	_id?: string
	telegramId: string
	flowId: string
	generationIndex: number
	status: 'completed' | 'pending' | 'failed' | string
	type: 't2v' | 'i2v' | 't2a' | 't2i'
	prompt: string
	model: string
	service: string
	title?: string
	audioDownloadUrls: AudioDownloadItem[]
	audioResultUrls: string[]
	startTime: string // ISO 8601 date
	createdAt: string
	updatedAt: string
	jobId: string
	downloadUrl: string
	endTime: string
	resultUrl: string
	id: string
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
export interface T2ARequest {
	seedPrompt?: string
	model?: string
	customMode?: boolean
	style?: string
	title?: string
	instrumental?: boolean
	negativeTags?: string[]
}

export interface I2IRequest {
	seedPrompt: string
	imageUrl: string
	model: string

	guidanceScale?: number
	numImages?: number
	outputFormat?: 'jpeg' | 'png'
	safetyTolerance?: string
	aspectRatio?: string
	seed?: number
}

export interface T2AResponse {
	generations: {
		generationId: string
		audioUrl: string
		duration: number
	}[]
}
