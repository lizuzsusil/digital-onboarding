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

export const nepaliNumberToEnglish = (number?: string) => {
    if (!number) return ""

    const corresponding: Record<string, string> = {
        "०": "0",
        "१": "1",
        "२": "2",
        "३": "3",
        "४": "4",
        "५": "5",
        "६": "6",
        "७": "7",
        "८": "8",
        "९": "9",
    }

    let resp = ""
    for (let i = 0; i < number.length; i++) {
        const corr = corresponding[number[i]]
        if (corr !== undefined) {
            resp = resp + corr
        } else {
            resp = resp + number[i]
        }
    }
    return resp
}