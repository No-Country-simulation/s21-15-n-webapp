"use client";

import { useState, useEffect } from "react";
import { UI_CONFIG } from "@/config/constants/app-config";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  color: string;
}

export function useRandomStars(count: number = UI_CONFIG.maxStars) {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    console.log("Generating stars:", count); // Debugging

    const generateStars = () => {
      // Colores más vibrantes y variados para las estrellas
      const colors = [
        "bg-purple-400",
        "bg-indigo-400",
        "bg-blue-400",
        "bg-cyan-400",
        "bg-violet-400",
        "bg-fuchsia-400",
        "bg-pink-400",
      ];

      return Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1.5, // Estrellas más grandes
        opacity: Math.random() * 0.7 + 0.3, // Mayor opacidad
        duration: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
    };

    // Generar estrellas iniciales
    const initialStars = generateStars();
    setStars(initialStars);
    console.log("Initial stars generated:", initialStars.length); // Debugging

    // Configurar intervalo para regenerar estrellas cada 5 segundos exactamente
    const interval = setInterval(() => {
      // Transición suave entre conjuntos de estrellas
      const newStars = generateStars();
      setStars(newStars);
    }, 5000); // 5 segundos

    return () => clearInterval(interval);
  }, [count]);

  return stars;
}
