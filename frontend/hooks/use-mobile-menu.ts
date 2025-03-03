"use client";

import { useState, useCallback } from "react";

interface MobileMenuConfig {
  onOpen?: () => void;
  onClose?: () => void;
}

export function useMobileMenu(config: MobileMenuConfig = {}) {
  const { onOpen, onClose } = config;
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
    onOpen?.();
  }, [onOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
    if (isOpen) {
      onClose?.();
    } else {
      onOpen?.();
    }
  }, [isOpen, onOpen, onClose]);

  return {
    isOpen,
    open,
    close,
    toggle,
  };
}
