import { TimestampInput } from "@/types";

export default function InputTimestamp(
    { timestampInput, setTimestampInput }: {
        timestampInput: TimestampInput;
        setTimestampInput: (timestampInput: TimestampInput) => void;
    }
) {
    return (
        <div className="flex flex-row justify-center items-center gap-2 w-full">
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

            <span>
                {timestampInput.time !== "" && timestampInput.title !== "" ? "✅" : "❌"}
            </span>
        </div>
    );
}