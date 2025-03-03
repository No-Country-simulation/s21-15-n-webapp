import { useState, useEffect } from "react";

export function useMobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.getElementById("main-content")?.classList.add("blur-sm");
    } else {
      document.body.style.overflow = "unset";
      document.getElementById("main-content")?.classList.remove("blur-sm");
    }

    return () => {
      document.body.style.overflow = "unset";
      document.getElementById("main-content")?.classList.remove("blur-sm");
    };
  }, [isOpen]);

  return {
    isOpen,
    setIsOpen,
  };
}
