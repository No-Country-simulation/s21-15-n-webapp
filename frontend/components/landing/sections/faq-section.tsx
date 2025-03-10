import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { LANDING_CONFIG } from "@/config/constants/landing.config"

export function FAQSection() {
  return (
    <section className="py-20 bg-background" id="faq">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Preguntas Frecuentes</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Resolvemos tus dudas para ayudarte en tu viaje a través del universo StartPerks
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {LANDING_CONFIG.faqs.map((faq) => (
              <AccordionItem key={faq.id} value={`item-${faq.id}`} className="border-white/10">
                <AccordionTrigger className="text-white hover:text-primary">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
