"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ensureAbsoluteUrl } from "@/lib/utils";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    cpfCnpj: "",
    email: "",
    phone: "",
    password: "",
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
    setLoading(true);

    // Preparar o payload para o backend conforme novas especificações
    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone.replace(/\D/g, ""),
      cpfCnpj: formData.cpfCnpj.replace(/\D/g, ""),
      company_name: formData.companyName, // Enviando como company_name conforme solicitado
      studioName: formData.companyName, // Mantendo studioName para compatibilidade com o backend atual
      slug: generateSlug(formData.companyName),
      role: "ADMIN", // Definindo "ADMIN" por padrão para cadastros via Landing Page
    };

    console.log("🔍 Verificando dados antes do envio:", payload);

    try {
      // Usando caminho relativo para passar pelo Proxy (Next.js rewrites) e evitar CORS
      // Adicionando barra final para garantir match com o prefixo /users no Elysia
      const targetUrl = "/api/users/";

      console.log("🛠️ Chamada de API via Proxy:", {
        target: targetUrl,
        payload: payload
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
          errorData = { message: responseText || "Erro desconhecido (não-JSON)" };
        }
        
        console.error("❌ Detalhes estruturados do erro:", {
          status: response.status,
          statusText: response.statusText,
          data: errorData
        });
        throw new Error(errorData.message || errorData.error || `Erro ${response.status}: ao criar conta`);
      }

      const data = await response.json().catch(() => ({}));
      console.log("✅ Dados recebidos com sucesso:", data);
      
      toast.success("Conta criada com sucesso!", {
        description: "Você será redirecionado para o seu dashboard.",
      });

      // Limpar formulário
      setFormData({ name: "", companyName: "", cpfCnpj: "", email: "", phone: "", password: "" });
      
      // Redirecionar diretamente para a URL definida na variável de ambiente
      setTimeout(() => {
        const dashboardUrl = ensureAbsoluteUrl(process.env.NEXT_PUBLIC_DASHBOARD_URL || "http://localhost:3000/admin");
        
        console.log("🚀 Redirecionando para:", dashboardUrl);
        window.location.href = dashboardUrl;
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
              <Label htmlFor="companyName">Nome da Empresa</Label>
              <Input
                id="companyName"
                placeholder="Ex: Clínica Art & Beleza"
                required
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cpfCnpj">CPF</Label>
              <Input
                id="cpfCnpj"
                placeholder="Somente números"
                required
                value={formData.cpfCnpj}
                onChange={(e) => setFormData({ ...formData, cpfCnpj: e.target.value })}
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
              <Label htmlFor="phone">Telefone / WhatsApp</Label>
              <Input
                id="phone"
                placeholder="(99) 99999-9999"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
            <Link 
              href={ensureAbsoluteUrl(process.env.NEXT_PUBLIC_DASHBOARD_URL || "http://localhost:3000/admin")} 
              className="text-primary hover:underline font-medium"
            >
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
