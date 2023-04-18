export type HfUser = {
	email: string
	pass: string
	DOB: string
	weight: string
	height: string
}

// 256 samples
export interface HfWindow {
	fid: string // frame id
	wid: string // sample id
	status: string // new, valid, invalid, predicted
	ppg_scaled: number[] //
	vpg_scaled: number[]
	apg_scaled: number[]
	ppg: number[] // 256 samples of ppg data from combined_frame_for_processing
	abp: number[] // bp prediction (raw model output)
	sbp: number, // systolic bp
	dbp: number, // diastolic bp
	f0: number // fundamental frequency of short window (not representative of hr)
	snr: number // estimated signal to noise ratio
	beat_sim: number // correlation between beats in window
	notches: boolean
	flat_lines: boolean
}

// 4100 samples
export interface HfFrame {
	fid?: string
	status: string // new, valid, invalid, predicted
	time: string
	target: string // collection to write to downstream (testing mode bpm-data-test)
	ir_frame?: number[] // raw data
	red_frame?: number[] // raw data
	ir_frame_for_presentation?: number[]
	red_frame_for_presentation?: number[]
	frame_for_prediction?: number[] // broken into windows for bp prediction
	pulse_rate?: number // from red_frame_for_processing
	spo2?: number
	r?: number // absorbance
}

export interface HfFrameHeader {
	sr: number
	ir_amplitude?: number
	red_amplitude?: number
}
