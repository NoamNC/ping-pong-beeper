import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useCallback,
  useRef,
  RefObject,
} from "react";
import { TMessage } from "../lib/types";

type TMessagesContext = {
  messages: RefObject<TMessage[]>;
  addMessage: (data: { messageContent: string }) => void;
  displayedMessageIndex: number;
  displayNextMessage: () => void;
  displayedPrevMessage: () => void;
  reqSentAt: RefObject<number | null>;
  displayLastMessage: () => void;
};

const MessagesContext = createContext<TMessagesContext | undefined>(undefined);

export const MessagesProvider = ({ children }: { children: ReactNode }) => {
  const messages = useRef<TMessage[]>([]);
  const reqSentAt = useRef(null);
  const [displayedMessageIndex, setDisplayedMessageIndex] = useState(0);

  const displayNextMessage = useCallback(() => {
    if (displayedMessageIndex < messages.current.length - 1) {
      setDisplayedMessageIndex((prv) => prv + 1);
    }
  }, [displayedMessageIndex, messages]);

  const displayedPrevMessage = useCallback(() => {
    if (displayedMessageIndex > 0) {
      setDisplayedMessageIndex((prv) => prv - 1);
    }
  }, [displayedMessageIndex]);

  const displayLastMessage = useCallback(() => {
    setDisplayedMessageIndex(messages.current.length - 1);
  }, []);

  const addMessage = useCallback(
    ({ messageContent }: { messageContent: string }) => {
      if (!reqSentAt.current) {
        return;
      }
      const pingSendTime = new Date(reqSentAt.current);
      const newMessage = {
        id: crypto.randomUUID(),
        content: messageContent,
        createdAt: new Date(),
        pingSendTime,
      };
      messages.current = [...messages.current, newMessage];
      reqSentAt.current = null;
    },
    []
  );

  return (
    <MessagesContext.Provider
      value={{
        messages,
        addMessage,
        displayedMessageIndex,
        displayedPrevMessage,
        displayNextMessage,
        reqSentAt,
        displayLastMessage,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error("useMessages must be used within a MessagesProvider");
  }
  return context;
};
