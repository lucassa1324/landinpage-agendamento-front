"use client";

import Link from "next/link";
import { Menu, Calendar, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ensureAbsoluteUrl } from "@/lib/utils";

const navItems = [
  { name: "Início", href: "/" },
  { name: "Funcionalidades", href: "/#features" },
  { name: "Preços", href: "/#pricing" },
  { name: "Tutoriais", href: "/tutorials" },
  { name: "Exemplos", href: "/showcase" },
  { name: "Contato", href: "/#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-4 left-0 right-0 w-full z-50">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between bg-white/70 backdrop-blur-xl border border-white/20 rounded-full px-6 shadow-lg shadow-black/5">
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl tracking-tighter group transition-all">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">
              <Sparkles className="h-6 w-6 fill-current" />
            </div>
            <span className="text-foreground">Aura</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold text-muted-foreground hover:text-primary transition-all relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" className="rounded-full px-6 font-semibold" asChild>
              <Link href={ensureAbsoluteUrl(process.env.NEXT_PUBLIC_DASHBOARD_URL || "http://localhost:3000/admin")}>
                Entrar
              </Link>
            </Button>
            <Button className="rounded-full px-6 font-semibold shadow-lg shadow-primary/20 hover:scale-105 transition-transform" asChild>
              <Link href="/register">Começar Agora</Link>
            </Button>
          </div>

          {/* Mobile Nav Trigger */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="rounded-l-[2rem]">
                <div className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-semibold hover:text-primary transition-colors px-4 py-2 rounded-xl hover:bg-primary/5"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="pt-4 mt-4 border-t border-border space-y-3">
                    <Link
                      href={ensureAbsoluteUrl(process.env.NEXT_PUBLIC_DASHBOARD_URL || "http://localhost:3000/admin")}
                      className="flex items-center text-base font-medium text-muted-foreground hover:text-primary transition-colors px-4"
                      onClick={() => setIsOpen(false)}
                    >
                      Entrar na conta
                    </Link>
                    <Button asChild className="w-full rounded-full h-12">
                      <Link href="/register" onClick={() => setIsOpen(false)}>
                        Começar Agora
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
