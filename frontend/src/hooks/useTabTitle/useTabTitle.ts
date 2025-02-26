import { useEffect } from "react";

export function useTabTitle(isLocked: boolean) {
  useEffect(() => {
    const originalTitle = document.title;

    if (isLocked) {
      document.title = "🔒 Página Bloqueada - Regresa para desbloquear";
    }

    return () => {
      document.title = originalTitle;
    };
  }, [isLocked]);
}
