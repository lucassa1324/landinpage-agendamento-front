import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Twitter, Phone, Mail } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function Footer() {
  const today = format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });

  return (
    <footer className="bg-white border-t border-border/50 pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center gap-2 font-bold text-3xl mb-6 tracking-tighter">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg shadow-primary/20 overflow-hidden">
                <Image
                  src="/Aura-Logo-sem-fundo.png"
                  alt="Logo Aura"
                  width={42}
                  height={42}
                  className="object-contain"
                />
              </div>
              <span className="text-foreground">Aura</span>
            </Link>
            <p className="text-muted-foreground max-w-sm mb-8 text-lg leading-relaxed">
              A solução completa para gestão de negócios de beleza e estética. 
              Empoderamos profissionais para que foquem na sua arte, enquanto cuidamos de todo o resto.
            </p>
            <div className="flex flex-col gap-4">
              <a href="mailto:lucassa1324@gmail.com" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-all font-medium">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                  <Mail className="h-4 w-4" />
                </div>
                lucassa1324@gmail.com
              </a>
              <a href="https://wa.me/5583981448111" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-all font-medium">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                  <Phone className="h-4 w-4" />
                </div>
                (83) 98144-8111
              </a>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <h4 className="font-bold text-lg mb-6 uppercase tracking-widest text-foreground/70">Produto</h4>
            <ul className="space-y-4 text-base font-medium text-muted-foreground">
              <li><Link href="/#features" className="hover:text-primary transition-colors">Funcionalidades</Link></li>
              <li><Link href="/#pricing" className="hover:text-primary transition-colors">Preços</Link></li>
              <li><Link href="/tutorials" className="hover:text-primary transition-colors">Tutoriais</Link></li>
              <li><Link href="/showcase" className="hover:text-primary transition-colors">Exemplos</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-bold text-lg mb-6 uppercase tracking-widest text-foreground/70">Legal</h4>
            <ul className="space-y-4 text-base font-medium text-muted-foreground">
              <li><Link href="/termos-de-uso" className="hover:text-primary transition-colors">Termos de Uso</Link></li>
              <li><Link href="/politica-de-privacidade" className="hover:text-primary transition-colors">Política de Privacidade</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-bold text-lg mb-6 uppercase tracking-widest text-foreground/70">Redes Sociais</h4>
            <div className="flex gap-4">
              <Link href="#" className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all shadow-sm">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="#" className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all shadow-sm">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all shadow-sm">
                <Twitter className="h-6 w-6" />
              </Link>
            </div>
            <p className="mt-8 text-sm text-muted-foreground font-medium italic">
              &quot;Beleza é a iluminação da alma.&quot;
            </p>
          </div>
        </div>
        
        <div className="border-t border-border/50 pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground font-medium">
          <p>© {new Date().getFullYear()} Aura. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <p className="opacity-50">Acessado em: {today}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
