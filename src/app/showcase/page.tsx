"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "../../components/ui/badge";
import { 
  Layout, 
  Calendar, 
  User, 
  Star, 
  CreditCard, 
  Columns,
  Eye,
  ArrowRight,
  ExternalLink,
  Sparkles
} from "lucide-react";
import Link from "next/link";

const categories = [
  { name: "Todos", icon: Layout },
  { name: "Hero", icon: Sparkles },
  { name: "Agendamento", icon: Calendar },
  { name: "Serviços", icon: Columns },
  { name: "Depoimentos", icon: Star },
  { name: "Preços", icon: CreditCard },
];

const showcases = [
  {
    id: 1,
    title: "Hero - Estilo Moderno Dark",
    description: "Uma seção de impacto com fundo escuro, gradientes e CTA em destaque. Ideal para barbearias e estúdios premium.",
    category: "Hero",
    image: "/tutorials/print-site.png",
    difficulty: "Fácil",
    tags: ["Dark Mode", "Gradient", "Premium"],
  },
  {
    id: 2,
    title: "Agendamento - Minimalista",
    description: "Interface de agendamento limpa, focada na conversão e facilidade de uso para o cliente final.",
    category: "Agendamento",
    image: "/tutorials/print-agenda.png",
    difficulty: "Média",
    tags: ["Clean", "Focus", "Fast"],
  },
  {
    id: 3,
    title: "Serviços - Grade de Cards",
    description: "Exibição de serviços em grade com fotos, preços e tempos de duração bem definidos.",
    category: "Serviços",
    image: "/tutorials/print-servico-registro.png",
    difficulty: "Fácil",
    tags: ["Grid", "Visual", "Info"],
  },
  {
    id: 4,
    title: "Depoimentos - Carrossel",
    description: "Prova social elegante para passar confiança aos seus clientes através de feedbacks reais.",
    category: "Depoimentos",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop",
    difficulty: "Média",
    tags: ["Social Proof", "Carousel"],
  },
  {
    id: 5,
    title: "Preços - Tabela Comparativa",
    description: "Destaque seus planos e pacotes de forma clara, ajudando o cliente a escolher a melhor opção.",
    category: "Preços",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop",
    difficulty: "Fácil",
    tags: ["Pricing", "Conversion"],
  },
  {
    id: 6,
    title: "Hero - Estilo Corporativo",
    description: "Design sóbrio e profissional para clínicas e consultórios que buscam autoridade.",
    category: "Hero",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=800&auto=format&fit=crop",
    difficulty: "Fácil",
    tags: ["Corporate", "Professional"],
  },
];

export default function ShowcasePage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredShowcases = showcases.filter((item) => {
    return selectedCategory === "Todos" || item.category === selectedCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="grow pt-32 pb-24">
        {/* Header Section */}
        <section className="container mx-auto px-4 mb-16 text-center">
          <Badge variant="outline" className="mb-4 py-1 px-4 text-primary border-primary/20">
            Inspiração & Design
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            Showcase de Exemplos
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            Explore diferentes variações e estilos de seções para o seu site. Veja como a Aura Pro pode transformar a sua vitrine online.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild className="rounded-full gap-2 px-8">
              <Link href="http://localhost:3000/admin">
                <Sparkles className="h-5 w-5" />
                Ver no Editor
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="rounded-full gap-2 px-8">
              <Link href="https://wa.me/5583981448111" target="_blank">
                Falar com Consultor
              </Link>
            </Button>
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

        {/* Showcase Grid */}
        <section className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredShowcases.map((item) => (
              <Card key={item.id} className="group overflow-hidden border-primary/10 hover:border-primary/30 transition-all hover:shadow-xl flex flex-col">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <Button variant="secondary" size="sm" className="gap-2">
                      <Eye className="h-4 w-4" />
                      Visualizar
                    </Button>
                    <Button variant="default" size="sm" className="gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Usar Modelo
                    </Button>
                  </div>
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-primary/90 backdrop-blur-sm">
                      {item.category}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {item.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="line-clamp-2 text-sm leading-relaxed">
                    {item.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="px-6 pb-6 pt-0 mt-auto">
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map(tag => (
                      <span key={tag} className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="container mx-auto px-4 mt-24">
          <div className="bg-primary/5 rounded-3xl p-12 border border-primary/10 text-center relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
            
            <h2 className="text-3xl font-bold mb-4">Gostou desses exemplos?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-lg">
              Comece agora mesmo a criar o seu site com a Aura Pro e tenha acesso a todos esses modelos e muito mais.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild className="rounded-full gap-2 px-10 group">
                <Link href="/register">
                  Começar Agora
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
