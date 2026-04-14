"use client";

import { useState, use } from "react";
import { 
  ArrowLeft, 
  Clock, 
  ChevronRight, 
  Lightbulb, 
  CheckCircle2, 
  BookOpen,
  Share2,
  Bookmark
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Dados completos dos tutoriais
const tutorialData = {
  "configurar-primeiro-negocio": {
    title: "Configuração Estratégica: O Início do Sucesso",
    description: "Configure sua conta focado em passar profissionalismo e segurança para seus clientes desde o primeiro dia.",
    content: [
      {
        title: "1. Visão Geral do Painel",
        text: "O seu dashboard é o coração do seu negócio. Aqui você acompanha agendamentos, faturamento e o status da sua agenda em tempo real.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
        tip: "Fique de olho no card 'Status da Agenda' para garantir que seus clientes consigam agendar horários."
      },
      {
        title: "2. Identidade e Reconhecimento",
        text: "O nome do seu negócio e sua logo são sua marca. Configure as informações básicas, redes sociais e dados de contato para gerar confiança imediata.",
        image: "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c20e?q=80&w=800&auto=format&fit=crop",
        tip: "Um perfil completo com logo e horários bem definidos passa 70% mais credibilidade que um perfil genérico."
      },
      {
        title: "3. O Resultado Final",
        text: "Após configurar seus dados, seu site profissional estará pronto para receber clientes com um design limpo e focado em conversão.",
        image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=800&auto=format&fit=crop",
        tip: "Sempre visualize seu site após fazer alterações para garantir que a experiência do cliente seja perfeita."
      }
    ]
  },
  "gestao-agendamentos": {
    title: "Gestão de Agendamentos e Redução de Faltas",
    description: "Domine sua agenda e aprenda estratégias para reduzir o no-show em até 80%.",
    content: [
      {
        title: "1. A Grade de Horários",
        text: "Sua agenda é visual e intuitiva. Cada bloco de cor representa um status diferente, permitindo identificar rapidamente janelas livres ou horários críticos.",
        image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=800&auto=format&fit=crop",
        tip: "Use o filtro por profissional para ter uma visão clara da carga de trabalho da sua equipe."
      },
      {
        title: "2. Criando um Novo Agendamento",
        text: "Clique em qualquer horário vago para abrir o formulário. Você pode selecionar o cliente, o serviço e até definir se é um atendimento recorrente.",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
        tip: "Sempre confirme o telefone do cliente para garantir que os lembretes automáticos cheguem corretamente."
      },
      {
        title: "3. Status e Bloqueios",
        text: "Mude o status para 'Confirmado', 'Em Atendimento' ou 'Finalizado'. Se precisar de um tempo para almoço ou curso, use a função de 'Bloquear Horário'.",
        image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=800&auto=format&fit=crop",
        tip: "Bloqueie horários com antecedência para evitar que clientes agendem em momentos de pausa."
      }
    ]
  },
  "cadastrar-servicos": {
    title: "Como cadastrar seus serviços",
    description: "Organize seu catálogo de serviços com preços, durações e categorias profissionais.",
    content: [
      {
        title: "1. Criando Categorias",
        text: "Primeiro, organize seus serviços em categorias (ex: Cabelo, Unhas, Estética). Isso facilita a navegação do cliente no seu site.",
        image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop",
        tip: "Categorias bem definidas ajudam no SEO do seu site de agendamento."
      },
      {
        title: "2. Detalhes do Serviço",
        text: "Ao cadastrar um serviço, defina o nome, descrição detalhada, preço e duração. Você também pode adicionar uma imagem atrativa.",
        image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=800&auto=format&fit=crop",
        tip: "Uma boa descrição reduz as dúvidas dos clientes e aumenta as conversões."
      },
      {
        title: "3. Vinculando Profissionais",
        text: "Selecione quais profissionais da sua equipe realizam este serviço. O sistema gerenciará a disponibilidade de cada um automaticamente.",
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800&auto=format&fit=crop",
        tip: "Você pode definir preços diferentes para o mesmo serviço dependendo do profissional."
      }
    ]
  },
  "gerenciar-clientes": {
    title: "Gestão de Clientes e Prontuários",
    description: "Mantenha o histórico completo de cada cliente e fidelize seu público com dados estratégicos.",
    content: [
      {
        title: "1. Ficha do Cliente",
        text: "Tenha acesso rápido a telefone, e-mail e data de nascimento. O Aura centraliza todas as informações para um atendimento personalizado.",
        image: "https://images.unsplash.com/photo-1556745753-b2904692b3cd?q=80&w=800&auto=format&fit=crop",
        tip: "Use o campo de observações para anotar preferências ou restrições do cliente."
      },
      {
        title: "2. Histórico de Agendamentos",
        text: "Veja todos os serviços que o cliente já realizou, quem o atendeu e quanto ele já investiu no seu negócio.",
        image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=800&auto=format&fit=crop",
        tip: "Clientes que retornam com frequência merecem mimos especiais. Use o histórico para identificá-los."
      },
      {
        title: "3. Prontuários e Fotos",
        text: "Anexe fotos de 'antes e depois' e preencha fichas de anamnese digitais. Tudo fica guardado na nuvem com total segurança.",
        image: "https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?q=80&w=800&auto=format&fit=crop",
        tip: "Manter prontuários organizados é fundamental para a segurança jurídica e qualidade do serviço."
      }
    ]
  },
  "configurar-horarios": {
    title: "Configurando sua Jornada de Trabalho",
    description: "Defina seus horários de atendimento, folgas e períodos de descanso de forma flexível.",
    content: [
      {
        title: "1. Horário de Funcionamento",
        text: "Defina os horários de abertura e fechamento para cada dia da semana. Você pode configurar horários diferentes para o sábado, por exemplo.",
        image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?q=80&w=800&auto=format&fit=crop",
        tip: "Não esqueça de configurar os intervalos de almoço para não receber agendamentos nesses horários."
      },
      {
        title: "2. Exceções e Folgas",
        text: "Vai tirar férias ou emendar um feriado? Adicione exceções na agenda para bloquear agendamentos em datas específicas sem alterar seu horário padrão.",
        image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=800&auto=format&fit=crop",
        tip: "Configure exceções com antecedência para evitar cancelamentos de última hora."
      }
    ]
  },
  "tutorial-editor": {
    title: "Editor de Site: Otimizando para Conversão",
    description: "Transforme sua página de agendamento em uma máquina de vendas com técnicas de design.",
    content: [
      {
        title: "1. Personalização Visual",
        text: "O editor permite alterar cores, fontes e banners em tempo real. Escolha uma paleta que reflita a identidade visual da sua marca.",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop",
        tip: "Cores sóbrias transmitem mais profissionalismo em áreas de saúde e estética."
      },
      {
        title: "2. Seção de Serviços e Galeria",
        text: "Organize seus serviços por categorias e adicione fotos reais do seu trabalho na galeria. Isso ajuda o cliente a decidir o que agendar.",
        image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop",
        tip: "Use fotos com boa iluminação. O visual é o que mais converte no agendamento online."
      },
      {
        title: "3. Depoimentos e Social",
        text: "Adicione provas sociais para passar confiança. Vincule seu Instagram para que os clientes vejam suas atualizações mais recentes.",
        image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=800&auto=format&fit=crop",
        tip: "Peça para seus melhores clientes um depoimento curto e coloque-o em destaque."
      }
    ]
  },
  "gestao-estoque": {
    title: "Gestão de Estoque e Conversão Operacional",
    description: "Vá além da contagem: aprenda como o estoque impacta diretamente na sua lucratividade.",
    content: [
      {
        title: "1. Cadastro de Produtos",
        text: "Registre cada item com preço de custo, preço de venda e quantidade mínima. Isso evita que você fique sem material essencial.",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
        tip: "Configure o 'Estoque Mínimo' para receber alertas automáticos de reposição."
      },
      {
        title: "2. Movimentações e Consumo",
        text: "Registre entradas de fornecedores e saídas por venda ou uso interno. O sistema calcula automaticamente o valor total do seu patrimônio em produtos.",
        image: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=800&auto=format&fit=crop",
        tip: "Faça uma conferência física mensal (inventário) para garantir que o sistema bate com a prateleira."
      }
    ]
  },
  "conceitos-financeiro": {
    title: "Inteligência Financeira: Do Fluxo ao Lucro Real",
    description: "Domine seu fluxo de caixa e entenda o lucro real do seu negócio com dados estratégicos.",
    content: [
      {
        title: "1. Fluxo de Caixa Diário",
        text: "Registre todas as receitas de atendimentos e despesas como aluguel e luz. Tenha uma visão clara de quanto dinheiro entra e sai todo dia.",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop",
        tip: "Categorize suas despesas (Fixo vs Variável) para entender onde você pode economizar."
      },
      {
        title: "2. Relatórios de Lucratividade",
        text: "Analise quais serviços trazem mais margem e quais profissionais são mais produtivos. O lucro real é o que sobra após pagar todos os custos.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
        tip: "Não confunda faturamento com lucro. Acompanhe sua margem de contribuição mensal."
      }
    ]
  },
  "notificacoes-automaticas": {
    title: "Configurando notificações automáticas",
    description: "Ative alertas de navegador para nunca mais perder um novo agendamento.",
    content: [
      {
        title: "1. Configuração de Alertas",
        text: "Vá em configurações de perfil e ative as notificações push. Isso permitirá que o Aura te avise mesmo se a aba do sistema estiver fechada.",
        image: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?q=80&w=800&auto=format&fit=crop",
        tip: "Lembre-se de clicar em 'Permitir' no pop-up do seu navegador (Chrome/Safari/Edge)."
      },
      {
        title: "2. Tipos de Notificação",
        text: "Escolha receber avisos para: Novos Agendamentos, Cancelamentos de Clientes e Lembretes de Estoque Baixo.",
        image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=800&auto=format&fit=crop",
        tip: "Ative também o som das notificações para não perder nada enquanto atende."
      }
    ]
  }
};

export default function TutorialContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [currentStep, setCurrentStep] = useState(0);
  const tutorial = tutorialData[slug as keyof typeof tutorialData];

  if (!tutorial) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Tutorial não encontrado</h1>
          <Link href="/tutorials">
            <Button variant="outline">Voltar para tutoriais</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isLastStep = currentStep === tutorial.content.length - 1;

  return (
    <main className="min-h-screen bg-background">
      {/* Header Fixo */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/tutorials">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="hidden sm:block">
              <h1 className="text-sm font-semibold truncate max-w-50 lg:max-w-md">
                {tutorial.title}
              </h1>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Passo {currentStep + 1} de {tutorial.content.length}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> 5 min restantes
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bookmark className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Share2 className="h-5 w-5" />
            </Button>
            <div className="h-8 w-px bg-border mx-2 hidden sm:block" />
            <Link href="/register">
              <Button size="sm" className="hidden sm:flex">
                Começar a usar agora
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Barra de Progresso */}
        <div className="h-1 w-full bg-muted">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${((currentStep + 1) / tutorial.content.length) * 100}%` }}
          />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Coluna de Conteúdo Principal */}
            <div className="lg:col-span-8 space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5">
                  PASSO {currentStep + 1}
                </Badge>
                <h2 className="text-3xl font-bold tracking-tight text-foreground">
                  {tutorial.content[currentStep].title}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {tutorial.content[currentStep].text}
                </p>
              </div>

              {/* Área da Imagem/Print */}
              {tutorial.content[currentStep].image && (
                <div className="rounded-2xl overflow-hidden border border-border bg-muted/30 shadow-sm">
                  <img 
                    src={tutorial.content[currentStep].image} 
                    alt={tutorial.content[currentStep].title}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}

              {/* Card de Dica */}
              <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 flex gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Lightbulb className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-1 text-sm uppercase tracking-wider">Dica Aura</h4>
                  <p className="text-muted-foreground text-sm">
                    {tutorial.content[currentStep].tip}
                  </p>
                </div>
              </div>

              {/* Navegação entre passos */}
              <div className="flex items-center justify-between pt-8 border-t">
                <Button
                  variant="ghost"
                  onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                  disabled={currentStep === 0}
                  className="gap-2"
                >
                  Anterior
                </Button>

                <div className="flex gap-2">
                  {!isLastStep ? (
                    <Button 
                      onClick={() => setCurrentStep(prev => Math.min(tutorial.content.length - 1, prev + 1))}
                      className="gap-2"
                    >
                      Próximo passo
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Link href="/register">
                      <Button className="gap-2 bg-green-600 hover:bg-green-700">
                        Finalizar e Criar Conta
                        <CheckCircle2 className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar de Progresso */}
            <aside className="lg:col-span-4 space-y-8 hidden lg:block">
              <div className="sticky top-28 space-y-6">
                <div className="bg-muted/30 rounded-2xl p-6 border">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Conteúdo do Tutorial
                  </h3>
                  <div className="space-y-1">
                    {tutorial.content.map((step, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentStep(index)}
                        className={cn(
                          "w-full text-left px-4 py-3 rounded-lg text-sm transition-all flex items-center gap-3",
                          currentStep === index 
                            ? "bg-primary text-primary-foreground font-medium shadow-md" 
                            : "hover:bg-muted text-muted-foreground"
                        )}
                      >
                        <span className={cn(
                          "h-6 w-6 rounded-full flex items-center justify-center text-[10px] border",
                          currentStep === index 
                            ? "bg-primary-foreground/20 border-transparent" 
                            : "bg-background border-border"
                        )}>
                          {index + 1}
                        </span>
                        {step.title}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-linear-to-br from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20">
                  <h4 className="font-bold mb-2">Pronto para começar?</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Coloque em prática o que aprendeu e transforme seu negócio hoje mesmo.
                  </p>
                  <Link href="/register">
                    <Button className="w-full">Criar minha conta grátis</Button>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
