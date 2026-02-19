import { 
  CalendarDays, 
  Users, 
  BarChart3, 
  Smartphone, 
  Bell,
  Package,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Agendamento Online",
    description: "Seus clientes agendam 24h por dia pelo link exclusivo do seu studio.",
    icon: CalendarDays,
  },
  {
    title: "Gestão de Clientes",
    description: "Histórico completo de atendimentos, fotos e preferências de cada cliente.",
    icon: Users,
  },
  {
    title: "Financeiro Simplificado",
    description: "Controle eficiente de entradas e saídas do seu negócio.",
    icon: BarChart3,
  },
  {
    title: "App para Profissionais",
    description: "Toda a equipe com acesso à agenda e notificações em tempo real.",
    icon: Smartphone,
  },
  {
    title: "Notificações em Tempo Real",
    description: "Alertas no navegador sobre novos agendamentos, cancelamentos e estoque baixo.",
    icon: Bell,
  },
  {
    title: "Controle de Estoque",
    description: "Gerencie produtos usados nos serviços e vendas diretas com baixa automática.",
    icon: Package,
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Tudo o que você precisa para crescer</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Uma plataforma robusta e intuitiva, desenhada especificamente para a rotina de um studio de beleza e arte.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="border-none shadow-md bg-muted/30">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
