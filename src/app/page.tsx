"use client";
import InputTimestamp from "@/components/InputTimestamp";
import { addHandler, clearHandler, exportHandler, loadHandler, saveHandler } from "@/handler";
import type { TimestampInput } from "@/types";
import { getSeconds } from "@/utils";
import { useEffect, useState } from "react";

export default function Home() {
  const [inputCount, setInputCount] = useState(0);
  const [inputTemp, setInputTemp] = useState<TimestampInput[]>([]);

  const [startTime, setStartTime] = useState("");
  const optStartTime = getSeconds(startTime);

  const [exportText, setExportText] = useState<string | undefined>();

  useEffect(() => {
    if (inputTemp.length > 0 && optStartTime !== undefined) {
      setExportText(exportHandler(inputTemp, optStartTime));
    } 
  }, [inputTemp]);

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
        <span className="w-full text-start -mb-1 mt-1">Timestamp list</span>
        {[...Array(inputCount)].map((_, index) => (
          <div className="flex flex-row gap-2 justify-center items-center w-full" key={index}>
            <InputTimestamp 
              key={index}
              timestampInput={inputTemp[index]}
              setTimestampInput={(timestampInput) => {
                setInputTemp((prev) => {
                  const newInputTemp = [...prev];
                  newInputTemp[index] = timestampInput;
                  return newInputTemp;
                });
              }}
            />
            <button 
              className="text-white font-bold rounded"
              onClick={() => {
                setInputCount(inputCount - 1);
                setInputTemp((prev) => {
                  const newInputTemp = [...prev];
                  newInputTemp.splice(index, 1);
                  return newInputTemp;
                });
              }}
            >
              🗑️
            </button>
          </div>
        ))}
        <div className="flex flex-row justify-center items-center gap-2 w-full">
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            onClick={() => addHandler(setInputCount, setInputTemp)}
          >
            Add Item
          </button>
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => clearHandler(setInputCount, setInputTemp, setStartTime)}
          >
            Clear
          </button>
        </div>
        <div className="flex flex-row justify-center items-center gap-2 w-full">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            onClick={() => saveHandler(inputTemp, startTime)}
          >
            Save
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            onClick={() => loadHandler(setInputTemp, setInputCount, setStartTime)}
          >
            Load
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            onClick={() => {
              if (exportText) {
                navigator.clipboard.writeText(exportText);
                alert("Exported to clipboard");
              }
            }}
          >
            Export
          </button>
        </div>

        {
          exportText && (
            <div className="flex flex-col gap-2 justify-center items-start w-full mt-4">
              <span>Export Preview</span>
              <div className="border border-gray-300 p-2 rounded text-white w-full">
                { exportText?.split("\n").map((line, index) => (
                  <div key={index}>{line}</div>
                )) }
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
}
