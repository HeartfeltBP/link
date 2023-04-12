export const SERVICE_UUID = 'ec9cffe9-4e3f-4bc0-9428-2be09da4f4de'
export const CHAR_UUID = 'e4c44ae2-05f9-4880-b61d-61f2a463721c'

export const onToken = (error: any, data: any) => {
	if (typeof (data) != 'undefined') {
		console.log(data)
	}
}

export const bleGetServer = async (): Promise<BluetoothRemoteGATTServer | null> => {
	const options: RequestDeviceOptions = {
		acceptAllDevices: true,
		optionalServices: [SERVICE_UUID]
	}
	const device: BluetoothDevice = await navigator.bluetooth.requestDevice(options)
	console.log(device)
	if (!device.gatt) {
		return null
	}
	return device.gatt.connect()
}

export const bleGetService = async (
	server: BluetoothRemoteGATTServer
): Promise<BluetoothRemoteGATTService> => {
	const service: BluetoothRemoteGATTService = await server.getPrimaryService(SERVICE_UUID)
	console.log(service)
	return service
}

export const bleGetChar = async (
	service: BluetoothRemoteGATTService
): Promise<BluetoothRemoteGATTCharacteristic> => {
	const char: BluetoothRemoteGATTCharacteristic = await service.getCharacteristic(CHAR_UUID)
	console.log(char)
	return char
}

export const bleGetCharServer = async (
	server: BluetoothRemoteGATTServer
): Promise<BluetoothRemoteGATTCharacteristic | null> => {
	const char: BluetoothRemoteGATTCharacteristic | null = await server
		.getPrimaryService(SERVICE_UUID)
		.then(async (service: BluetoothRemoteGATTService) => {
			return (await service.getCharacteristic(CHAR_UUID)) ?? null
		})
	console.log(char)
	return char
}

export const isBleAvailable = async (): Promise<boolean> => {
	try {
		const available = await navigator.bluetooth.getAvailability()
		if (available) {
			console.log('Bluetooth Detected ✅')
			return true
		}
		console.log('Bluetooth NOT available')
	} catch (e) {
		console.error('Bluetooth NOT available')
		console.error(e)
	}
	return false
}

// need to enable web-bluetooth in experimental features in chrome, not available in firefox
export const bleInit = async () => {
	const available = await isBleAvailable()
	if (available) {
		const server: BluetoothRemoteGATTServer | null = await bleGetServer()
		if (!server) {
			return null
		}
		const char: BluetoothRemoteGATTCharacteristic | null = await bleGetCharServer(server)
		if (!char) {
			return null
		}
		console.log("looks like we're initialized")
		return char
	}
	return null
}
