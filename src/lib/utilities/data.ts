export function formatData(label: string, abp: number[]) {
	const data = {
		labels: Array.from(Array(abp.length).keys()),
		type: 'line',
		datasets: [
			{
				label: label,
				data: abp,
				fill: true,
				lineTension: 0.3,
				backgroundColor: 'rgba(255, 0, 0, 1)',
				borderColor: 'rgba(255, 0, 0, 1)',
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
		]
	}
	return data
}

export const txHandler = async (tx: string) => {
	
}
