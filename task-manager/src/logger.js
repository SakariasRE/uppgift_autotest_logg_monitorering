function getTime() {
    return new Date().toLocaleTimeString('sv-SE')
}

export function logInfo(message) {
    console.log(`[INFO] ${getTime()} - ${message}`)
}

export function logError(message) {
    console.error(`[ERROR] ${getTime()} - ${message}`)
}
