"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  PlayCircle, 
  BookOpen, 
  Clock, 
  ChevronRight,
  Layout,
  Users,
  Calendar,
  Settings,
  BarChart3
} from "lucide-react";

const categories = [
  { name: "Todos", icon: Layout },
  { name: "Início Rápido", icon: PlayCircle },
  { name: "Agenda", icon: Calendar },
  { name: "Clientes", icon: Users },
  { name: "Financeiro", icon: BarChart3 },
  { name: "Configurações", icon: Settings },
];

const tutorials = [
  {
    id: 1,
    slug: "configurar-primeiro-negocio",
    title: "Como configurar seu primeiro negócio",
    description: "Aprenda a configurar o nome, horário de funcionamento e serviços básicos do seu negócio.",
    category: "Início Rápido",
    duration: "5 min",
    type: "Artigo",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    slug: "gestao-agendamentos",
    title: "Gestão de Agendamentos e Redução de Faltas",
    description: "Domine sua agenda e aprenda estratégias para reduzir o no-show em até 80%.",
    category: "Agenda",
    duration: "8 min",
    type: "Artigo",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    slug: "cadastrar-servicos",
    title: "Como cadastrar seus serviços",
    description: "Organize seu catálogo de serviços com preços, durações e categorias profissionais.",
    category: "Início Rápido",
    duration: "6 min",
    type: "Artigo",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    slug: "gerenciar-clientes",
    title: "Gestão de Clientes e Prontuários",
    description: "Mantenha o histórico completo de cada cliente e fidelize seu público com dados estratégicos.",
    category: "Clientes",
    duration: "7 min",
    type: "Artigo",
    image: "https://images.unsplash.com/photo-1556745753-b2904692b3cd?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    slug: "configurar-horarios",
    title: "Configurando sua Jornada de Trabalho",
    description: "Defina seus horários de atendimento, folgas e períodos de descanso de forma flexível.",
    category: "Agenda",
    duration: "4 min",
    type: "Artigo",
    image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 7,
    slug: "tutorial-editor",
    title: "Editor de Site: Otimizando para Conversão",
    description: "Transforme sua página de agendamento em uma máquina de vendas com técnicas de design.",
    category: "Configurações",
    duration: "10 min",
    type: "Artigo",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 8,
    slug: "gestao-estoque",
    title: "Gestão de Estoque e Conversão Operacional",
    description: "Vá além da contagem: aprenda como o estoque impacta diretamente na sua lucratividade.",
    category: "Configurações",
    duration: "12 min",
    type: "Artigo",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 9,
    slug: "conceitos-financeiro",
    title: "Inteligência Financeira: Do Fluxo ao Lucro Real",
    description: "Domine seu fluxo de caixa e entenda o lucro real do seu negócio com dados estratégicos.",
    category: "Financeiro",
    duration: "15 min",
    type: "Artigo",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 10,
    slug: "notificacoes-automaticas",
    title: "Configurando notificações automáticas",
    description: "Ative alertas de navegador para nunca mais perder um novo agendamento.",
    category: "Agenda",
    duration: "3 min",
    type: "Artigo",
    image: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?q=80&w=800&auto=format&fit=crop",
  },
];

export default function TutorialsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredTutorials = tutorials.filter((tutorial) => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutorial.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || tutorial.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="grow pt-32 pb-24">
        {/* Header Section */}
        <section className="container mx-auto px-4 mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Central de Tutoriais</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Tudo o que você precisa saber para dominar a plataforma Aura e escalar seu negócio.
          </p>
          
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="O que você deseja aprender hoje?" 
              className="pl-10 py-6 text-lg rounded-full border-primary/20 focus-visible:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </section>

        {/* Categories Section */}
        <section className="container mx-auto px-4 mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Button
                  key={cat.name}
                  variant={selectedCategory === cat.name ? "default" : "outline"}
                  className="rounded-full gap-2 px-6"
                  onClick={() => setSelectedCategory(cat.name)}
                >
                  <Icon className="h-4 w-4" />
                  {cat.name}
                </Button>
              );
            })}
          </div>
        </section>

        {/* Tutorials Grid */}
        <section className="container mx-auto px-4">
          {filteredTutorials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTutorials.map((tutorial) => (
                <Card key={tutorial.id} className="group overflow-hidden border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg flex flex-col">
                  <Link href={`/tutorials/${tutorial.slug}`} className="flex flex-col h-full">
                    <div className="relative aspect-video overflow-hidden">
                      <img 
                        src={tutorial.image} 
                        alt={tutorial.title}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3">
                        <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm gap-1">
                          {tutorial.type === "Vídeo" ? <PlayCircle className="h-3 w-3" /> : <BookOpen className="h-3 w-3" />}
                          {tutorial.type}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="grow">
                      <div className="flex items-center gap-2 text-xs text-primary font-medium mb-2">
                        <Badge variant="outline" className="text-[10px] uppercase tracking-wider font-bold">
                          {tutorial.category}
                        </Badge>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {tutorial.duration}
                        </span>
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
                        {tutorial.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-3">
                        {tutorial.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex w-full justify-between items-center group/btn hover:bg-primary/5 h-auto py-2 transition-colors">
                        <span className="text-sm font-semibold">Começar Tutorial</span>
                        <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">Nenhum tutorial encontrado para "{searchTerm}"</p>
              <Button 
                variant="link" 
                onClick={() => {setSearchTerm(""); setSelectedCategory("Todos");}}
                className="mt-2"
              >
                Limpar filtros
              </Button>
            </div>
          )}
        </section>

        {/* Support Section */}
        <section className="container mx-auto px-4 mt-24">
          <Card className="bg-primary/5 border-none p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ainda precisa de ajuda?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Nossa equipe de suporte está disponível para tirar todas as suas dúvidas e ajudar você a configurar sua conta.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/#contact">Falar com Suporte</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="https://wa.me/5583981448111" target="_blank" rel="noopener noreferrer">
                  WhatsApp Direto
                </a>
              </Button>
            </div>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
}
