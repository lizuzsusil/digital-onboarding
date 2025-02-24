declare global {
    interface String {
        substituteParameter(parameters: Record<string, any>): string;
    }
}

String.prototype.substituteParameter = function(this: string, parameters: Record<string, any>): string {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let temp = this
    for (const [key, value] of Object.entries(parameters)) {
        temp = temp.replace(new RegExp(`{${key}}`, 'g'), value.toString())
    }
    return temp
}

export {}