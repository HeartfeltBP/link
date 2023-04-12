export type HfDataset = {
	label: string
	data: number[]
	fill: boolean
	lineTension: number
	backgroundColor: string
	borderColor: string
	borderCapStyle: CanvasLineCap
	borderDash: number[]
	borderDashOffset: number
	borderJoinStyle: CanvasLineJoin
	pointHoverBackgroundColor: string
	pointHoverBorderColor: string
	pointHoverBorderWidth: number
	pointRadius: number
	pointHitRadius: number
}

const calculateAverage = (array: number[]): number => {
	const sum = array.reduce((a: number, b: number): number => a + b)
	return sum / array.length
}

export function formatData(
	scale: boolean,
	label: string,
	sig: number[],
	label2?: string,
	sig2?: number[]
) {
	let dataset0: HfDataset = {
		label: label,
		data: sig,
		fill: true,
		lineTension: 0.3,
		backgroundColor: '#7e2835',
		borderColor: '#7e2835',
		borderCapStyle: 'butt' as CanvasLineCap,
		borderDash: [],
		borderDashOffset: 0.0,
		borderJoinStyle: 'miter' as CanvasLineJoin,
		pointHoverBackgroundColor: 'rgb(0, 0, 0)',
		pointHoverBorderColor: 'rgba(220, 220, 220,1)',
		pointHoverBorderWidth: 2,
		pointRadius: 1,
		pointHitRadius: 10
	}
	let datasets = [dataset0]

	if (typeof sig2 != 'undefined' && typeof label2 != 'undefined') {
		let dataset1: HfDataset = {
			label: label2,
			data: sig2,
			fill: true,
			lineTension: 0.3,
			backgroundColor: '#115363',
			borderColor: '#115363',
			borderCapStyle: 'butt' as CanvasLineCap,
			borderDash: [],
			borderDashOffset: 0.0,
			borderJoinStyle: 'miter' as CanvasLineJoin,
			pointHoverBackgroundColor: 'rgb(0, 0, 0)',
			pointHoverBorderColor: 'rgba(220, 220, 220,1)',
			pointHoverBorderWidth: 2,
			pointRadius: 1,
			pointHitRadius: 10
		}
		datasets = [dataset0, dataset1]
	}

	const data = {
		labels: Array.from(Array(sig.length).keys()),
		type: 'line',
		datasets: datasets
	}
	return data
}

// // TODO:
// export const txHandler = async (tx: string) => {}
