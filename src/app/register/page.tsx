"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Calendar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    studioName: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("🚀 Enviando dados para o backend:", {
        url: `${process.env.NEXT_PUBLIC_API_URL}/users`,
        data: formData
      });

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("📡 Resposta do servidor (status):", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("❌ Erro retornado pelo backend:", errorData);
        throw new Error(errorData.message || "Erro ao criar conta");
      }

      const data = await response.json().catch(() => ({}));
      console.log("✅ Dados recebidos com sucesso:", data);
      
      toast.success("Conta criada com sucesso!", {
        description: "Você será redirecionado para o seu dashboard.",
      });

      // Limpar formulário
      setFormData({ name: "", studioName: "", email: "", password: "" });
      
      // Redirecionar para o Dashboard do Cliente (URL com Subdomínio)
      setTimeout(() => {
        // Tentativa de capturar o slug de diferentes estruturas possíveis (result.business.slug ou result.slug)
        const slug = data.business?.slug || data.slug;
        
        console.log("🔗 Preparando redirecionamento para o slug:", slug);

        if (slug) {
          // Redirecionamento via Path (Evita problemas de DNS/Conexão com subdomínios em local)
          // URL: http://localhost:3000/${slug}/admin/dashboard/overview
          const pathUrl = `http://localhost:3000/${slug}/admin/dashboard/overview`;

          console.log("🚀 Redirecionando para:", pathUrl);
          window.location.href = pathUrl;
        } else {
          // Fallback total caso não venha nenhum identificador
          const fallbackUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL || "http://localhost:3000/admin/dashboard";
          console.log("⚠️ Slug não encontrado, usando fallback:", fallbackUrl);
          window.location.href = fallbackUrl;
        }
      }, 1500);

    } catch (error) {
      toast.error("Erro no cadastro", {
        description: error instanceof Error ? error.message : "Ocorreu um erro inesperado",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col items-center justify-center p-4">
      <div className="mb-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
          <Calendar className="h-8 w-8 text-primary" />
          <span>StudioManager</span>
        </Link>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Criar sua conta</CardTitle>
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
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="studioName">Nome do seu estabelecimento</Label>
              <Input
                id="studioName"
                placeholder="Ex: Studio Art & Beleza"
                required
                value={formData.studioName}
                onChange={(e) => setFormData({ ...formData, studioName: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Criando conta..." : "Criar conta"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-muted-foreground">
            Já possui uma conta?{" "}
            <Link href="#" className="text-primary hover:underline font-medium">
              Fazer login
            </Link>
          </div>
          <Link
            href="/"
            className="text-sm flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar para o início
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
