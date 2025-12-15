import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * FAQs Page - Frequently Asked Questions
 * Design: Modern Minimalist with accordion layout
 */

const faqs = [
  {
    question: "How do I enter a competition?",
    answer:
      "Simply browse our competitions, select the one you like, choose how many tickets you want, answer the skill-based question, and complete your entry. You'll receive a confirmation email with your entry details.",
  },
  {
    question: "What are the odds of winning?",
    answer:
      "Our odds are among the best in the industry. Each competition clearly displays the number of tickets available and the odds of winning. The more tickets sold, the larger the prize pool, but your individual odds remain transparent.",
  },
  {
    question: "How are winners selected?",
    answer:
      "Winners are selected through live draws that we stream on our platform and social media. Each ticket has an equal chance of winning. We use certified random number generation to ensure fairness.",
  },
  {
    question: "When will I receive my prize?",
    answer:
      "Prize delivery times vary depending on the prize type. Physical prizes are typically shipped within 5-7 business days. Cash prizes are processed within 3-5 business days to your registered payment method.",
  },
  {
    question: "Can I enter multiple times?",
    answer:
      "Yes! You can purchase multiple tickets for the same competition to increase your chances of winning. Each ticket is a separate entry with an equal chance of being selected.",
  },
  {
    question: "Is my personal information secure?",
    answer:
      "Absolutely. We use industry-standard encryption and security measures to protect your personal and payment information. Your data is never shared with third parties without your consent.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and other secure payment methods. All transactions are encrypted and secure.",
  },
  {
    question: "Can I cancel my entry?",
    answer:
      "Entries cannot be cancelled once submitted. However, if you have concerns about your entry, please contact our support team and we'll assist you.",
  },
  {
    question: "Do you support international entries?",
    answer:
      "Currently, we operate within the UK. We're working to expand to other regions. Check back soon for updates on international availability.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "You can reach our support team via email at support@barrowcomps.com, through our contact form, or via live chat on our website. We typically respond within 24 hours.",
  },
];

export default function FAQs() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Page Header */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container">
          <div className="divider-line" />
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Frequently Asked <span className="text-secondary">Questions</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Find answers to common questions about how Barrow Competitions works.
          </p>
        </div>
      </section>

      {/* FAQs Content */}
      <section className="py-16 md:py-24">
        <div className="container max-w-3xl">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white border border-border rounded-lg px-6 animate-fade-in-up"
              >
                <AccordionTrigger className="hover:text-primary transition-colors duration-150 py-4">
                  <span className="text-left font-semibold text-foreground">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Didn't find your answer?
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            Our support team is here to help. Reach out to us and we'll get back to you as soon as possible.
          </p>
          <a
            href="mailto:support@barrowcomps.com"
            className="inline-block bg-primary hover:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-150"
          >
            Contact Support
          </a>
        </div>
      </section>
    </div>
  );
}
