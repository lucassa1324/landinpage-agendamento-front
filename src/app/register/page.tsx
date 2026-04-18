"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ensureAbsoluteUrl } from "@/lib/utils";

function getPasswordStrength(password: string) {
  const checks = {
    minLength: password.length >= 8,
    hasLower: /[a-z]/.test(password),
    hasUpper: /[A-Z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecial: /[^A-Za-z0-9]/.test(password),
  };

  const score = Object.values(checks).filter(Boolean).length;

  if (!password) {
    return {
      score: 0,
      label: "Muito fraca",
      colorClass: "bg-muted",
      checks,
    };
  }

  if (score <= 2) {
    return {
      score,
      label: "Fraca",
      colorClass: "bg-red-500",
      checks,
    };
  }

  if (score === 3) {
    return {
      score,
      label: "Média",
      colorClass: "bg-amber-500",
      checks,
    };
  }

  if (score === 4) {
    return {
      score,
      label: "Forte",
      colorClass: "bg-lime-500",
      checks,
    };
  }

  return {
    score,
    label: "Muito forte",
    colorClass: "bg-emerald-500",
    checks,
  };
}

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    email: "",
    phone: "",
    password: "",
    acceptedTerms: false,
  });
  const passwordStrength = getPasswordStrength(formData.password);
  const isPasswordInvalid = hasTriedSubmit && passwordStrength.score < 3;
  const isTermsInvalid = hasTriedSubmit && !formData.acceptedTerms;

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-")
      .trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasTriedSubmit(true);

    if (!formData.acceptedTerms) {
      toast.error(
        "Você precisa aceitar os Termos de Uso e a Política de Privacidade para continuar."
      );
      return;
    }

    if (passwordStrength.score < 3) {
      toast.error("Sua senha está muito fraca.", {
        description:
          "Use ao menos 8 caracteres e combine letras maiúsculas, minúsculas, números e símbolos.",
      });
      return;
    }

    setLoading(true);

    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone.replace(/\D/g, ""),
      company_name: formData.companyName,
      studioName: formData.companyName,
      slug: generateSlug(formData.companyName),
      role: "ADMIN",
      acceptedTerms: true,
      acceptedTermsAt: new Date().toISOString(),
    };

    try {
      const targetUrl = "/api/users/";
      const response = await fetch(targetUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const responseText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(responseText);
        } catch (e) {
          errorData = {
            message: responseText || "Erro desconhecido",
          };
        }
        throw new Error(errorData.message || "Erro ao realizar cadastro.");
      }

      toast.success("Conta criada com sucesso!", {
        description: "Você será redirecionado para o painel de controle.",
      });

      setTimeout(() => {
        window.location.href = ensureAbsoluteUrl(
          process.env.NEXT_PUBLIC_DASHBOARD_URL || "http://localhost:3000/admin"
        );
      }, 2000);
    } catch (error: any) {
      toast.error("Ocorreu um erro no cadastro", {
        description: error.message || "Tente novamente em alguns minutos.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background relative overflow-hidden flex flex-col lg:flex-row">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-linear-to-l from-primary/5 to-transparent blur-3xl opacity-50" />
      
      {/* Left side - Brand/Empowerment */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 bg-muted/30 border-r border-border/50 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-primary/5 blur-3xl rounded-full" />
        
        <Link href="/" className="flex items-center gap-2 font-bold text-3xl tracking-tighter relative z-10 group transition-all">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">
            <Sparkles className="h-6 w-6 fill-current" />
          </div>
          <span className="text-foreground">Aura</span>
        </Link>

        <div className="relative z-10 space-y-8 max-w-lg">
          <h1 className="text-5xl font-bold tracking-tight leading-[1.1]">
            Comece hoje sua jornada de <span className="text-primary italic">sucesso</span> e empoderamento.
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Junte-se a milhares de especialistas que transformaram a gestão de seus estúdios com a Aura. 
            Elegância, simplicidade e controle na palma da sua mão.
          </p>
          
          <div className="space-y-6 pt-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-bold text-lg">Teste Grátis por 7 dias</p>
                <p className="text-muted-foreground">Experimente todas as funcionalidades premium.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-bold text-lg">Configuração em 2 minutos</p>
                <p className="text-muted-foreground">Interface intuitiva para você começar agora.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-sm text-muted-foreground font-medium italic">
          &quot;Onde a beleza encontra a tecnologia.&quot;
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-24 overflow-y-auto">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden text-center mb-12">
            <Link href="/" className="inline-flex items-center gap-2 font-bold text-3xl tracking-tighter">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-lg">
                <Sparkles className="h-6 w-6 fill-current" />
              </div>
              <span className="text-foreground">Aura</span>
            </Link>
          </div>

          <div className="space-y-2 text-center lg:text-left">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline mb-4 group">
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Voltar para o início
            </Link>
            <h2 className="text-3xl font-bold tracking-tight">Crie sua conta</h2>
            <p className="text-muted-foreground text-lg">Comece seu teste gratuito agora mesmo.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 pt-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-bold ml-1">Seu Nome Completo</Label>
              <Input
                id="name"
                placeholder="Ex: Maria Silva"
                required
                className="h-14 rounded-2xl bg-muted/50 border-none focus-visible:ring-2 focus-visible:ring-primary text-base"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-sm font-bold ml-1">Nome do seu Estúdio/Negócio</Label>
              <Input
                id="companyName"
                placeholder="Ex: Studio Aura"
                required
                className="h-14 rounded-2xl bg-muted/50 border-none focus-visible:ring-2 focus-visible:ring-primary text-base"
                value={formData.companyName}
                onChange={(e) =>
                  setFormData({ ...formData, companyName: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-bold ml-1">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                required
                className="h-14 rounded-2xl bg-muted/50 border-none focus-visible:ring-2 focus-visible:ring-primary text-base"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-bold ml-1">Telefone / WhatsApp</Label>
              <Input
                id="phone"
                placeholder="(99) 99999-9999"
                required
                className="h-14 rounded-2xl bg-muted/50 border-none focus-visible:ring-2 focus-visible:ring-primary text-base"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-bold ml-1">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                className={`h-14 rounded-2xl border-none focus-visible:ring-2 text-base ${
                  isPasswordInvalid
                    ? "bg-red-50/40 ring-2 ring-red-500/60 focus-visible:ring-red-500"
                    : "bg-muted/50 focus-visible:ring-primary"
                }`}
                aria-invalid={isPasswordInvalid}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Nível de segurança</span>
                  <span className="font-semibold text-foreground">{passwordStrength.label}</span>
                </div>
                <div className="grid grid-cols-5 gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div
                      key={index}
                      className={`h-1.5 rounded-full transition-colors ${
                        index < passwordStrength.score
                          ? passwordStrength.colorClass
                          : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
                  <li>{passwordStrength.checks.minLength ? "✓" : "•"} 8+ caracteres</li>
                  <li>{passwordStrength.checks.hasUpper ? "✓" : "•"} Letra maiúscula</li>
                  <li>{passwordStrength.checks.hasLower ? "✓" : "•"} Letra minúscula</li>
                  <li>{passwordStrength.checks.hasNumber ? "✓" : "•"} Número</li>
                  <li>{passwordStrength.checks.hasSpecial ? "✓" : "•"} Caractere especial</li>
                </ul>
                {isPasswordInvalid && (
                  <p className="text-xs font-medium text-red-600">
                    Sua senha precisa estar pelo menos no nível médio para continuar.
                  </p>
                )}
              </div>
            </div>

            <div
              className={`flex items-center space-x-3 rounded-xl border px-3 py-3 transition-colors ${
                isTermsInvalid
                  ? "border-red-500/70 bg-red-50/40"
                  : "border-transparent"
              }`}
            >
              <input
                type="checkbox"
                id="terms"
                className={`w-5 h-5 rounded-md text-primary focus:ring-primary accent-primary ${
                  isTermsInvalid ? "border-red-500" : "border-primary"
                }`}
                aria-invalid={isTermsInvalid}
                checked={formData.acceptedTerms}
                onChange={(e) =>
                  setFormData({ ...formData, acceptedTerms: e.target.checked })
                }
              />
              <Label htmlFor="terms" className="text-sm font-medium leading-relaxed">
                Eu aceito os{" "}
                <Link href="/termos-de-uso" className="text-primary font-bold hover:underline">
                  Termos de Uso
                </Link>{" "}
                e a{" "}
                <Link href="/politica-de-privacidade" className="text-primary font-bold hover:underline">
                  Política de Privacidade
                </Link>
              </Label>
            </div>
            {isTermsInvalid && (
              <p className="-mt-2 text-xs font-medium text-red-600">
                Você precisa aceitar os Termos de Uso e a Política de Privacidade.
              </p>
            )}

            <Button
              type="submit"
              className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              disabled={loading}
            >
              {loading ? "Criando conta..." : "Criar Minha Conta"}
            </Button>
          </form>

          <p className="text-center text-muted-foreground font-medium pt-4">
            Já tem uma conta?{" "}
            <Link
              href={ensureAbsoluteUrl(
                process.env.NEXT_PUBLIC_DASHBOARD_URL || "http://localhost:3000/admin"
              )}
              className="text-primary font-bold hover:underline"
            >
              Entrar agora
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
