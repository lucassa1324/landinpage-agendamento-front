"use client";

import { 
  Sparkles, 
  Star, 
  Heart, 
  Crown, 
  Flower2, 
  Moon, 
  Sun, 
  Gem, 
  Smile, 
  Award,
  type LucideIcon 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HeroPreset } from "@/lib/hero-presets";

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Star,
  Heart,
  Crown,
  Flower2,
  Moon,
  Sun,
  Gem,
  Smile,
  Award,
};

interface HeroPreviewProps {
  preset: HeroPreset;
  showFontInfo?: boolean;
  isCard?: boolean;
}

export function HeroPreview({ preset, showFontInfo = false, isCard = false }: HeroPreviewProps) {
  const Icon = preset.badgeIcon ? iconMap[preset.badgeIcon] : null;

  const fontClasses = {
    sans: "font-sans",
    serif: "font-serif",
    montserrat: "font-montserrat",
    lora: "font-lora",
    syne: "font-syne",
    bebas: "font-bebas",
    space: "font-space",
    poppins: "font-poppins",
    cinzel: "font-cinzel",
  };

  const fontNames = {
    sans: "Geist Sans (Padrão)",
    serif: "Playfair Display",
    montserrat: "Montserrat",
    lora: "Lora",
    syne: "Syne",
    bebas: "Bebas Neue",
    space: "Space Grotesk",
    poppins: "Poppins",
    cinzel: "Cinzel",
  };

  const titleSizeClasses = {
    sm: isCard ? "text-xl" : "text-3xl md:text-5xl lg:text-6xl",
    md: isCard ? "text-2xl" : "text-4xl md:text-6xl lg:text-7xl",
    lg: isCard ? "text-3xl" : "text-5xl md:text-7xl lg:text-8xl",
    xl: isCard ? "text-4xl" : "text-6xl md:text-8xl lg:text-9xl",
  };

  return (
    <section className={cn(
      "relative w-full flex items-center justify-center overflow-hidden transition-all duration-500",
      isCard ? "aspect-video rounded-xl shadow-lg border border-border/50" : "min-h-150 rounded-xl border border-border shadow-2xl",
      preset.fontFamily ? fontClasses[preset.fontFamily] : "font-sans"
    )}>
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {preset.bgType === "image" ? (
          <>
            <img 
              src={preset.bgImage} 
              alt={preset.title}
              className="w-full h-full object-cover transition-all duration-700"
            />
            <div className={cn("absolute inset-0 bg-black/60", isCard ? "" : "backdrop-blur-[2px]")} />
          </>
        ) : (
          <div 
            className="w-full h-full" 
            style={{ backgroundColor: preset.bgColor || "#000" }} 
          />
        )}
      </div>

      {/* Content */}
      <div className={cn(
        "relative z-10 container mx-auto text-center",
        isCard ? "px-4 py-8 max-w-full" : "px-6 py-20 max-w-4xl"
      )}>
        {/* Font Info Overlay (Showcase only) */}
        {showFontInfo && preset.fontFamily && (
          <div className={cn(
            "absolute z-20 bg-black/40 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-bold text-white/80 border border-white/10 flex items-center gap-2",
            isCard ? "top-2 left-2 px-2 py-0.5 text-[8px]" : "top-4 left-4"
          )}>
            <span className="uppercase tracking-widest text-primary/80">Fonte:</span>
            {fontNames[preset.fontFamily as keyof typeof fontNames]}
          </div>
        )}

        {/* Badge */}
        {preset.badge && (
          <div 
            className={cn(
              "inline-flex items-center gap-2 rounded-full font-bold animate-in fade-in slide-in-from-bottom-4 duration-500",
              isCard ? "px-2 py-0.5 text-[8px] mb-2" : "px-4 py-1.5 text-sm mb-8"
            )}
            style={{ 
              backgroundColor: preset.badgeColor || "rgba(255,255,255,0.1)",
              color: preset.badgeTextColor || "#fff"
            }}
          >
            {Icon && <Icon className={isCard ? "h-2 w-2" : "h-4 w-4"} />}
            <span className="uppercase tracking-wider">{preset.badge}</span>
          </div>
        )}

        {/* Title */}
        <h1 
          className={cn(
            "font-extrabold leading-tight tracking-tight text-white animate-in fade-in slide-in-from-bottom-6 duration-700",
            isCard ? "mb-2" : "mb-6",
            preset.titleSize ? titleSizeClasses[preset.titleSize] : titleSizeClasses.md
          )}
          style={{ color: preset.titleColor }}
        >
          {preset.title}
        </h1>

        {/* Subtitle */}
        {!isCard && (
          <p 
            className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000"
            style={{ color: preset.subtitleColor }}
          >
            {preset.subtitle}
          </p>
        )}

        {/* Buttons */}
        <div className={cn(
          "flex items-center justify-center animate-in fade-in slide-in-from-bottom-10 duration-1000",
          isCard ? "gap-2" : "flex-col sm:flex-row gap-4"
        )}>
          <Button 
            size={isCard ? "sm" : "lg"} 
            className={cn(
              "rounded-full font-bold transition-all shadow-lg",
              isCard ? "h-6 px-3 text-[8px]" : "h-14 px-10 text-lg hover:scale-105 active:scale-95"
            )}
            style={{ 
              backgroundColor: preset.primaryButtonColor || "var(--primary)",
              color: preset.primaryButtonTextColor || "#fff"
            }}
          >
            {preset.primaryButton}
          </Button>
          
          {!isCard && (
            <Button 
              variant="outline" 
              size="lg"
              className="h-14 px-10 rounded-full text-lg font-bold border-2 border-white/20 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 transition-all"
              style={{ 
                borderColor: preset.secondaryButtonColor ? `${preset.secondaryButtonColor}40` : "rgba(255,255,255,0.2)",
                color: preset.secondaryButtonTextColor || "#fff"
              }}
            >
              {preset.secondaryButton}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
