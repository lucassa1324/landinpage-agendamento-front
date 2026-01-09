import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const tiers = [
  {
    name: "Starter",
    price: "R$ 49",
    description: "Ideal para profissionais autônomos começando agora.",
    features: [
      "Até 100 agendamentos/mês",
      "Agenda Online",
      "Gestão de Clientes",
      "Suporte via E-mail",
    ],
    buttonText: "Começar Agora",
    popular: false,
    href: "/register",
  },
  {
    name: "Professional",
    price: "R$ 97",
    description: "Para studios em crescimento com equipe pequena.",
    features: [
      "Agendamentos ilimitados",
      "Até 3 profissionais",
      "Financeiro Completo",
      "Lembretes WhatsApp",
      "Suporte Prioritário",
    ],
    buttonText: "Testar Grátis",
    popular: true,
    href: "/register",
  },
  {
    name: "Business",
    price: "R$ 197",
    description: "Gestão completa para grandes studios e redes.",
    features: [
      "Tudo do Professional",
      "Profissionais ilimitados",
      "Multi-unidades",
      "API de Integração",
      "Gerente de Conta",
    ],
    buttonText: "Falar com Consultor",
    popular: false,
    href: "#contact",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Planos que cabem no seu bolso</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Escolha o plano ideal para o momento do seu negócio. Cancele quando quiser.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <Card 
              key={tier.name} 
              className={`flex flex-col relative ${tier.popular ? 'border-primary shadow-lg scale-105 z-10' : 'border-border'}`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold py-1 px-3 rounded-full">
                  MAIS POPULAR
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
