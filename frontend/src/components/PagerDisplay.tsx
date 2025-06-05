import { BatteryFull } from "lucide-react";
import RealTimeClock from "./RealTimeClock";
import { formatDate, formatTime } from "../lib/utils";
import { useMessages } from "../context/MessagesProvider";
import { useDisplay } from "../context/DisplayProvider";
import { cn } from "clsx-for-tailwind";

const PagerDisplay = () => {
  const { messages, displayedMessageIndex } = useMessages();
  const { isHighlighted, displayContent } = useDisplay();

  const formatTimeAndDate = ({ date }: { date: Date }) =>
    `${formatDate({ date, format: "short" })} ${formatTime({ date })}`;

  const getLatency = ({ date1, date2 }: { date1: Date; date2: Date }) =>
    Math.abs(date1.getTime() - date2.getTime());

  return (
    <div
      key={messages.current[displayedMessageIndex]?.id}
      className={cn(
        "w-full h-20 mb-2 py-1 px-2",
        "flex flex-col",
        "bg-green-700 rounded-md",
        isHighlighted && "bg-green-400"
      )}
    >
      <div className={cn("flex justify-between items-center", "mb-1")}>
        <RealTimeClock />
        <BatteryFull className={cn("w-4 h-4 mr-2", " text-black")} />
      </div>
      {messages.current[displayedMessageIndex]?.content && (
        <div
          className={cn(
            "flex flex-col justify-center",
            "text-[10px]",
            "h-full"
          )}
        >
          {displayContent ? (
            <span className="text-sm">
              Message: {messages.current[displayedMessageIndex]?.content} #{displayedMessageIndex}
            </span>
          ) : (
            <>
              <span>
                Ping sent at:{" "}
                {formatTimeAndDate({
                  date: messages.current[displayedMessageIndex].pingSendTime,
                })}
              </span>
              <span>
                Pong received at:{" "}
                {formatTimeAndDate({
                  date: messages.current[displayedMessageIndex].createdAt,
                })}
              </span>
              <span>
                Latency:{" "}
                {getLatency({
                  date1: messages.current[displayedMessageIndex].pingSendTime,
                  date2: messages.current[displayedMessageIndex].createdAt,
                })}{" "}
                ms
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PagerDisplay;
