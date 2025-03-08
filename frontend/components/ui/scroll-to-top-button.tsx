"use client"

import { memo } from "react"
import { Button } from "@/components/ui/button"
import { useScrollToTop } from "@/hooks/use-scroll-to-top"

export const ScrollToTopButton = memo(function ScrollToTopButton() {
  const { showButton, scrollToTop } = useScrollToTop()

  if (!showButton) return null

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 h-12 w-12 rounded-full bg-[#0a082b] p-0 transition-all hover:opacity-90 cursor-pointer"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[#2b00eb]"
      >
        <path
          d="M12.9841 2.00632C12.7933 1.96023 12.5932 1.96023 12.4024 2.00632C12.2116 2.05241 12.0353 2.14272 11.8908 2.26932L11.8908 2.26932L8.49083 5.66932C8.20083 5.95932 8.20083 6.42932 8.49083 6.71932C8.78083 7.00932 9.25083 7.00932 9.54083 6.71932L11.6908 4.56932V14.9993C11.6908 15.4093 12.0308 15.7493 12.4408 15.7493C12.8508 15.7493 13.1908 15.4093 13.1908 14.9993V4.56932L15.3408 6.71932C15.6308 7.00932 16.1008 7.00932 16.3908 6.71932C16.6808 6.42932 16.6808 5.95932 16.3908 5.66932L13.0008 2.27932C12.8563 2.13468 12.6749 2.05241 12.9841 2.00632ZM6.89083 8.99932C6.89083 8.58932 6.55083 8.24932 6.14083 8.24932C5.73083 8.24932 5.39083 8.58932 5.39083 8.99932V17.9993C5.39083 19.3793 6.51083 20.4993 7.89083 20.4993H16.8908C18.2708 20.4993 19.3908 19.3793 19.3908 17.9993V8.99932C19.3908 8.58932 19.0508 8.24932 18.6408 8.24932C18.2308 8.24932 17.8908 8.58932 17.8908 8.99932V17.9993C17.8908 18.5493 17.4408 18.9993 16.8908 18.9993H7.89083C7.34083 18.9993 6.89083 18.5493 6.89083 17.9993V8.99932Z"
          fill="currentColor"
        />
      </svg>
      <span className="sr-only">Volver arriba</span>
    </Button>
  )
})

