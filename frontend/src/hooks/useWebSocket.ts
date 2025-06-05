import { useEffect } from "react";
import { useMessages } from "../context/MessagesProvider";
import { useDisplay } from "../context/DisplayProvider";

const WS_URL = process.env.REACT_APP_WS_URL;

export const useWebSocket = () => {
  const { addMessage, reqSentAt, displayLastMessage } = useMessages();
  const { withHighlight, withBlinkingGreen,setDisplayContent } = useDisplay();

  useEffect(() => {
    if (!WS_URL) {
      console.error("❌ WebSocket URL not defined.");
      return;
    }

    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      console.log("🟢 WebSocket connected");
      reqSentAt.current = Date.now();
    };

    ws.onmessage = (event) => {
      console.log("📨 Received:", event.data);
      withBlinkingGreen(() => addMessage({ messageContent: event.data }))();
      withHighlight(() => displayLastMessage())();
      setDisplayContent(true)
    };

    ws.onerror = (error) => {
      console.error("❌ WebSocket error:", error);
      reqSentAt.current = null;
    };

    ws.onclose = () => {
      console.log("🔴 WebSocket disconnected");
    };

    return () => ws.close();
  }, [addMessage, displayLastMessage, reqSentAt, setDisplayContent, withBlinkingGreen, withHighlight]);
};
