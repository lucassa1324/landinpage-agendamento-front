"use client";

import { useEffect, useState } from "react";
import { X, Maximize2 } from "lucide-react";
import { HeroPreview } from "./HeroPreview";
import { HeroPreset } from "@/lib/hero-presets";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroModalProps {
  preset: HeroPreset | null;
  isOpen: boolean;
  onClose: () => void;
}

export function HeroModal({ preset, isOpen, onClose }: HeroModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted || !preset || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Content */}
      <div className="relative w-full max-w-7xl bg-card rounded-3xl border border-border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Maximize2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground leading-none">
                {preset.variationName || "Variação"}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                Preview em Tamanho Real • {preset.niche}
              </p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8 bg-muted/10">
          <div className="max-w-6xl mx-auto">
            <HeroPreview 
              preset={preset} 
              showFontInfo={true} 
              isCard={false} 
            />
          </div>
        </div>

        {/* Footer Info */}
        <div className="p-4 border-t border-border bg-muted/30 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Tipografia</span>
              <span className="text-sm font-medium text-foreground">{preset.fontFamily || "Sans-serif"}</span>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Nicho</span>
              <span className="text-sm font-medium text-foreground capitalize">{preset.niche}</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground italic">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            Este é o componente real renderizado com dados dinâmicos
          </div>
        </div>
      </div>
    </div>
  );
}
