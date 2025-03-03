import { memo } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface FAQItem {
  id: string
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    id:"1",
    question: "¿Qué es StartPerks?",
    answer:
      "StartPerks es una plataforma que te permite ganar experiencia práctica en tecnología a través de simulaciones laborales y desafíos, mientras acumulás puntos y desbloqueás beneficios exclusivos.",
  },
  {
    id:"2",
    question: "¿Cómo me registro?",
    answer:
      "Podés registrarte gratuitamente haciendo click en el botón 'Crear cuenta' en la parte superior de la página. Solo necesitás completar algunos datos básicos y validar tu email.",
  },
  {
    id:"3",
    question: "¿Cómo acumulo puntos y subo de nivel?",
    answer:
      "Acumulás puntos completando desafíos técnicos, participando en simulaciones laborales y recibiendo feedback positivo de mentores. Cada nivel requiere una cantidad específica de puntos.",
  },
  {
    id:"4",
    question: "¿Necesito experiencia previa en tecnología?",
    answer:
      "No, StartPerks está diseñado para todos los niveles. Tenemos rutas de aprendizaje que te guían desde lo básico hasta lo avanzado.",
  },
]

export const FAQSection = memo(function FAQSection() {
  return (
    <section className="py-20" id="faq">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Preguntas Frecuentes sobre cómo navegar por StartPerks</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Resolvemos dudas para que puedas despegar participando en la comunidad galáctica
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={`item-${faq.id}`} className="border-purple-900/20">
                <AccordionTrigger className="text-white hover:text-purple-400">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-400">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
})
