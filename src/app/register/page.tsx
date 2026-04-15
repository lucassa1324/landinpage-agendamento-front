"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { ensureAbsoluteUrl } from "@/lib/utils";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    email: "",
    phone: "",
    password: "",
    acceptedTerms: false,
  });

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

    if (!formData.acceptedTerms) {
      toast.error(
        "Você precisa aceitar os Termos de Uso e a Política de Privacidade para continuar."
      );
      return;
    }

    setLoading(true);

    // Preparar o payload para o backend conforme novas especificações
    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone.replace(/\D/g, ""),
      company_name: formData.companyName, // Enviando como company_name conforme solicitado
      studioName: formData.companyName, // Mantendo studioName para compatibilidade com o backend atual
      slug: generateSlug(formData.companyName),
      role: "ADMIN", // Definindo "ADMIN" por padrão para cadastros via Landing Page
      acceptedTerms: true,
      acceptedTermsAt: new Date().toISOString(),
    };

    console.log("🔍 Verificando dados antes do envio:", payload);

    try {
      // Usando caminho relativo para passar pelo Proxy (Next.js rewrites) e evitar CORS
      // Adicionando barra final para garantir match com o prefixo /users no Elysia
      const targetUrl = "/api/users/";

      console.log("🛠️ Chamada de API via Proxy:", {
        target: targetUrl,
        payload: payload,
      });

      const response = await fetch(targetUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("📡 Resposta do servidor (status):", response.status);

      if (!response.ok) {
        const responseText = await response.text();
        console.error("❌ Resposta bruta do erro:", responseText);

        let errorData;
        try {
          errorData = JSON.parse(responseText);
        } catch (e) {
          errorData = {
            message: responseText || "Erro desconhecido (não-JSON)",
          };
        }

        console.error("❌ Detalhes estruturados do erro:", {
          status: response.status,
          statusText: response.statusText,
          data: errorData,
        });
        throw new Error(
          errorData.message ||
            errorData.error ||
            `Erro ${response.status}: ao criar conta`
        );
      }

      const data = await response.json().catch(() => ({}));
      console.log("✅ Dados recebidos com sucesso:", data);

      toast.success("Conta criada com sucesso!", {
        description: "Você será redirecionado para o seu dashboard.",
      });

      // Limpar formulário
      setFormData({
        name: "",
        companyName: "",
        email: "",
        phone: "",
        password: "",
        acceptedTerms: false,
      });

      // Redirecionar diretamente para a URL definida na variável de ambiente
      setTimeout(() => {
        const dashboardUrl = ensureAbsoluteUrl(
          process.env.NEXT_PUBLIC_DASHBOARD_URL || "http://localhost:3000/admin"
        );

        console.log("🚀 Redirecionando para:", dashboardUrl);
        window.location.href = dashboardUrl;
      }, 1500);
    } catch (error) {
      toast.error("Erro no cadastro", {
        description:
          error instanceof Error ? error.message : "Ocorreu um erro inesperado",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-muted/30 flex min-h-screen flex-col items-center justify-center p-4">
      <div className="mb-8">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
          <Calendar className="text-primary h-8 w-8" />
          <span>StudioManager</span>
        </Link>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-2xl font-bold">
            Criar sua conta
          </CardTitle>
          <CardDescription className="text-center">
            Comece seus 14 dias de teste grátis hoje mesmo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                placeholder="Seu nome"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyName">Nome da Empresa</Label>
              <Input
                id="companyName"
                placeholder="Ex: Clínica Art & Beleza"
                required
                value={formData.companyName}
                onChange={(e) =>
                  setFormData({ ...formData, companyName: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone / WhatsApp</Label>
              <Input
                id="phone"
                placeholder="(99) 99999-9999"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            <div className="flex items-start gap-3 rounded-md border bg-muted/20 p-3">
              <input
                id="acceptedTerms"
                type="checkbox"
                className="mt-1 h-4 w-4 cursor-pointer rounded border-gray-300 text-primary focus:ring-primary"
                checked={formData.acceptedTerms}
                onChange={(e) =>
                  setFormData({ ...formData, acceptedTerms: e.target.checked })
                }
                disabled={loading}
              />
              <Label
                htmlFor="acceptedTerms"
                className="block cursor-pointer text-xs font-normal leading-relaxed text-muted-foreground"
              >
                Eu li e aceito os{" "}
                <Link
                  href="/termos-de-uso"
                  target="_blank"
                  className="font-medium text-primary underline underline-offset-4 hover:opacity-80"
                >
                  Termos de Uso
                </Link>{" "}
                e a{" "}
                <Link
                  href="/politica-de-privacidade"
                  target="_blank"
                  className="font-medium text-primary underline underline-offset-4 hover:opacity-80"
                >
                  Política de Privacidade
                </Link>
                .
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading || !formData.acceptedTerms}
            >
              {loading ? "Criando conta..." : "Criar conta"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-muted-foreground text-center text-sm">
            Já possui uma conta?{" "}
            <Link
              href={ensureAbsoluteUrl(
                process.env.NEXT_PUBLIC_DASHBOARD_URL ||
                  "http://localhost:3000/admin"
              )}
              className="text-primary font-medium hover:underline"
            >
              Fazer login
            </Link>
          </div>
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar para o início
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
