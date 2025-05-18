export function centsToString(cents: number) {
    return `${Math.floor(cents/100)}.${("0" + String(cents%100)).slice(-2)}`
}

export function secondsToString(seconds: number) {
    return `${Math.floor(seconds/60)}:${("0" + String(seconds%60)).slice(-2)}`
}