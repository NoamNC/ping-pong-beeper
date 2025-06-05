import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
} from "react";


const DisplayContext = createContext<any>(null);

export const DisplayProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [isBlinkingGreen, setIsBlinkingGreen] = useState(false)
  const [displayContent, setDisplayContent] = useState(true);
  const HighlightTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const BlinkingGreenTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const withHighlight = useCallback((callback: () => void) => {
    return function () {
      setIsHighlighted(true);
      if (HighlightTimeoutRef.current) clearTimeout(HighlightTimeoutRef.current);
      HighlightTimeoutRef.current = setTimeout(() => setIsHighlighted(false), 5000);
      callback();
    };
  }, []);

  const withBlinkingGreen = useCallback((callback: () => void) => {
    return function () {
      setIsBlinkingGreen(true);
      if (BlinkingGreenTimeoutRef.current) clearTimeout(BlinkingGreenTimeoutRef.current);
      BlinkingGreenTimeoutRef.current = setTimeout(() => setIsBlinkingGreen(false), 5000);
      callback();
    };
  }, []);


  return (
    <DisplayContext.Provider
      value={{ isHighlighted, displayContent, setDisplayContent, withHighlight,withBlinkingGreen , isBlinkingGreen}}
    >
      {children}
    </DisplayContext.Provider>
  );
};

export const useDisplay = () => useContext(DisplayContext);
