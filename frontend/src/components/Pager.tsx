import { cn } from "clsx-for-tailwind";
import { useMessages } from "../context/MessagesProvider";
import { useWebSocket } from "../hooks/useWebSocket";
import PingButton from "./ButtonPing";
import ButtonArrow from "./ButtonArrow";
import { useDisplay } from "../context/DisplayProvider";
import PagerDisplay from "./PagerDisplay";
import BlinkingLight from "./BlinkingLight";

const Pager = () => {
  const { displayNextMessage, displayedPrevMessage } = useMessages();
  const { setDisplayContent, withHighlight } = useDisplay();
  useWebSocket();

  const handlePrev = withHighlight(displayedPrevMessage);
  const handleNext = withHighlight(displayNextMessage);
  const handleUp = withHighlight(() => setDisplayContent(true));
  const handleDown = withHighlight(() => setDisplayContent(false));

  return (
    <div
      className={cn(
        "w-[360px] h-48 p-4 m-auto my-[25vh]",
        "flex flex-col items-center",
        "shadow-lg bg-black rounded-2xl"
      )}
    >
      <BlinkingLight />
      <PagerDisplay />
      <div className="flex justify-between w-full items-center">
        <div className="flex space-x-2 items-center">
          <ButtonArrow
            icon="&#9664;"
            className={cn("w-6 h-6 ", "text-xs")}
            onClick={handlePrev}
          />
          <ButtonArrow
            icon="&#9654;"
            className={cn("w-6 h-6 ", "text-xs")}
            onClick={handleNext}
          />
          <PingButton />
        </div>
        <div className="flex flex-col space-y-1">
          <ButtonArrow
            icon="&#9650;"
            className={cn("w-4 h-4 ", "text-[10px]")}
            onClick={handleUp}
          />
          <ButtonArrow
            icon="&#9660;"
            className={cn("w-4 h-4 ", "text-[10px]")}
            onClick={handleDown}
          />
        </div>
      </div>
    </div>
  );
};

export default Pager;
