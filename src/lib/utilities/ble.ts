const SERVICE_UUID = 'ec9cffe9-4e3f-4bc0-9428-2be09da4f4de'
const CHAR_UUID = 'e4c44ae2-05f9-4880-b61d-61f2a463721c'

export const onToken = (error: any, data: any) => {
	if(typeof(data != 'undefined')) {
		console.log(data)
	}
}

// need to enable web-bluetooth in experimental features in chrome, not available in firefox
export const bleInit = async () => {
    const available = await navigator.bluetooth.getAvailability()
    console.log(navigator)
    if(available) {
        const devices = await navigator.bluetooth
        console.log(devices)
        return devices
    }
}

