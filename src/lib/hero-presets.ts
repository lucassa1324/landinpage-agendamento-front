export interface HeroPreset {
  id: string;
  niche: string;
  variationName?: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeIcon?: string;
  primaryButton: string;
  secondaryButton: string;
  bgImage: string;
  bgColor?: string;
  bgType: "color" | "image";
  titleColor?: string;
  subtitleColor?: string;
  badgeColor?: string;
  badgeTextColor?: string;
  primaryButtonColor?: string;
  primaryButtonTextColor?: string;
  secondaryButtonColor?: string;
  secondaryButtonTextColor?: string;
  fontFamily?: "sans" | "serif" | "montserrat" | "lora" | "syne" | "bebas" | "space" | "poppins" | "cinzel";
  titleSize?: "sm" | "md" | "lg" | "xl";
}

// Vitrine enxuta: apenas alguns exemplos na landing
export const heroPresets: HeroPreset[] = [
  {
    "id": "sobrancelha-1",
    "niche": "Studio de Sobrancelha",
    "variationName": "Elegante & Minimalista",
    "title": "Olhar Marcante e Natural",
    "subtitle": "Especialistas em design de sobrancelhas e micropigmentação para realçar sua beleza única.",
    "badge": "Design Premium",
    "badgeIcon": "Sparkles",
    "primaryButton": "Agendar Agora",
    "secondaryButton": "Ver Galeria",
    "bgImage": "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1920&auto=format&fit=crop",
    "bgType": "image",
    "primaryButtonColor": "#d946ef",
    "badgeColor": "#fdf4ff",
    "badgeTextColor": "#a21caf",
    "fontFamily": "lora",
    "titleSize": "md"
  },
  {
    "id": "sobrancelha-2",
    "niche": "Studio de Sobrancelha",
    "variationName": "Moderno & Vibrante",
    "title": "Transforme seu Olhar hoje",
    "subtitle": "Técnicas avançadas de Brow Lamination e Design com Henna. Realce sua expressão facial.",
    "badge": "Nova Tendência",
    "badgeIcon": "Star",
    "primaryButton": "Quero Agendar",
    "secondaryButton": "Preços",
    "bgImage": "https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=1920&auto=format&fit=crop",
    "bgType": "image",
    "primaryButtonColor": "#86198f",
    "badgeColor": "#fae8ff",
    "badgeTextColor": "#701a75",
    "fontFamily": "montserrat",
    "titleSize": "lg"
  },
  {
    "id": "sobrancelha-3",
    "niche": "Studio de Sobrancelha",
    "variationName": "Luxo & Sofisticação",
    "title": "A Perfeição em Cada Traço",
    "subtitle": "Onde a arte encontra a beleza. Micropigmentação realista e design personalizado de alto padrão.",
    "badge": "VIP Experience",
    "badgeIcon": "Crown",
    "primaryButton": "Agendamento VIP",
    "secondaryButton": "Nossos Cases",
    "bgImage": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1920&auto=format&fit=crop",
    "bgType": "image",
    "primaryButtonColor": "#701a75",
    "badgeColor": "#fdf4ff",
    "badgeTextColor": "#701a75",
    "fontFamily": "serif",
    "titleSize": "xl"
  },
  {
    "id": "manicure-1",
    "niche": "Manicure e Pedicure",
    "variationName": "Delicado & Feminino",
    "title": "Suas Mãos Merecem esse Cuidado",
    "subtitle": "Unhas impecáveis com os melhores produtos e técnicas de esmaltação e alongamento.",
    "badge": "Cuidado e Higiene",
    "badgeIcon": "Heart",
    "primaryButton": "Marcar Horário",
    "secondaryButton": "Nossos Serviços",
    "bgImage": "https://images.unsplash.com/photo-1632345033840-202d0839c6ec?q=80&w=1920&auto=format&fit=crop",
    "bgType": "image",
    "primaryButtonColor": "#ec4899",
    "badgeColor": "#fdf2f8",
    "badgeTextColor": "#be185d",
    "fontFamily": "sans",
    "titleSize": "md"
  },
  {
    "id": "manicure-2",
    "niche": "Manicure e Pedicure",
    "variationName": "Luxuoso & Sofisticado",
    "title": "A Arte em suas Mãos",
    "subtitle": "Especialistas em Nail Art e blindagem. Experimente o luxo em cada detalhe das suas unhas.",
    "badge": "Nail Art Premium",
    "badgeIcon": "Gem",
    "primaryButton": "Agendamento VIP",
    "secondaryButton": "Inspirar-se",
    "bgImage": "https://images.unsplash.com/photo-1604654894610-df490c81726a?q=80&w=1920&auto=format&fit=crop",
    "bgType": "image",
    "primaryButtonColor": "#9d174d",
    "badgeColor": "#fdf2f8",
    "badgeTextColor": "#be185d",
    "fontFamily": "serif",
    "titleSize": "lg"
  },
  {
    "id": "manicure-3",
    "niche": "Manicure e Pedicure",
    "variationName": "Moderno & Bold",
    "title": "Unhas que Falam por Você",
    "subtitle": "Estilo urbano e cores vibrantes. Tendências mundiais em alongamento e decoração.",
    "badge": "Trend Alert",
    "badgeIcon": "Sparkles",
    "primaryButton": "Quero Esse Estilo",
    "secondaryButton": "Ver Fotos",
    "bgImage": "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=1920&auto=format&fit=crop",
    "bgType": "image",
    "primaryButtonColor": "#db2777",
    "badgeColor": "#fdf2f8",
    "badgeTextColor": "#db2777",
    "fontFamily": "space",
    "titleSize": "xl"
  },
  {
    "id": "clinica-1",
    "niche": "Clínicas em Geral",
    "variationName": "Médico & Profissional",
    "title": "Sua Saúde em Boas Mãos",
    "subtitle": "Equipe multidisciplinar pronta para oferecer o melhor atendimento e tecnologia médica.",
    "badge": "Atendimento Humanizado",
    "badgeIcon": "Award",
    "primaryButton": "Agendar Consulta",
    "secondaryButton": "Especialidades",
    "bgImage": "https://images.unsplash.com/photo-1629909608135-ca4679237617?q=80&w=1920&auto=format&fit=crop",
    "bgType": "image",
    "primaryButtonColor": "#0284c7",
    "badgeColor": "#f0f9ff",
    "badgeTextColor": "#0369a1",
    "fontFamily": "sans",
    "titleSize": "md"
  },
  {
    "id": "clinica-2",
    "niche": "Clínicas em Geral",
    "variationName": "Estética & Bem-estar",
    "title": "Tecnologia a Favor da sua Autoestima",
    "subtitle": "Tratamentos faciais e corporais personalizados com resultados reais e duradouros.",
    "badge": "Estética Avançada",
    "badgeIcon": "Sparkles",
    "primaryButton": "Avaliação Gratuita",
    "secondaryButton": "Ver Antes e Depois",
    "bgImage": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1920&auto=format&fit=crop",
    "bgType": "image",
    "primaryButtonColor": "#14b8a6",
    "badgeColor": "#f0fdfa",
    "badgeTextColor": "#0f766e",
    "fontFamily": "lora",
    "titleSize": "lg"
  },
  {
    "id": "clinica-3",
    "niche": "Clínicas em Geral",
    "variationName": "Inovação & Futuro",
    "title": "O Futuro da sua Saúde Hoje",
    "subtitle": "Medicina de precisão e exames avançados em um só lugar. Rapidez e confiança no diagnóstico.",
    "badge": "Tecnologia Médica",
    "badgeIcon": "Gem",
    "primaryButton": "Conhecer Clínica",
    "secondaryButton": "Agendar Exame",
    "bgImage": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1920&auto=format&fit=crop",
    "bgType": "image",
    "primaryButtonColor": "#0369a1",
    "badgeColor": "#f0f9ff",
    "badgeTextColor": "#0369a1",
    "fontFamily": "space",
    "titleSize": "xl"
  }
];
