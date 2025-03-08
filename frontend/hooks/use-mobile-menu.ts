"use client"

import { useState, useCallback, useEffect } from "react"

interface MobileMenuConfig {
  onOpen?: () => void
  onClose?: () => void
}

export function useMobileMenu(config: MobileMenuConfig = {}) {
  const { onOpen, onClose } = config
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => {
    setIsOpen(true)
    onOpen?.()
  }, [onOpen])

  const close = useCallback(() => {
    setIsOpen(false)
    onClose?.()
  }, [onClose])

  const toggle = useCallback(() => {
    if (isOpen) {
      close()
    } else {
      open()
    }
  }, [isOpen, open, close])

  // Cerrar el menú cuando la pantalla se hace grande
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        close()
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isOpen, close])

  return {
    isOpen,
    open,
    close,
    toggle,
  }
}

