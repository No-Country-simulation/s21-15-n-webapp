"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"
import { motion } from "framer-motion"

export function AdventureSection() {
  return (
    <section className="h-full">
      <div className="w-full h-full">
        <Card className="border-primary/20 bg-[#0A061E] overflow-hidden h-full">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-lg font-medium text-white">Tu aventura espacial</CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <Progress value={60} className="w-32 h-2 bg-primary/20" />
                <span className="text-sm text-muted-foreground">60/100 XP</span>
              </div>
            </div>
            <Button variant="ghost" className="text-primary hover:text-primary/80">
              Ver más
            </Button>
          </CardHeader>
          <CardContent className="pt-6 h-[calc(100%-60px)]">
            <div className="relative h-48">
              {/* Línea conectora */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/50 via-primary/30 to-primary/10" />

              {/* Planetas */}
              <div className="relative z-10 flex justify-between px-8">
                {[0, 1, 2, 3, 4].map((index) => (
                  <motion.div
                    key={index}
                    className="relative"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <div
                      className={`w-16 h-16 rounded-full relative ${index <= 2 ? "bg-primary/20" : "bg-gray-800/50"}`}
                    >
                      <Image
                        src="/placeholder.svg?height=64&width=64"
                        alt={`Planeta ${index + 1}`}
                        width={64}
                        height={64}
                        className="rounded-full"
                      />
                      {index <= 2 && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
                      )}
                    </div>

                    {/* Estrellas decorativas */}
                    <motion.div
                      className="absolute -top-4 -right-2 w-2 h-2 bg-yellow-400 rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                    />
                    <motion.div
                      className="absolute -bottom-2 -left-1 w-1 h-1 bg-primary rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 1, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Estrellas de fondo */}
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: Math.random() * 2 + 1,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

