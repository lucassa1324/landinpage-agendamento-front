import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Política de Privacidade da plataforma Aura Manager.",
};

export default function PrivacyPolicyPage() {
  const updatedAt = "15/04/2026";

  return (
    <main className="bg-secondary/30 min-h-screen py-10">
      <div className="container mx-auto max-w-3xl px-4">
        <article className="bg-card space-y-6 rounded-xl border p-6 shadow-sm md:p-8">
          <header className="space-y-2">
            <h1 className="text-3xl font-bold">Política de Privacidade</h1>
            <p className="text-muted-foreground text-sm">
              Última atualização: {updatedAt}
            </p>
          </header>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">1. Dados Coletados</h2>
            <p className="text-muted-foreground text-sm leading-6">
              Coletamos dados necessários para criação de conta, autenticação,
              uso dos recursos, cobrança e suporte, como nome, e-mail, telefone
              e informações operacionais do negócio.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">2. Finalidade de Uso</h2>
            <p className="text-muted-foreground text-sm leading-6">
              Utilizamos os dados para viabilizar o funcionamento da plataforma,
              autenticar usuários, processar cobranças, melhorar os serviços e
              cumprir obrigações legais.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">3. Compartilhamento</h2>
            <p className="text-muted-foreground text-sm leading-6">
              Os dados podem ser compartilhados com provedores essenciais à
              operação, como serviços de pagamento e infraestrutura, sempre com
              finalidade legítima e proteção adequada.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">4. Segurança e Retenção</h2>
            <p className="text-muted-foreground text-sm leading-6">
              Adotamos medidas técnicas e administrativas para proteger dados
              pessoais. Mantemos as informações pelo período necessário para
              prestação do serviço e cumprimento legal.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">5. Direitos do Titular</h2>
            <p className="text-muted-foreground text-sm leading-6">
              Você pode solicitar atualização, correção ou exclusão de dados,
              observadas as bases legais aplicáveis e obrigações de retenção.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">6. Atualizações</h2>
            <p className="text-muted-foreground text-sm leading-6">
              Esta política pode ser atualizada periodicamente para refletir
              evoluções legais e operacionais. A versão vigente estará sempre
              disponível nesta página.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
