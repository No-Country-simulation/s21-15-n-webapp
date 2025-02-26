import { useState, useEffect } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
}

export function useRandomStars(count = 50) {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generateStars = () => {
      return Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        duration: Math.random() * 3 + 2,
      }));
    };

    setStars(generateStars());

    const interval = setInterval(() => {
      setStars(generateStars());
    }, 5000);

    return () => clearInterval(interval);
  }, [count]);

  return stars;
}
