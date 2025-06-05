import { cn } from "clsx-for-tailwind";
import { useDisplay } from "../context/DisplayProvider";

const BlinkingLight = () => {
  const {isBlinkingGreen} = useDisplay()
  return (
    <div
      className={cn(
        "animate-pulse",
        "self-end",
        " bg-red-600 ",
        "rounded-full",
        " w-2 h-2 mb-2",
        isBlinkingGreen &&"bg-green-400"
      )}
    />
  );
};

export default BlinkingLight;
