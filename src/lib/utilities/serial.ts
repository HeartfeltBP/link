import { SerialPort } from 'serialport'
import { DelimiterParser } from 'serialport'

// sample format: ppg_ir, ppg_red, ecg,
// TODO: on arduino side -> serial communication to ask for certain number of samples, then sleep

function dataMan(value: string, arr: any[]) {
	console.log(value)
	arr.push(value)
}

export function getSerialData(port: any = '/dev/ttyACM0', baud: number = 115200) {
	let dataArr: any = []
	let sPort = new SerialPort({ path: port, baudRate: baud })
	const dParser = sPort.pipe(new DelimiterParser({ delimiter: ',' }))
	while (dataArr.length < 256) {
		dParser.on('data', (data: any) => {
			dataMan(data, dataArr)
		})
	}
	dParser.end()

	return dataArr
}
