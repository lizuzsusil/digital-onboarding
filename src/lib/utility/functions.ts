const oldConsoleLog = console.log
const oldConsoleWarn = console.warn
const oldConsoleDebug = console.debug
const oldConsoleInfo = console.info

export function log(message?: never, ...optionalParams: never[]) {
    if (process.env.DEV && message) {
        oldConsoleLog.call(console, message, ...optionalParams)
    }
}

export function warn(message?: never, ...optionalParams: never[]) {
    if (process.env.DEV && message) {
        oldConsoleWarn.call(console, message, ...optionalParams)
    }
}

export function debug(message?: never, ...optionalParams: never[]) {
    if (process.env.DEV && message) {
        oldConsoleDebug.call(console, message, ...optionalParams)
    }
}

export function info(message?: never, ...optionalParams: never[]) {
    if (process.env.DEV && message) {
        oldConsoleInfo.call(console, message, ...optionalParams)
    }
}