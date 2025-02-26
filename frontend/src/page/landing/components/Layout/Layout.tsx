import { ReactNode } from "react"

export default function RootLayout({
  children,
}: {
  readonly children: ReactNode
}) {
  return (
    <html lang="es">
      <body className="text-2xl">
        <div id="main-content">{children}</div>
      </body>
    </html>
  )
}
