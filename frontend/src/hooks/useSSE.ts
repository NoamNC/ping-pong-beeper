import { useEffect, useState } from "react";
import { useMessages } from "../context/MessagesProvider";
import { useDisplay } from "../context/DisplayProvider";

const SSE_URL = `${process.env.REACT_APP_API_URL}/api/ping/stream`;

export const useSSE = () => {
  const { addMessage, reqSentAt, displayLastMessage } = useMessages();
  const { withHighlight, withBlinkingGreen, setDisplayContent } = useDisplay();
  const [source, setSource] = useState<EventSource | undefined>(undefined);

  useEffect(() => {
    if (!SSE_URL) {
      console.log("error");
      return;
    }
    if (!source) {
      setSource(new EventSource(SSE_URL));
      return;
    }
    source.onopen = () => {
      console.log("🟢 SSE connected");
      reqSentAt.current = Date.now();
    };

    source.onmessage = (event) => {
      console.log("📨 Received SSE:", event.data);
      withBlinkingGreen(() => addMessage({ messageContent: event.data }))();
      withHighlight(() => displayLastMessage())();
      setDisplayContent(true);
    };

    source.onerror = (error) => {
      console.error("❌ SSE error:", error);
      reqSentAt.current = null;
    };

    return () => {
      source.close();
      console.log("🔴 SSE disconnected");
    };
  }, [
    addMessage,
    displayLastMessage,
    reqSentAt,
    setDisplayContent,
    withBlinkingGreen,
    withHighlight,
    source,
  ]);
};
