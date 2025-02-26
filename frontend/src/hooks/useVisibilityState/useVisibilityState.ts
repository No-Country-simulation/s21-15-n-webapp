import { useState, useEffect, useCallback } from "react";

export function useVisibilityState() {
  const [isVisible, setIsVisible] = useState(true);
  const [wasHidden, setWasHidden] = useState(false);

  const handleVisibilityChange = useCallback(() => {
    if (document.hidden) {
      setIsVisible(false);
      setWasHidden(true);
    } else {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [handleVisibilityChange]);

  return { isVisible, wasHidden, setWasHidden };
}
