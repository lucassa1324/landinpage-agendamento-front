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
    description: "Seus clientes agendam 24h por dia pelo link exclusivo do seu negócio.",
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
    <section id="features" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-wider uppercase bg-primary/10 text-primary rounded-full">
            Funcionalidades Premium
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Tudo o que você precisa para crescer</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Uma plataforma robusta e intuitiva, desenhada especificamente para a rotina de um negócio de beleza e arte.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="group border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-white rounded-3xl overflow-hidden">
              <CardHeader className="pb-2">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
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
