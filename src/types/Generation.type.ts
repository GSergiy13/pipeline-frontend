export type ISODate = string
export type GenerationStatus = 'pending' | 'completed' | 'failed'
export type GenerationKind = 't2v' | 'i2v' | 't2a' | 't2i' | 'i2i'

export interface ApiResponse<T = unknown> {
	success: boolean
	message?: string
	data?: T
}

export interface BaseGeneration {
	id: string
	_id: string
	flowId: string
	userId: string
	telegramId: string
	type: GenerationKind
	status: GenerationStatus
	// errorMessage?: string
	prompt: string
	model: string
	service: string
	jobId: string
	createdAt: ISODate
	updatedAt: ISODate
	startTime?: ISODate
	endTime?: ISODate
}

export interface GenerationDetails extends BaseGeneration {
	seed: number
	duration: number
	resultUrl: string
	downloadUrl: string
}

export interface GenerationDetailsImgToImg extends BaseGeneration {
	type: 'i2i'
	numImages: number
	imageUrl: string
	imageResultUrls: string[]
	imageDownloadUrls: string[]
	audioResultUrls: string[]
	audioDownloadUrls: string[]
	resultUrl: string
	downloadUrl: string
}

export interface AudioGenerationDetails extends BaseGeneration {
	type: 't2a' | 't2v' | 'i2v'
	title?: string
	instrumental?: boolean
	audioResultUrls: string[]
	audioDownloadUrls: AudioDownloadItem[]
	downloadUrl: string
	resultUrl: string
}

export interface AudioDownloadItem {
	link: string
	image: string
	mongoId?: string
}

export interface BaseT2VRequest {
	model?: string
	duration?: number | 'auto'
	seed?: number
	quality?: string
}

export interface T2VTextRequest extends BaseT2VRequest {
	seedPrompt: string
	generationCount?: number
}

export interface T2VPairRequest extends BaseT2VRequest {
	pairs: { seedPrompt: string; imageUrl: string }[]
}

export type T2VRequest = T2VTextRequest | T2VPairRequest

export interface T2VGeneration {
	generationId: string
	id: string
	status: GenerationStatus
	index: number
}

export type T2VResponse = ApiResponse<{ generations: T2VGeneration[] }>

export interface I2VGeneration {
	id: string
	status: GenerationStatus
	pairIndex: number
	seedPrompt: string
}

export type I2VResponse = ApiResponse<{
	generations: I2VGeneration[]
	totalCount: number
}>

export type GetGenerationResponse = ApiResponse<GenerationDetails>
export type DetailsImgToImgResponse = ApiResponse<GenerationDetailsImgToImg>
export type GenerationAudioResponse = ApiResponse<AudioGenerationDetails>

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

export interface T2AResponseItem {
	generationId: string
	audioUrl: string
	duration: number
}

export type T2AResponse = ApiResponse<{ generations: T2AResponseItem[] }>

export interface ImageUploadSuccess
	extends ApiResponse<{
		url: string
		filename: string
	}> {
	success: true
}

export interface ImageUploadError extends ApiResponse {
	success: false
}
