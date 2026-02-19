import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { PRICING_CONFIG } from "@/config/pricing";

export function Hero() {
  return (
    <section className="pt-32 pb-16 md:pt-48 md:pb-32 bg-linear-to-b from-muted/50 to-background">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          A Gestão Perfeita para o seu <span className="text-primary">Negócio</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          Agendamentos online, controle financeiro e gestão de clientes em um só lugar. 
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="gap-2" asChild>
            <Link href="/register">
              Testar Gratuitamente <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline">
            Ver Demonstração
          </Button>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>Sem cartão de crédito</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>{PRICING_CONFIG.test.days} dias grátis</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>Suporte 24/7</span>
          </div>
        </div>
      </div>
    </section>
  );
}
