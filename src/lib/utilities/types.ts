export interface User {
	DOB: string
	Height: string
	Name: string
	Weight: string
}

export interface Sample {
	fid: string // frame id
	sid: string // sample id
	status: string // new, valid, invalid, predicted
	ppg_scaled: number[]
	vpg_scaled: number[]
	apg_scaled: number[]
	abp_scaled: number[]
	ppg_raw: number[]
	ppg: number[]
	abp: number[] // rescaled bp prediction
	hr: number
	snr: number
	beat_sim: number
}

export interface Frame {
	fid: string
	status: string
	target: string
	frame: number[]
}
