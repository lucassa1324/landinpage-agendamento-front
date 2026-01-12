import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Garante que uma URL seja absoluta (comece com http:// ou https://)
 * para evitar que o navegador a concatene com a URL atual.
 */
export function ensureAbsoluteUrl(url: string | undefined): string {
  if (!url) return "";
  
  // Remove espaços em branco
  let cleanUrl = url.trim();
  
  // Remove barra final se existir para evitar // na concatenação
  if (cleanUrl.endsWith("/")) {
    cleanUrl = cleanUrl.slice(0, -1);
  }
  
  // Se já tem protocolo, retorna
  if (cleanUrl.startsWith("http://") || cleanUrl.startsWith("https://")) {
    return cleanUrl;
  }
  
  // Se começar com //, adiciona https:
  if (cleanUrl.startsWith("//")) {
    return `https:${cleanUrl}`;
  }
  
  // Se for apenas um domínio (ex: api.exemplo.com), adiciona https://
  console.log(`[URL FIX] Transformando "${url}" em "https://${cleanUrl}"`);
  return `https://${cleanUrl}`;
}
