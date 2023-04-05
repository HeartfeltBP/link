// import * as ble from 'noble'

// const SERVICE_UUID = 'ec9cffe9-4e3f-4bc0-9428-2be09da4f4de'
// const CHAR_UUID = 'e4c44ae2-05f9-4880-b61d-61f2a463721c'

// export const onToken = (error: any, data: any) => {
// 	if(typeof(data != 'undefined')) {
// 		console.log(data)
// 	} 
// }

// export const onServicesAndCharDiscovered = (
// 	error: any,
// 	services: ble.Service[],
// 	characteristics: ble.Characteristic[]
// ) => {
// 	console.log('Available services/chars')

// 	const tokenChar = characteristics[0] // idk if correct index
// 	tokenChar.read(onToken)
// }

// export const connectAndSetUp = (peripheral: ble.Peripheral) => {
// 	peripheral.connect((error) => {
// 		console.log('Connected to:', peripheral.id)
// 	})

// 	const serviceUuids = [SERVICE_UUID]
// 	const charUuids = [CHAR_UUID]

// 	peripheral.discoverSomeServicesAndCharacteristics(
// 		serviceUuids,
// 		charUuids,
// 		onServicesAndCharDiscovered
// 	)
// }

// ble.on('stateChange', (state) => {
// 	if (state === 'poweredOn') {
// 		console.log('scanning...')
// 		ble.startScanning([SERVICE_UUID])
// 	} else {
// 		ble.stopScanning()
// 	}
// })

// ble.on('discover', (peripheral) => {
// 	// connect to the first peripheral that is scanned
// 	ble.stopScanning()
// 	const name = peripheral.advertisement.localName
// 	console.log(`Connecting to '${name}' ${peripheral.id}`)
// 	connectAndSetUp(peripheral)
// })
