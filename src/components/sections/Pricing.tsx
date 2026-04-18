"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { PRICING_CONFIG } from "@/config/pricing";
import { useEffect, useState } from "react";

export function Pricing() {
  const [proPrice, setProPrice] = useState(PRICING_CONFIG.pro.price);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        // Tenta buscar o preço dinâmico do backend
        // Usamos a URL absoluta do backend já que a landing page está em porta diferente
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
        const response = await fetch(`${apiUrl}/api/business/settings/pricing?t=${Date.now()}`);
        if (response.ok) {
          const data = await response.json();
          if (data.price) {
            const formattedPrice = new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(data.price);
            setProPrice(formattedPrice);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar preço dinâmico:", error);
      }
    };

    fetchPrice();
  }, []);

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
      price: proPrice,
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

  return (
    <section id="pricing" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full h-full bg-primary/5 blur-3xl rounded-full" />
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-wider uppercase bg-accent/20 text-accent-foreground rounded-full">
            Investimento no seu Sucesso
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Planos Simples e Transparentes</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Comece com {PRICING_CONFIG.test.days} dias grátis. Depois, apenas um valor fixo para ter controle total e empoderamento do seu negócio.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto items-stretch">
          {tiers.map((tier) => (
            <Card 
              key={tier.name} 
              className={`flex flex-col relative rounded-[2.5rem] border-none transition-all duration-500 hover:translate-y-[-8px] ${
                tier.popular 
                  ? 'bg-white shadow-2xl shadow-primary/20 ring-2 ring-primary scale-105 z-10' 
                  : 'bg-muted/40 shadow-xl'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold py-2 px-6 rounded-full shadow-lg tracking-widest uppercase">
                  A Escolha das Estrelas
                </div>
              )}
              <CardHeader className="pt-10 pb-6 px-8 text-center">
                <CardTitle className="text-2xl font-bold mb-2 uppercase tracking-tighter">{tier.name}</CardTitle>
                <div className="flex flex-col items-center gap-1 mt-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black tracking-tighter text-primary">{tier.price}</span>
                    <span className="text-muted-foreground font-medium">/mês</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 font-medium">{tier.description}</p>
                </div>
              </CardHeader>
              <CardContent className="grow px-8 pb-8">
                <div className="space-y-4 pt-6 border-t border-border/50">
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-base font-medium text-foreground/80">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="px-8 pb-10">
                <Button 
                  asChild 
                  size="lg" 
                  variant={tier.popular ? "default" : "outline"}
                  className={`w-full h-14 rounded-full text-lg font-bold shadow-lg transition-all ${
                    tier.popular ? 'shadow-primary/30' : 'hover:bg-primary/5 border-primary/20'
                  }`}
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
