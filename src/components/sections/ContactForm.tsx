"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { format } from "date-fns";

interface Lead {
  name: string;
  email: string;
  studio: string;
  date: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    studio: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulando um envio de formulário
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newLead: Lead = {
      ...formData,
      date: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    };

    // Persistência no LocalStorage (como solicitado)
    const existingLeads = JSON.parse(localStorage.getItem("leads") || "[]");
    localStorage.setItem("leads", JSON.stringify([...existingLeads, newLead]));

    toast.success("Mensagem enviada com sucesso!", {
      description: "Nossa equipe entrará em contato em breve.",
    });

    setFormData({ name: "", email: "", studio: "" });
    setLoading(false);
  };

  return (
    <section id="contact" className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 -z-10 w-96 h-96 bg-primary/10 blur-3xl rounded-full translate-x-1/2 translate-y-1/2" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-left">
              <div className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider uppercase bg-primary/10 text-primary rounded-full">
                Vamos Conversar
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Pronto para transformar seu negócio?</h2>
              <p className="text-muted-foreground mb-10 text-lg leading-relaxed">
                Preencha o formulário ao lado e um de nossos especialistas entrará em contato para agendar uma demonstração personalizada e mostrar como a Aura pode empoderar sua marca.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-5 group">
                  <div className="h-14 w-14 rounded-2xl bg-white shadow-lg flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Send className="h-6 w-6 text-primary group-hover:text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">E-mail de Suporte</p>
                    <p className="text-muted-foreground font-medium">lucassa1324@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white/80 backdrop-blur-sm p-4 sm:p-8">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-3xl font-bold">Solicite um contato</CardTitle>
                <CardDescription className="text-base font-medium">Entraremos em contato em menos de 24 horas.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-bold ml-1">Nome Completo</Label>
                    <Input 
                      id="name" 
                      placeholder="Como podemos te chamar?" 
                      required 
                      className="h-14 rounded-2xl bg-muted/50 border-none focus-visible:ring-2 focus-visible:ring-primary"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-bold ml-1">E-mail Profissional</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="seu@email.com" 
                      required 
                      className="h-14 rounded-2xl bg-muted/50 border-none focus-visible:ring-2 focus-visible:ring-primary"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="studio" className="text-sm font-bold ml-1">Nome do seu Estúdio/Negócio</Label>
                    <Input 
                      id="studio" 
                      placeholder="Ex: Studio Aura" 
                      required 
                      className="h-14 rounded-2xl bg-muted/50 border-none focus-visible:ring-2 focus-visible:ring-primary"
                      value={formData.studio}
                      onChange={(e) => setFormData({ ...formData, studio: e.target.value })}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/30 transition-all hover:scale-[1.02] active:scale-[0.98]" 
                    disabled={loading}
                  >
                    {loading ? "Enviando..." : "Enviar Mensagem"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
