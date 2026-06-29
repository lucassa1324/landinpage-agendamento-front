import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Inter,
  Playfair_Display,
  Montserrat,
  Lora,
  Syne,
  Bebas_Neue,
  Space_Grotesk,
  Poppins,
  Cinzel,
} from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "700", "800"],
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aura | Sistema de Agendamento e Gestão para Estética.",
  description:
    "Organize sua agenda, gerencie clientes, controle o financeiro e crie landing pages com a Aura. Sistema completo para profissionais de estética, desde profissionais autônomos até grandes clínicas.",
  keywords: [
    "agenda online",
    "agendamento online",
    "sistema para estética",
    "software para salão de beleza",
    "gestão para clínicas",
    "controle financeiro",
    "sistema para barbearia",
    "sistema para tatuador",
    "landing page para estética",
    "aura",
  ],
  openGraph: {
    title: "Aura | Sistema de Agendamento e Gestão para Estética.",
    description:
      "Organize sua agenda, gerencie clientes, controle o financeiro e crie landing pages com a Aura. Sistema completo para profissionais de estética, desde profissionais autônomos até grandes clínicas.",
    type: "website",
    locale: "pt_BR",
    url: "https://aurasistema.com.br",
    siteName: "Aura | Sistema de Agendamento e Gestão para Estética.",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${playfair.variable} ${montserrat.variable} ${lora.variable} ${syne.variable} ${bebasNeue.variable} ${spaceGrotesk.variable} ${poppins.variable} ${cinzel.variable} antialiased`}
      >
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
