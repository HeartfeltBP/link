import noble from '@abandonware/noble'

const SERVICE_UUID = 'ec9cffe9-4e3f-4bc0-9428-2be09da4f4de'
const CHAR_UUID = 'e4c44ae2-05f9-4880-b61d-61f2a463721c'

export const onToken = (error: any, data: any) => {
	if(typeof(data != 'undefined')) {
		console.log(data)
	}
}

export const onServicesAndCharDiscovered = (
	error: any,
	services: noble.Service[],
	characteristics: noble.Characteristic[]
) => {
	console.log('Available services/chars')

	const tokenChar = characteristics[0] // idk if correct index
	tokenChar.read(onToken)
}

export const connectAndSetUp = (peripheral: noble.Peripheral) => {
	peripheral.connect((error: any) => {
		console.log('Connected to:', peripheral.id)
	})

	const serviceUuids = [SERVICE_UUID]
	const charUuids = [CHAR_UUID]

	peripheral.discoverSomeServicesAndCharacteristics(
		serviceUuids,
		charUuids,
		onServicesAndCharDiscovered
	)
}

export const bleInit = () => {
    noble.on('stateChange', (state: string) => {
        if (state === 'poweredOn') {
            console.log('scanning...')
            noble.startScanning([SERVICE_UUID])
        } else {
            noble.stopScanning()
        }
    })
    
    noble.on('discover', (peripheral: noble.Peripheral) => {
        // connect to the first peripheral that is scanned
        noble.stopScanning()
        const name = peripheral.advertisement.localName
        console.log(`Connecting to '${name}' ${peripheral.id}`)
        connectAndSetUp(peripheral)
    })
}

