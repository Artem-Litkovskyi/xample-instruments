export function centsToString(cents: number) {
    const dollars = Math.floor(cents/100);
    const remainingCents = Math.floor(cents%100);
    return `${dollars}.${('0' + String(remainingCents)).slice(-2)}`
}

export function secondsToString(seconds: number) {
    const minutes = Math.floor(seconds/60);
    const remainingSeconds = Math.floor(seconds%60);
    return `${minutes}:${('0' + String(remainingSeconds)).slice(-2)}`
}