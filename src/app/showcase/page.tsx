"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  Image as ImageIcon, 
  Calendar, 
  Users,
  ChevronRight,
  Layout,
  MousePointer2,
  Maximize2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { heroPresets, HeroPreset } from "@/lib/hero-presets";
import { HeroPreview } from "@/components/showcase/HeroPreview";
import { HeroModal } from "@/components/showcase/HeroModal";

const sections = [
  { 
    id: "home", 
    name: "Início", 
    icon: Sparkles,
    subsections: [
      { id: "hero", name: "Hero (Banner Principal)" },
      { id: "services", name: "Serviços" },
      { id: "values", name: "Diferenciais" },
      { id: "gallery-preview", name: "Preview Galeria" },
      { id: "cta", name: "Chamada (CTA)" },
    ]
  },
  { 
    id: "gallery", 
    name: "Galeria", 
    icon: ImageIcon,
    subsections: [
      { id: "gallery-grid", name: "Grade de Fotos" },
    ]
  },
  { 
    id: "booking", 
    name: "Agendar", 
    icon: Calendar,
    subsections: [
      { id: "booking-flow", name: "Fluxo de Agendamento" },
    ]
  },
  { 
    id: "about", 
    name: "Sobre Nós", 
    icon: Users,
    subsections: [
      { id: "about-hero", name: "Hero Sobre" },
      { id: "story", name: "Nossa História" },
      { id: "about-values", name: "Nossos Valores" },
      { id: "team", name: "Equipe" },
      { id: "testimonials", name: "Depoimentos" },
    ]
  },
];

export default function ShowcasePage() {
  const [activeMainSection, setActiveMainSection] = useState(sections[0].id);
  const [activeSubsection, setActiveSubsection] = useState(sections[0].subsections[0].id);
  const [selectedNiche, setSelectedNiche] = useState<string | null>(null);
  const [previewPreset, setPreviewPreset] = useState<HeroPreset | null>(null);

  // Get unique niches
  const uniqueNiches = Array.from(new Set(heroPresets.map(p => p.niche)));
  
  const filteredPresets = selectedNiche 
    ? heroPresets.filter(p => p.niche === selectedNiche)
    : heroPresets;
  const showcasePresets = filteredPresets.slice(0, selectedNiche ? 6 : 12);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12 flex flex-col lg:flex-row container mx-auto gap-8">
        {/* Navigation Menu */}
        <aside className="w-full lg:w-80 shrink-0 px-4 lg:px-0">
          <div className="sticky top-24 space-y-6">
            <div className="space-y-2">
              <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 px-4">
                Seções do Site Base
              </h2>
              <nav className="space-y-4">
                {sections.map((section) => {
                  const Icon = section.icon;
                  const isMainActive = activeMainSection === section.id;
                  
                  return (
                    <div key={section.id} className="space-y-1">
                      <Button
                        variant={isMainActive ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start gap-3 h-11 px-4 transition-all rounded-lg",
                          isMainActive 
                            ? "bg-primary/10 text-primary font-bold shadow-sm" 
                            : "hover:bg-primary/5 hover:text-primary"
                        )}
                        onClick={() => {
                          setActiveMainSection(section.id);
                          setActiveSubsection(section.subsections[0].id);
                        }}
                      >
                        <Icon className={cn("h-5 w-5", isMainActive ? "text-primary" : "text-muted-foreground")} />
                        <span className="flex-1 text-left">{section.name}</span>
                      </Button>

                      {/* Subsections */}
                      {isMainActive && (
                        <div className="ml-9 flex flex-col border-l-2 border-primary/20 pl-2 space-y-1 mt-1 animate-in slide-in-from-left-2 duration-200">
                          {section.subsections.map((sub) => (
                            <button
                              key={sub.id}
                              onClick={() => setActiveSubsection(sub.id)}
                              className={cn(
                                "text-sm py-2 px-3 rounded-md text-left transition-colors",
                                activeSubsection === sub.id
                                  ? "bg-primary text-primary-foreground font-medium shadow-sm"
                                  : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                              )}
                            >
                              {sub.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>

            {/* Niche Selector */}
            {activeSubsection === "hero" && (
              <div className="pt-6 border-t border-border space-y-4">
                <div className="flex items-center gap-2 px-4 mb-2">
                  <Layout className="h-4 w-4 text-primary" />
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                    Selecione o Nicho
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-1 max-h-100 overflow-y-auto pr-2 custom-scrollbar">
                  <button
                    onClick={() => setSelectedNiche(null)}
                    className={cn(
                      "text-left px-4 py-2.5 rounded-lg text-sm transition-all flex items-center gap-3",
                      selectedNiche === null
                        ? "bg-primary/10 text-primary font-bold border border-primary/20"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent"
                    )}
                  >
                    <div className={cn(
                      "h-2 w-2 rounded-full",
                      selectedNiche === null ? "bg-primary animate-pulse" : "bg-muted-foreground/30"
                    )} />
                    Exibir Todos
                  </button>

                  {uniqueNiches.map((niche) => {
                    const isActive = selectedNiche === niche;
                    
                    return (
                      <button
                        key={niche}
                        onClick={() => setSelectedNiche(niche)}
                        className={cn(
                          "text-left px-4 py-2.5 rounded-lg text-sm transition-all flex items-center gap-3",
                          isActive
                            ? "bg-primary/10 text-primary font-bold border border-primary/20"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent"
                        )}
                      >
                        <div className={cn(
                          "h-2 w-2 rounded-full",
                          isActive ? "bg-primary animate-pulse" : "bg-muted-foreground/30"
                        )} />
                        {niche}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Content Area */}
        <div className="flex-1 flex flex-col gap-6 px-4 lg:px-0">
          <div className="bg-muted/30 rounded-2xl p-6 border border-border/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-primary uppercase tracking-wider">Visualizando Exemplo</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-xs font-medium text-muted-foreground">Página {sections.find(s => s.id === activeMainSection)?.name}</span>
              </div>
              <h2 className="text-2xl font-bold">
                {sections.find(s => s.id === activeMainSection)?.subsections.find(sub => sub.id === activeSubsection)?.name}
              </h2>
            </div>
            
            {/* Variation Toggle Removed since we show all in grid */}
            
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-muted flex items-center justify-center">
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground font-medium">
                {heroPresets.length}+ variações disponíveis
              </p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Mostrando {showcasePresets.length} de {filteredPresets.length} templates para vitrine.
          </p>


          <div className={cn(
            "flex-1",
            activeSubsection === "hero" ? "" : "bg-card rounded-2xl border border-border/50 shadow-xl overflow-hidden min-h-150 relative group"
          )}>
            {activeSubsection === "hero" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
                {showcasePresets.map((preset) => (
                  <div 
                    key={preset.id} 
                    className="group relative cursor-pointer"
                    onClick={() => setPreviewPreset(preset)}
                  >
                    <div className="relative overflow-hidden rounded-xl border border-border/50 transition-all duration-300 group-hover:shadow-xl group-hover:border-primary/30 group-hover:-translate-y-1">
                      <HeroPreview preset={preset} showFontInfo={true} isCard={true} />
                      
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                        <div className="bg-white text-black px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                          <Maximize2 className="h-4 w-4" />
                          Ampliar Preview
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between px-2">
                      <div>
                        <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{preset.variationName || "Variação"}</h3>
                        <p className="text-[10px] text-muted-foreground">{preset.niche}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-medium bg-muted px-2 py-0.5 rounded text-muted-foreground uppercase tracking-tighter">
                          {preset.fontFamily}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full w-full flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
                <div className="h-20 w-20 rounded-full bg-primary/5 flex items-center justify-center mb-6">
                  <MousePointer2 className="h-10 w-10 text-primary/40" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Seção em Desenvolvimento</h3>
                <p className="max-w-md">
                  Estamos preparando exemplos incríveis para a seção de <span className="text-primary font-semibold">{sections.find(s => s.id === activeMainSection)?.subsections.find(sub => sub.id === activeSubsection)?.name}</span>.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-8 gap-2"
                  onClick={() => setActiveSubsection("hero")}
                >
                  <Sparkles className="h-4 w-4" />
                  Ver Exemplos de Hero
                </Button>
              </div>
            )}
            
            {/* Overlay Info */}
            <div className="absolute bottom-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 border border-white/10 shadow-2xl">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                DADOS REAIS DO COMPONENTE
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <HeroModal 
        preset={previewPreset} 
        isOpen={!!previewPreset} 
        onClose={() => setPreviewPreset(null)} 
      />
    </div>
  );
}
