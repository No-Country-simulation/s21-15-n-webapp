"use client"

import { useEffect, useState } from "react"

export const useAvatarMock = () => {
  const [avatarSrc, setAvatarSrc] = useState("/placeholder.svg")

  useEffect(() => {
    // Usar un ID aleatorio para evitar caché y obtener diferentes avatares
    const randomId = Math.floor(Math.random() * 1000)
    setAvatarSrc(`https://i.pravatar.cc/150?img=${randomId}`)
  }, [])

  return avatarSrc
}

