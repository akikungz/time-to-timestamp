export const getSeconds = (time: string) => {
    const splitTime = time.split(":").map(Number)
    if (splitTime.length !== 3) {
        return undefined;
    }

    const [hour, minute, second] = splitTime;

    if (hour < 0 || hour > 23 || minute < 0 || minute > 59 || second < 0 || second > 59) {
        return undefined;
    }

    return (hour * 3600) + (minute * 60) + second;
}

export const formatSeconds = (seconds: number) => {
    if (seconds < 0) {
        return undefined;
    }

    const hour = Math.floor(seconds / 3600);
    const minute = Math.floor((seconds % 3600) / 60);
    const second = seconds % 60;

    return `${hour}:${minute < 10 ? `0${minute}` : minute}:${second < 10 ? `0${second}` : second}`;
}