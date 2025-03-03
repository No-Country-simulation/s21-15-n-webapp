import { ReactNode } from "react"
import { ScrollToTopButton } from "../components/navigation/ScrollToTopButton"

export default function RootLayout({
  children,
}: {
  readonly children: ReactNode
}) {
  return (
    <html lang="es">
      <body className="text-2xl">
        <div id="main-content">{children}</div>
        <ScrollToTopButton />
      </body>
    </html>
  )
}
