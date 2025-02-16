import { TimestampInput } from "@/types";
import { formatSeconds, getSeconds } from "@/utils";

export const exportHandler = (
    inputTemp: TimestampInput[],
    optStartTime: number | undefined,
) => {
    if (optStartTime === undefined) return;
    // Clipboard API
    const text = inputTemp
        .map((timestamp) => ({ time: getSeconds(timestamp.time), title: timestamp.title }))
        .filter((timestamp) => timestamp.title.length != 0)
        .map((timestamp) => {
            if (timestamp.time === undefined) return "";
            return `${formatSeconds(timestamp.time - optStartTime)} - ${timestamp.title}`;
        })
        .join("\n");

    navigator.clipboard.writeText(text);
    
    return text;
}

export const loadHandler = (
    setInputTemp: (inputTemp: TimestampInput[]) => void,
    setInputCount: (inputCount: number) => void,
    setStartTime: (startTime: string) => void,
) => {
    const data = localStorage.getItem("timestamp");
    if (data === null) return;
    const parsedData: TimestampInput[] = JSON.parse(data);
    setInputTemp(parsedData);
    setInputCount(parsedData.length);

    const startTime: string | null = localStorage.getItem("startTime");
    if (startTime === null) return;
    setStartTime(startTime);
}

export const saveHandler = (
    inputTemp: TimestampInput[],
    startTime: string,
) => {
    localStorage.setItem("timestamp", JSON.stringify(inputTemp));
    localStorage.setItem("startTime", startTime);
}

export const clearHandler = (
    setInputCount: (inputCount: number) => void,
    setInputTemp: (inputTemp: TimestampInput[]) => void,
    setStartTime: (startTime: string) => void,
) => {
    setInputCount(0);
    setInputTemp([]);
    setStartTime("");
}

export const addHandler = (
    setInputCount: (callback: (prev: number) => number) => void,
    setInputTemp: (callback: (prev: TimestampInput[]) => TimestampInput[]) => void,
) => {
    setInputCount((prev: number) => prev + 1);
    setInputTemp((prev) => [...prev, { time: "", title: "" }]);
}