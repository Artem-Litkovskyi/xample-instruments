export function centsToString(cents: number) {
    return `${Math.floor(cents/100)}.${("0" + String(cents%100)).slice(-2)}`
}