import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { PRICING_CONFIG } from "@/config/pricing";

const tiers = [
  {
    name: "Teste Grátis",
    price: PRICING_CONFIG.test.price,
    description: PRICING_CONFIG.test.description,
    features: [
      `${PRICING_CONFIG.test.days} dias de acesso total`,
      "Sem cartão de crédito",
      "Suporte incluído",
      "Configuração rápida",
    ],
    buttonText: "Começar Teste",
    popular: false,
    href: "/register",
  },
  {
    name: "Aura Pro",
    price: PRICING_CONFIG.pro.price,
    description: PRICING_CONFIG.pro.description,
    features: [
      "Agendamentos ilimitados",
      "Financeiro Simplificado",
      "Suporte Prioritário",
      "Gestão de Clientes",
      "Múltiplos Profissionais",
      "Notificações de Navegador",
    ],
    buttonText: "Assinar Agora",
    popular: true,
    href: "/register",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Planos Simples e Transparentes</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comece com {PRICING_CONFIG.test.days} dias grátis. Depois, apenas um valor fixo para ter controle total do seu negócio.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {tiers.map((tier) => (
            <Card 
              key={tier.name} 
              className={`flex flex-col relative ${tier.popular ? 'border-primary shadow-lg scale-105 z-10' : 'border-border'}`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold py-1 px-3 rounded-full">
                  MELHOR ESCOLHA
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{tier.name}</CardTitle>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  <span className="text-muted-foreground">/mês</span>
                </div>
                <CardDescription className="mt-4">{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="grow">
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={tier.popular ? "default" : "outline"}
                  asChild
                >
                  <Link href={tier.href}>{tier.buttonText}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
