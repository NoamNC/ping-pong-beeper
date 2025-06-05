import { cn } from "clsx-for-tailwind";
import { useMessages } from "../context/MessagesProvider";
import { sendPing } from "../services/pingService";
import { useState } from "react";
import { useDisplay } from "../context/DisplayProvider";

const PingButton = () => {
  const { reqSentAt } = useMessages();
  const [isLoading, setIsLoading] = useState(false);
  const {withHighlight} = useDisplay()

  const handleButtonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    reqSentAt.current = Date.now();
    withHighlight(()=>setIsLoading(true))();
    await sendPing()
    setIsLoading(false);
  };
  return (
    <button
      onClick={handleButtonClick}
      disabled={isLoading}
      className={cn(
        "py-1 px-8",
        "rounded-xl bg-slate-200",
        "hover:cursor-pointer hover:bg-slate-300",
        "disabled:cursor-default disabled:bg-slate-100 disabled:text-slate-400"
      )}
    >
      Send ping
    </button>
  );
};

export default PingButton;
