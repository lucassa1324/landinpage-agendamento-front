import Link from "next/link";
import { Calendar, Instagram, Facebook, Twitter, Phone } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function Footer() {
  const today = format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });

  return (
    <footer className="bg-muted/50 border-t py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <Calendar className="h-6 w-6 text-primary" />
              <span>Aura</span>
            </Link>
            <p className="text-muted-foreground max-w-sm mb-4">
              A solução completa para gestão de studios de beleza, tatuagem e barbearias. 
              Simplifique sua rotina e foque no que você faz de melhor.
            </p>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <a href="mailto:lucassa1324@gmail.com" className="hover:text-primary transition-colors">
                lucassa1324@gmail.com
              </a>
              <a href="https://wa.me/5583981448111" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-2">
                <Phone className="h-4 w-4" /> (83) 98144-8111
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4">Produto</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#features">Funcionalidades</Link></li>
              <li><Link href="#pricing">Preços</Link></li>
              <li><Link href="#">Demonstração</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Redes Sociais</h4>
            <div className="flex gap-4">
              <a href="https://wa.me/5583981448111" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Phone className="h-5 w-5" />
              </a>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Aura. Todos os direitos reservados.</p>
          <p className="mt-2 text-xs opacity-50">Acessado em: {today}</p>
        </div>
      </div>
    </footer>
  );
}
