const time: string[] = [
    "19:50:38",
    "20:10:40",
    "20:25:03"
]

const start = "19:30:14"

function getTimestamp(time: string): number {
    const [hour, minute, second] = time.split(":").map(Number)
    return hour * 3600 + minute * 60 + second
}

function formatTimestamp(timestamp: number): string {
    const hour = Math.floor(timestamp / 3600)
    const minute = Math.floor((timestamp % 3600) / 60)
    const second = timestamp % 60
    return `${hour}:${minute}:${second}`
}

const startTimestamp = getTimestamp(start)

const result = time.map(time => getTimestamp(time) - startTimestamp)

console.log(result.map(formatTimestamp))