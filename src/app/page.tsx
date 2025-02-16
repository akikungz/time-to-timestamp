"use client";
import { getSeconds, formatSeconds } from "@/utils";
import { useState } from "react";

interface TimestampInput {
  time: string;
  title: string;
}

export default function Home() {
  const [inputCount, setInputCount] = useState(0);
  const [inputTemp, setInputTemp] = useState<TimestampInput[]>([]);

  const [startTime, setStartTime] = useState("");
  const optStartTime = getSeconds(startTime);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="gap-2 flex flex-col justify-center items-center p-4 max-w-lg w-full">
        <h1 className="text-xl">Timestamp from video time</h1>
        <div className="flex flex-col gap-2 justify-center items-start w-full">
          <span>Start time</span>
          <div className="flex flex-row justify-center items-center gap-2 w-full">
            <input 
              type="text" 
              className="border border-gray-300 p-2 rounded text-black w-full"
              placeholder="hh:mm:ss"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
            <span>
              { optStartTime !== undefined ? "✅" : "❌" }
            </span>
          </div>
        </div>
        <span className="w-full text-start -mb-2 mt-1">Timestamp list</span>
        {[...Array(inputCount)].map((_, index) => (
          <InputTimestamp
            key={index}
            timestampInput={inputTemp[index]}
            setTimestampInput={(timestampInput: TimestampInput) => {
              setInputTemp((prev) => {
                const next = [...prev];
                next[index] = timestampInput;
                return next;
              });
            }}
          />
        ))}
        <div className="flex flex-row justify-center items-center gap-2 w-full">
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            onClick={
              () => {
                setInputCount(inputCount + 1)
                setInputTemp([...inputTemp, { time: "", title: "" }])
              }
            }
          >
            Add Item
          </button>
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setInputCount(0);
              setInputTemp([]);
              setStartTime("");
            }}
          >
            Clear
          </button>
        </div>
        <div className="flex flex-row justify-center items-center gap-2 w-full">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            onClick={() => {
              localStorage.setItem("timestamp", JSON.stringify(inputTemp));
              localStorage.setItem("startTime", startTime);
            }}
          >
            Save
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            onClick={() => {
              const data = localStorage.getItem("timestamp");
              if (data === null) return;
              const parsedData: TimestampInput[] = JSON.parse(data);
              setInputTemp(parsedData);
              setInputCount(parsedData.length);

              const startTime: string | null = localStorage.getItem("startTime");
              if (startTime === null) return;
              setStartTime(startTime);
            }}
          >
            Load
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            onClick={() => {
              if (optStartTime === undefined) return;
              // Clipboard API
              const text = inputTemp
                .map((timestamp) => ({ time: getSeconds(timestamp.time), title: timestamp.title }))
                .map((timestamp) => {
                  if (timestamp.time === undefined) return "";
                  return `${formatSeconds(timestamp.time - optStartTime)} - ${timestamp.title}`;
                })
                .join("\n");

              navigator.clipboard.writeText(text)
                .then(() => {
                  alert(text);
                })
                .catch(() => {
                  alert("Failed to copy");
                });
            }}
          >
            Export
          </button>
        </div>
      </div>
    </div>
  );
}

function InputTimestamp(
  { timestampInput, setTimestampInput }: {
    timestampInput: TimestampInput; 
    setTimestampInput: (timestampInput: TimestampInput) => void;
  }
) {
  return (
    <div className="flex flex-row justify-center items-center gap-2 py-1 w-full">
      <input 
        type="text" 
        className="border border-gray-300 p-2 rounded text-black w-1/3"
        placeholder="hh:mm:ss"
        value={timestampInput.time}
        onChange={(e) => setTimestampInput({ ...timestampInput, time: e.target.value })}
      />
      <input 
        type="text" 
        className="border border-gray-300 p-2 rounded text-black w-full" 
        placeholder="Title" 
        value={timestampInput.title}
        onChange={(e) => setTimestampInput({ ...timestampInput, title: e.target.value })}
      />

      <div>
        <span>
          { timestampInput.time !== "" && timestampInput.title !== "" ? "✅" : "❌" }
        </span>
      </div>
    </div>
  );
}
