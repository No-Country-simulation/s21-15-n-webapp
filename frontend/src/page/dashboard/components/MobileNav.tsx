import { Button } from "../../../components/ui/button";
import { ScrollArea } from "../../../components/ui/scroll-area";
import { Sheet, SheetContent } from "../../../components/ui/sheet";
import { X } from "lucide-react"

interface MobileNavProps {
  readonly open: boolean
  readonly onClose: () => void
}

export function MobileNav({ open, onClose }: Readonly<MobileNavProps>) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="left" className="w-72 border-primary/20 bg-background/95 backdrop-blur-xl p-0">
        <div className="flex h-16 items-center justify-between border-b border-primary/20 px-4">
          <h2 className="text-lg font-semibold">Navegación</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close menu</span>
          </Button>
        </div>
        <ScrollArea className="h-[calc(100vh-4rem)] pb-10">
          <div className="p-4">{/* Aquí va el contenido del menú móvil */}</div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
