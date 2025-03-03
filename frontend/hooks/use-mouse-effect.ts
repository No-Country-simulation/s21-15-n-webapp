"use client";

import { useState, useEffect, useCallback } from "react";

export interface MousePosition {
  x: number;
  y: number;
}

export interface MouseEffectOptions {
  enabled?: boolean;
  intensity?: number;
  smoothing?: number;
  bounds?: "window" | "element";
  target?: HTMLElement | null;
}

export function useMouseEffect({
  enabled = true,
  intensity = 1,
  smoothing = 0.1,
  bounds = "window",
  target = null,
}: MouseEffectOptions = {}) {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const [targetPosition, setTargetPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const [isMounted, setIsMounted] = useState(false);

  const calculatePosition = useCallback(
    (e: MouseEvent) => {
      if (bounds === "element" && target) {
        const rect = target.getBoundingClientRect();
        return {
          x: ((e.clientX - rect.left) / rect.width) * 100 * intensity,
          y: ((e.clientY - rect.top) / rect.height) * 100 * intensity,
        };
      }
      return {
        x: (e.clientX / window.innerWidth) * 100 * intensity,
        y: (e.clientY / window.innerHeight) * 100 * intensity,
      };
    },
    [bounds, target, intensity]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!enabled) return;
      setTargetPosition(calculatePosition(e));
    },
    [enabled, calculatePosition]
  );

  // Efecto de suavizado
  useEffect(() => {
    if (!enabled) return;

    let animationFrameId: number;

    const animate = () => {
      setMousePosition((current) => ({
        x: current.x + (targetPosition.x - current.x) * smoothing,
        y: current.y + (targetPosition.y - current.y) * smoothing,
      }));
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [enabled, smoothing, targetPosition]);

  // Efecto para event listeners
  useEffect(() => {
    setIsMounted(true);
    if (enabled) {
      const element = bounds === "element" && target ? target : window;
      element.addEventListener("mousemove", handleMouseMove as EventListener);
      return () => element.removeEventListener("mousemove", handleMouseMove as EventListener);
    }
  }, [enabled, bounds, target, handleMouseMove]);

  return {
    mousePosition,
    targetPosition,
    isMounted,
    isEnabled: enabled,
  };
}
