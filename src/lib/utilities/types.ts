export type HfUser = {
	email: string
	pass: string
	DOB: string
	weight: string
	height: string
}

// 256 samples
export interface hfWindow {
	fid: string 			// frame id
	sid: string 			// sample id
	status: string 			// new, valid, invalid, predicted
	ppg_scaled: number[] 	// 
	vpg_scaled: number[]
	apg_scaled: number[]
	abp_scaled: number[] 	// output of model
	ppg_raw: number[] 		// combined red and ir
	ppg: number[] 			// ppg after bandpass
	abp: number[] 			// rescaled bp prediction (actual wave)
	f0: number 				// fundamental frequency of short window (not representative of hr)
	snr: number
	beat_sim: number
}

// 4100 samples
export interface Frame {
	fid?: string
	status: string 			// new, valid, invalid, predicted
	target: string 			// collection to write to downstream (testing mode bpm-data-test)
	ir_frame?: number[] 	// raw data
	red_frame?: number[] 	// raw data
	ir_frame_for_presentation?: number[]
	red_frame_for_presentation?: number[]
	combined_frame_for_presentation?: number[]
	pulse_rate?: number
	spo2?: number
	r?: number // absorb
}

export interface FrameHeader {
	sr: number
	ir_amplitude?: number
	red_amplitude?: number
}
