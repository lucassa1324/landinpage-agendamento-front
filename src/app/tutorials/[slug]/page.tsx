"use client";

import { useState, use } from "react";
import { 
  ArrowLeft, 
  Clock, 
  ChevronRight, 
  Lightbulb, 
  CheckCircle2, 
  BookOpen,
  Share2,
  Bookmark,
  ZoomIn,
  X
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { cn } from "@/lib/utils";

// Interfaces para tipagem
interface TutorialStep {
  title: string;
  text: string;
  checklist?: string[];
  image: string;
  tip: string;
}

interface Tutorial {
  title: string;
  description: string;
  content: TutorialStep[];
}

// Dados completos dos tutoriais
const tutorialData: Record<string, Tutorial> = {
  "configurar-primeiro-negocio": {
    title: "Configuração Estratégica: O Início do Sucesso",
    description: "Um guia passo a passo completo para você tirar sua empresa do papel e começar a agendar. Configuraremos juntos o perfil, horários e seus primeiros serviços.",
    content: [
      {
        title: "1. Visão Geral do Painel",
        text: "O seu dashboard é o coração do seu negócio. Aqui você acompanha agendamentos, faturamento e o status da sua agenda em tempo real.",
        checklist: [
          "Acesse o menu 'Início' para ver o resumo do dia.",
          "Verifique o gráfico de agendamentos na seção central.",
          "Identifique os botões de atalho no topo para ações rápidas.",
          "Observe a barra de progresso da configuração inicial."
        ],
        image: "/tutorials/print-site.png",
        tip: "Fique de olho no card 'Status da Agenda' para garantir que seus clientes consigam agendar horários."
      },
      {
        title: "2. Identidade e Reconhecimento",
        text: "O nome do seu negócio e sua logo são sua marca. Configure as informações básicas e dados de contato.",
        checklist: [
          "Vá em 'Configurações' > 'Perfil do Negócio'.",
          "Faça o upload da sua logo (recomendado: formato quadrado).",
          "Preencha o nome oficial e uma breve biografia/descrição.",
          "Adicione seu WhatsApp e links de redes sociais.",
          "Salve as alterações no botão ao final da página."
        ],
        image: "/tutorials/print-agenda.png",
        tip: "Um perfil completo com logo e horários bem definidos passa 70% mais credibilidade que um perfil genérico."
      },
      {
        title: "3. Horário de Funcionamento",
        text: "Defina quando seu negócio está aberto e disponível para receber novos agendamentos.",
        checklist: [
          "Acesse 'Configurações' > 'Horários'.",
          "Ative os dias da semana em que você atende.",
          "Defina o horário de início e término de cada dia.",
          "Clique no ícone '+' para adicionar intervalos (ex: almoço).",
          "Certifique-se de salvar antes de sair desta tela."
        ],
        image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?q=80&w=800&auto=format&fit=crop",
        tip: "Configure horários de folga com antecedência para evitar conflitos de agenda."
      },
      {
        title: "4. Seus Primeiros Serviços",
        text: "Cadastre o que você oferece para que seus clientes possam escolher no site.",
        checklist: [
          "Vá no menu 'Serviços' e clique em '+ Novo Serviço'.",
          "Dê um nome atrativo ao serviço (ex: Corte de Cabelo Masculino).",
          "Defina a duração média (ex: 45 min).",
          "Coloque o valor do serviço e escolha uma categoria.",
          "Adicione uma descrição curta explicando o que está incluso.",
          "Clique em 'Publicar' para torná-lo visível no site."
        ],
        image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop",
        tip: "Use nomes claros e descrições curtas que destaquem o benefício do serviço."
      },
      {
        title: "5. O Resultado Final",
        text: "Após configurar seus dados, seu site profissional estará pronto para receber clientes.",
        checklist: [
          "Clique no botão 'Ver meu Site' no canto superior direito.",
          "Simule um agendamento para testar a experiência do cliente.",
          "Copie o link do seu site (aura.app/seunegocio).",
          "Compartilhe o link na sua bio do Instagram e no WhatsApp."
        ],
        image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=800&auto=format&fit=crop",
        tip: "Sempre visualize seu site após fazer alterações para garantir que a experiência do cliente seja perfeita."
      }
    ]
  },
  "gestao-agendamentos": {
    title: "Gestão de Agendamentos e Redução de Faltas",
    description: "Domine sua agenda e aprenda estratégias para reduzir o no-show em até 80% usando lembretes automáticos e políticas de cancelamento.",
    content: [
      {
        title: "1. Dominando o Calendário",
        text: "O calendário da AURA é dinâmico. Você pode alternar entre as visões de Dia, Semana e Mês, além de filtrar por profissional para uma gestão focada.",
        checklist: [
          "Clique no seletor de visão (Canto Superior Direito) para mudar entre Dia/Semana.",
          "Use os filtros laterais para ver apenas a agenda de um profissional específico.",
          "Observe as cores: cada cor indica um status (ex: Verde para Confirmado).",
          "Navegue pelas datas usando as setas ao lado do nome do mês."
        ],
        image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=800&auto=format&fit=crop",
        tip: "DICA PROFISSIONAL: Use a visão 'Semanal' para identificar buracos na sua grade e lançar promoções relâmpago para esses horários."
      },
      {
        title: "2. Agendamento em 3 Cliques",
        text: "Cadastrar um cliente manualmente é rápido e intuitivo. O sistema já busca clientes cadastrados pelo nome ou telefone.",
        checklist: [
          "Clique diretamente no horário vago que deseja agendar.",
          "Selecione o serviço (o tempo de duração será ajustado automaticamente).",
          "Busque o cliente pelo nome ou clique em '+ Novo' para cadastrar na hora.",
          "Confirme se o envio de lembrete por WhatsApp está ativado."
        ],
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
        tip: "Sempre valide o número de WhatsApp do cliente. É através dele que o Aura reduzirá suas faltas."
      },
      {
        title: "3. Gestão de Status e Ciclo de Vida",
        text: "Acompanhar o cliente desde a chegada até a saída é essencial para manter sua agenda organizada e seus relatórios precisos.",
        checklist: [
          "Agendamento Criado: O status inicial é sempre 'Pendente'.",
          "Confirmar: Use quando o cliente confirmar que comparecerá ao horário.",
          "Concluir: Marque assim que o trabalho for finalizado para registrar o serviço.",
          "Cancelar: Utilize caso o cliente avise que não virá ou simplesmente não compareça."
        ],
        image: "/tutorials/print-agendamentos-lista.png",
        tip: "DICA DE GESTÃO: Manter os status atualizados permite que você saiba exatamente em que fase cada atendimento está em tempo real."
      },
      {
        title: "4. Bloqueios Estratégicos e Intervalos",
        text: "Gerir o tempo não é apenas marcar clientes, é garantir que você tenha tempo para respirar e se organizar.",
        checklist: [
          "Use a função 'Bloquear Horário' para intervalos de almoço ou reuniões.",
          "Configure 'Tempo de Intervalo' automático entre serviços (Buffer Time).",
          "Bloqueie datas festivas ou feriados com antecedência.",
          "Adicione uma observação no bloqueio para sua equipe saber o motivo."
        ],
        image: "/tutorials/print-agendamentos-lista.png",
        tip: "DICA DE PRODUTIVIDADE: Configure um intervalo de 10-15 minutos entre serviços longos para limpeza e preparação do ambiente. Isso evita atrasos em cascata."
      },
      {
        title: "5. Lembretes Automáticos e Notificações",
        text: "O Aura ajuda você a não perder nada importante. Configure os alertas essenciais para sua operação.",
        checklist: [
          "Vá em 'Configurações' > 'Notificações'.",
          "Novo Agendamento: Receba um alerta sempre que um cliente marcar pelo site.",
          "Cancelamentos: Seja avisado imediatamente se um horário vagar.",
          "Estoque Baixo: Receba um alerta automático quando um produto estiver acabando."
        ],
        image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=800&auto=format&fit=crop",
        tip: "Fique atento às notificações para dar um retorno rápido aos seus clientes e manter o estoque em dia."
      },
      {
        title: "6. Relatórios de Produtividade",
        text: "Use os dados ao seu favor. Saiba quais são seus horários de pico e quem são seus clientes mais fiéis.",
        checklist: [
          "Acesse o menu 'Relatórios' > 'Agenda'.",
          "Analise a taxa de ocupação da sua semana.",
          "Identifique os serviços mais agendados para focar seu marketing neles.",
          "Exporte a lista de clientes que não aparecem há mais de 30 dias para reativá-los."
        ],
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
        tip: "DICA DE CRESCIMENTO: Se sua taxa de ocupação passar de 85%, talvez seja hora de aumentar seus preços ou contratar mais um profissional."
      }
    ]
  },
  "cadastrar-servicos": {
    title: "Como cadastrar seus serviços",
    description: "Organize seu catálogo de serviços com preços, durações e ícones personalizados para facilitar a escolha do cliente.",
    content: [
      {
        title: "1. Criando um Novo Serviço",
        text: "O formulário de cadastro é simples e direto. Preencha os detalhes fundamentais para o seu atendimento.",
        checklist: [
          "Clique no botão '+ Adicionar Serviço'.",
          "Nome do Serviço: Seja claro (ex: Design de Sobrancelhas).",
          "Descrição: Explique brevemente o que está incluso no procedimento.",
          "Ícone do Serviço: Escolha um ícone que ajude na identificação visual no seu site.",
          "Duração e Preço: Defina o tempo médio em minutos e o valor cobrado."
        ],
        image: "/tutorials/print-servico-registro.png",
        tip: "Marque 'Mostrar na página inicial' para que esse serviço apareça em destaque no seu site de agendamento."
      },
      {
        title: "2. Configuração de Conflitos",
        text: "Evite que serviços incompatíveis sejam realizados ao mesmo tempo por um único profissional ou recurso.",
        checklist: [
          "No final do cadastro de serviço, procure por 'Configuração de Conflitos'.",
          "Pesquise e selecione os serviços que NÃO podem ser realizados junto com este.",
          "Isso garante que sua agenda nunca tenha choques de horários impossíveis.",
          "Salve o serviço para aplicar todas as configurações."
        ],
        image: "/tutorials/print-servico-registro.png",
        tip: "DICA PROFISSIONAL: Configure conflitos para serviços que exigem a mesma máquina ou sala física."
      },
      {
        title: "3. Configurando Consumo de Itens",
        text: "O Aura permite que você vincule exatamente quais produtos são gastos em cada atendimento realizado.",
        checklist: [
          "Na lista de serviços, clique no ícone de 'Cubo' (Estoque).",
          "Uma nova janela 'Produtos' será aberta para o serviço selecionado.",
          "Clique em '+ Adicionar Produto' e pesquise o item desejado.",
          "Defina as quantidades e use as unidades para ajustes finos.",
          "Clique em 'Salvar Configuração' ao finalizar."
        ],
        image: "/tutorials/print-servico-consumo.png",
        tip: "O Aura fará o cálculo automático e te avisará quando o estoque estiver acabando com base nesses dados."
      }
    ]
  },

  "configurar-horarios": {
    title: "Configurando sua Jornada de Trabalho",
    description: "Defina seus horários de atendimento, folgas e períodos de descanso de forma flexível para cada dia da semana.",
    content: [
      {
        title: "1. Regras de Agendamento e Espaçamento",
        text: "Defina o ritmo da sua agenda. Escolha o espaçamento de tempo que aparecerá no seu calendário para organizar seus atendimentos.",
        checklist: [
          "Tempo entre agendamentos: Define os blocos de tempo no calendário (ex: de 10 em 10 min ou de 30 em 30 min).",
          "Antecedência mínima: Defina quanto tempo antes o cliente pode marcar (ex: Sem antecedência ou 1 hora antes).",
          "Clique no ícone de 'Disquete' para salvar as regras globais."
        ],
        image: "/tutorials/print-horarios-regras.png",
        tip: "DICA PROFISSIONAL: Usar o espaçamento de 10 em 10 minutos permite que você tenha uma noção muito melhor de onde encaixar clientes, evitando desperdício de tempo e otimizando sua produtividade diária."
      },
      {
        title: "2. Horários de Funcionamento e Almoço",
        text: "Configure o horário de abertura, fechamento e seu intervalo de descanso para cada dia da semana.",
        checklist: [
          "Ative a chave 'Aberto/Fechado' for cada dia.",
          "Defina o Horário de Abertura e Fechamento.",
          "Configure o Início e Fim do Almoço (o sistema bloqueará esses horários automaticamente).",
          "Use 'Copiar p/ Todos' ou 'Copiar p/ Dias Úteis' para ganhar tempo na configuração."
        ],
        image: "/tutorials/print-horarios-regras.png",
        tip: "O Aura gerencia seus intervalos de almoço para que nenhum cliente consiga agendar nesse período."
      },
      {
        title: "3. Bloqueios de Agenda (Férias e Feriados)",
        text: "Precisa dar uma pausa ou vai fechar em um feriado? Use os bloqueios para datas específicas.",
        checklist: [
          "Vá até a seção 'Bloqueios de Agenda'.",
          "Selecione a Data Inicial e a Data Final (se for apenas um dia, use a mesma data).",
          "Opcional: Defina um horário específico de início e fim do bloqueio.",
          "Escreva o Motivo (ex: Feriado, Férias, Manutenção).",
          "Clique em 'Confirmar Bloqueio' para salvar."
        ],
        image: "/tutorials/print-horarios-bloqueios.png",
        tip: "Bloqueios são ideais para imprevistos ou folgas pontuais sem precisar alterar seu horário padrão semanal."
      }
    ]
  },
  "tutorial-editor": {
    title: "Editor de Site: Domine a vitrine do seu negócio",
    description: "Aprenda a navegar, remover seções, gerenciar páginas e personalizar cada detalhe do seu site de agendamento profissional.",
    content: [
      {
        title: "1. Visão Geral e Navegação",
        text: "O Editor de Site é dividido em duas partes: à esquerda fica o painel de controle e à direita a visualização em tempo real. Você pode navegar entre as páginas do seu site usando o menu superior do iframe ou clicando nos links diretamente na visualização.",
        checklist: [
          "Painel Esquerdo: Onde você gerencia o conteúdo e a estrutura.",
          "Visualização Direita: Mostra exatamente como seu site está ficando.",
          "Seletor de Dispositivo: No topo, alterne entre Desktop e Mobile para garantir que seu site fique lindo em qualquer tela.",
          "Zoom e Redimensionamento: Use os controles de lupa para ajustar a área de trabalho."
        ],
        image: "/tutorials/editor-full.png",
        tip: "DICA: Sempre verifique a versão 'Mobile' (celular), pois 90% dos seus clientes farão o agendamento por lá!"
      },
      {
        title: "2. Gerenciando Seções (Remover e Ocultar)",
        text: "Cada página é composta por várias seções (Banner, Serviços, Galeria, etc). Você tem total controle sobre o que aparece ou não no seu site.",
        checklist: [
          "Remover Seção: Clique no ícone de '-' (menos) no card da seção para removê-la permanentemente.",
          "Ocultar Seção: Use a chave (toggle) ao lado do nome da seção para escondê-la temporariamente sem deletar seu conteúdo.",
          "Resetar: O ícone de 'seta circular' ao lado da seção volta o conteúdo para o padrão original."
        ],
        image: "/tutorials/editor-full.png",
        tip: "Use a função de 'Ocultar' para seções sazonais (como promoções de Natal) sem precisar refazer o texto depois."
      },
      {
        title: "3. Layout Global vs. Páginas Específicas",
        text: "Existem dois tipos de configurações no editor: as Globais (que afetam todo o site) e as de Página (específicas de cada aba).",
        checklist: [
          "Layout Global: Aqui você configura o Cabeçalho (logo e menu), Rodapé, Tipografia (fontes) e a Paleta de Cores do site inteiro.",
          "Páginas (Início, Galeria, Sobre): Cada aba tem suas próprias seções exclusivas que podem ser editadas individualmente.",
          "Expandir/Recolher: Clique no card da página para ver todas as seções disponíveis dentro dela."
        ],
        image: "/tutorials/editor-full.png",
        tip: "Comece sempre pelas Cores e Tipografia no 'Layout Global' para manter a identidade visual unificada."
      },
      {
        title: "4. Barra de Ferramentas e Status",
        text: "A barra superior é essencial para a gestão técnica do seu site e para a segurança das suas alterações.",
        checklist: [
          "Acesso ao Site: A chave 'ATIVO/INATIVO' permite que você tire o site do ar para manutenções rápidas.",
          "Estúdio: Identifica qual negócio você está editando no momento.",
          "Como funciona este recurso?: Link direto para este tutorial em vídeo ou texto.",
          "Fechar: Sai do editor e volta para o painel administrativo."
        ],
        image: "/tutorials/editor-toolbar.png",
        tip: "Se o seu site estiver 'INATIVO', os clientes verão uma página de aviso e não conseguirão agendar."
      },
      {
        title: "5. Publicando suas Alterações",
        text: "O editor salva seus rascunhos automaticamente enquanto você trabalha, mas as mudanças só ficam visíveis para seus clientes quando você clica em publicar.",
        checklist: [
          "Botão Publicar: Localizado na parte inferior do painel esquerdo.",
          "Botão Resetar: No topo do painel, apaga todos os seus rascunhos não publicados e volta ao que está online.",
          "Visualização Prévia: O iframe à direita sempre mostra o seu RASCUNHO atual."
        ],
        image: "/tutorials/editor-full.png",
         tip: "DICA DE OURO: Use o computador para fazer as edições. Além de ter uma visão muito mais clara e confortável, por lá você consegue usar o seletor de dispositivos para conferir exatamente como seu site aparecerá no celular dos seus clientes."
       },
    ]
  },
  "gestao-estoque": {
    title: "Gestão de Estoque e Conversão Operacional",
    description: "Aprenda a cadastrar produtos, configurar unidades de medida e automatizar a baixa de materiais por procedimento.",
    content: [
      {
        title: "1. Cadastro de Produtos e Unidades",
        text: "Cadastre seus materiais definindo como você compra e como você usa no dia a dia.",
        checklist: [
          "Nome do Produto: Identifique claramente (ex: Henna Profissional).",
          "Quantidade Inicial e Estoque Mínimo: Defina quando o sistema deve te avisar para repor.",
          "Unidade Principal: Como você compra o produto (ex: Unidade, Caixa, Litro).",
          "Unidade Secundária (Consumo): Como você usa no atendimento (ex: ml, gramas, par)."
        ],
        image: "/tutorials/print-produto-registro.png",
        tip: "DICA: O Estoque Mínimo é seu melhor amigo para nunca ser pego de surpresa sem material no meio de um atendimento."
      },
      {
        title: "2. Fator de Conversão",
        text: "O sistema faz o cálculo matemático para você. Diga ao Aura quanto a sua unidade de consumo rende.",
        checklist: [
          "Exemplo de Caixa: Se você compra uma caixa com 50 pares de luvas, a Unidade Principal é 'Caixa' e o Fator de Conversão é '50'.",
          "Exemplo de Líquido: Se você compra 1 Litro e usa em ml, o Fator de Conversão é '1000'.",
          "Isso permite que você saiba exatamente o custo por cada aplicação do serviço."
        ],
        image: "/tutorials/print-produto-registro.png",
        tip: "DICA PROFISSIONAL: Cadastrar a conversão correta é o que diferencia um negócio que sabe seu lucro real de um que apenas 'acha' que está ganhando dinheiro."
      },
      {
        title: "3. Itens de Uso Compartilhado (EPIs)",
        text: "Economize estoque de forma inteligente em atendimentos múltiplos.",
        checklist: [
          "Ative a chave 'Item de uso compartilhado (EPI)' para itens como luvas, máscaras ou toucas.",
          "Se o cliente marcar 3 serviços seguidos (ex: Cílios, Sobrancelha e Buço), o sistema dará baixa em apenas 1 par de luvas.",
          "Isso evita baixas duplicadas e mantém seu estoque 100% fiel à realidade operacional."
        ],
        image: "/tutorials/print-produto-registro.png",
        tip: "Essa função é essencial para não 'desperdiçar' estoque virtual quando você atende o mesmo cliente por um longo período."
      },
      {
        title: "4. Inventário e Atualização Periódica",
        text: "Mantenha a saúde financeira do seu negócio com dados atualizados.",
        checklist: [
          "Confira a lista de 'Inventário' para ver o status de cada produto.",
          "Sempre que chegar mercadoria nova, use o botão 'Adicionar Produto' ou atualize o saldo existente.",
          "Faça uma contagem física rápida uma vez por semana para garantir que o sistema e a prateleira estão em sintonia."
        ],
        image: "/tutorials/print-produto-registro.png",
        tip: "DICA DE GESTÃO: Checar periodicamente o estoque evita erros de digitação e garante que o custo dos serviços esteja sempre correto no seu financeiro."
      }
    ]
  },
  "conceitos-financeiro": {
    title: "Inteligência Financeira: Do Fluxo ao Lucro Real",
    description: "Domine seu fluxo de caixa e entenda o lucro real do seu negócio com dados estratégicos e relatórios automáticos.",
    content: [
      {
        title: "1. Painel de Relatórios em Tempo Real",
        text: "Entenda a saúde do seu negócio em segundos através dos indicadores visuais do painel.",
        checklist: [
          "Faturamento: Acompanhe o valor bruto acumulado no mês.",
          "Atendimentos e Cancelados: Monitore sua taxa de conversão e identifique perdas.",
          "Estoque em Valor: Saiba quanto capital você tem 'parado' em produtos.",
          "Fluxo de Caixa Detalhado: Visualize cada entrada (serviços) e saída (compras) por categoria."
        ],
        image: "/tutorials/print-financeiro-relatorios.png",
        tip: "DICA DE CRESCIMENTO: Se os cancelamentos estiverem altos, considere enviar lembretes com mais antecedência ou revisar sua política de agendamento."
      },
      {
        title: "2. Gerenciamento de Gastos Fixos e Lucro Real",
        text: "Para saber seu lucro real, você precisa descontar o que gasta para manter a porta aberta.",
        checklist: [
          "Cadastre seus Gastos Fixos (aluguel, luz, internet, salários).",
          "O Aura calcula automaticamente: Receita Total - Gastos Fixos - Custo de Materiais.",
          "Visualize seu Lucro Operacional e a Margem de Lucro (%) real.",
          "Filtre por período para comparar o desempenho entre meses."
        ],
        image: "/tutorials/print-financeiro-gerenciamento.png",
        tip: "DICA PROFISSIONAL: Um negócio saudável mantém a margem de lucro estável. Se sua margem cair, é hora de revisar os custos de materiais ou reajustar seus preços."
      },
      {
        title: "3. Análise de Destaques e Ticket Médio",
        text: "Identifique o que realmente traz dinheiro para o seu estúdio.",
        checklist: [
          "Serviço + Vendido: Foque seu marketing no serviço que tem mais saída.",
          "Ticket Médio: Descubra quanto, em média, cada cliente gasta por visita.",
          "Use esses dados para criar combos que aumentem o valor gasto por cada cliente."
        ],
        image: "/tutorials/print-financeiro-relatorios.png",
        tip: "MÉTODO QUE FUNCIONA: Se seu Ticket Médio está baixo, ofereça um serviço complementar (ex: design de sobrancelha ao fazer cílios) com um pequeno desconto."
      },
      {
        title: "4. Exportação de Dados para Tomada de Decisão",
        text: "Leve sua gestão para o próximo nível com relatórios detalhados.",
        checklist: [
          "Exporte em PDF para apresentações ou contabilidade.",
          "Exporte em Excel/CSV para análises mais profundas e cruzamento de dados.",
          "Gere relatórios específicos por Serviços, Trabalhos ou Estoque."
        ],
        image: "/tutorials/print-financeiro-gerenciamento.png",
        tip: "DICA DE OURO: Analise seus relatórios semanalmente. Dados não mentem e mostram exatamente onde você pode economizar ou investir para crescer."
      },
      {
        title: "5. Análise de KPIs e Otimização Operacional",
        text: "Use os dados para tomar decisões de nível executivo. Transforme números em estratégia de crescimento.",
        checklist: [
            "Análise de CAC (Custo de Aquisição de Cliente): Compare seus gastos em marketing com o número de novos atendimentos.",
            "Churn Rate (Taxa de Abandono): Identifique se clientes antigos pararam de voltar e crie campanhas de reativação.",
            "Produtividade por Cadeira: Analise qual profissional ou horário gera mais receita por hora trabalhada.",
            "Margem de Contribuição: Saiba quanto cada serviço contribui para pagar seus gastos fixos após descontar o material.",
            "Sazonalidade Anual: Compare o volume de clientes entre diferentes épocas do ano (ex: Dezembro vs. Julho) para planejar seu estoque e contratações com antecedência."
          ],
          image: "/tutorials/print-financeiro-relatorios.png",
          tip: "MÉTODO AVANÇADO: Se sua 'Produtividade por Cadeira' estiver baixa em certos horários, crie promoções específicas para esses períodos ('Happy Hour da Beleza'). Além disso, use a 'Análise de Sazonalidade' para identificar os meses mais parados e criar campanhas de 'Antecipação de Serviços' (ex: pacotes comprados em Julho para usar em Agosto) para manter o caixa saudável o ano todo."
        }
    ]
  },
  "notificacoes-automaticas": {
    title: "Configurando notificações automáticas",
    description: "Ative alertas de navegador para nunca mais perder um novo agendamento.",
    content: [
      {
        title: "1. Configuração de Alertas",
        text: "Vá em configurações de perfil e ative as notificações push. Isso permitirá que o Aura te avise mesmo se a aba do sistema estiver fechada.",
        image: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?q=80&w=800&auto=format&fit=crop",
        tip: "Lembre-se de clicar em 'Permitir' no pop-up do seu navegador (Chrome/Safari/Edge)."
      },
      {
        title: "2. Tipos de Notificação",
        text: "Escolha receber avisos para: Novos Agendamentos, Cancelamentos de Clientes e Lembretes de Estoque Baixo.",
        image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=800&auto=format&fit=crop",
        tip: "Ative também o som das notificações para não perder nada enquanto atende."
      }
    ]
  }
};

export default function TutorialContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [currentStep, setCurrentStep] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const tutorial = tutorialData[slug as keyof typeof tutorialData];

  if (!tutorial) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Tutorial não encontrado</h1>
          <Link href="/tutorials">
            <Button variant="outline">Voltar para tutoriais</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isLastStep = currentStep === tutorial.content.length - 1;

  return (
    <main className="min-h-screen bg-background">
      {/* Header Fixo */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/tutorials">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="hidden sm:block">
              <h1 className="text-sm font-semibold truncate max-w-50 lg:max-w-md">
                {tutorial.title}
              </h1>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Passo {currentStep + 1} de {tutorial.content.length}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> 5 min restantes
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bookmark className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Share2 className="h-5 w-5" />
            </Button>
            <div className="h-8 w-px bg-border mx-2 hidden sm:block" />
            <Link href="/register">
              <Button size="sm" className="hidden sm:flex">
                Começar a usar agora
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Barra de Progresso */}
        <div className="h-1 w-full bg-muted">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${((currentStep + 1) / tutorial.content.length) * 100}%` }}
          />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Coluna de Conteúdo Principal */}
            <div className="lg:col-span-8 space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5">
                  PASSO {currentStep + 1}
                </Badge>
                <h2 className="text-3xl font-bold tracking-tight text-foreground">
                  {tutorial.content[currentStep].title}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {tutorial.content[currentStep].text}
                </p>
              </div>

              {/* Checklist de Passos */}
              {tutorial.content[currentStep].checklist && (
                <div className="bg-muted/50 rounded-2xl p-8 border border-border space-y-4">
                  <h3 className="font-bold text-xl flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    O que fazer neste passo:
                  </h3>
                  <ul className="grid gap-3">
                    {tutorial.content[currentStep].checklist.map((item, index) => (
                      <li key={index} className="flex gap-3 items-start text-muted-foreground">
                        <span className="shrink-0 h-6 w-6 rounded-full bg-background border border-border flex items-center justify-center text-xs font-bold text-primary">
                          {index + 1}
                        </span>
                        <span className="pt-0.5">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Área da Imagem/Print */}
              {tutorial.content[currentStep].image && (
                <div 
                  className="rounded-2xl overflow-hidden border border-border bg-muted/30 shadow-sm cursor-zoom-in group/image relative"
                  onClick={() => setIsZoomOpen(true)}
                >
                  <img 
                    src={tutorial.content[currentStep].image} 
                    alt={tutorial.content[currentStep].title}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover/image:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/5 transition-colors flex items-center justify-center">
                    <div className="bg-background/90 backdrop-blur-sm p-3 rounded-full shadow-lg opacity-0 group-hover/image:opacity-100 transition-all transform translate-y-2 group-hover/image:translate-y-0">
                      <ZoomIn className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border shadow-sm opacity-0 group-hover/image:opacity-100 transition-opacity">
                    Clique para ampliar
                  </div>
                </div>
              )}

              {/* Modal de Zoom */}
              {isZoomOpen && (
                <div 
                  className="fixed inset-0 z-100 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300"
                  onClick={() => setIsZoomOpen(false)}
                >
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-6 right-6 text-white hover:bg-white/10 rounded-full h-12 w-12"
                    onClick={() => setIsZoomOpen(false)}
                  >
                    <X className="h-8 w-8" />
                  </Button>
                  
                  <div className="relative max-w-7xl w-full h-full flex items-center justify-center">
                    <img 
                      src={tutorial.content[currentStep].image} 
                      alt={tutorial.content[currentStep].title}
                      className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/60 to-transparent text-white text-center rounded-b-lg">
                      <p className="text-lg font-medium">{tutorial.content[currentStep].title}</p>
                      <p className="text-sm text-white/70">Clique em qualquer lugar para fechar</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Card de Dica */}
              <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 flex gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Lightbulb className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-1 text-sm uppercase tracking-wider">Dica Aura</h4>
                  <p className="text-muted-foreground text-sm">
                    {tutorial.content[currentStep].tip}
                  </p>
                </div>
              </div>

              {/* Navegação entre passos */}
              <div className="flex items-center justify-between pt-8 border-t">
                <Button
                  variant="ghost"
                  onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                  disabled={currentStep === 0}
                  className="gap-2"
                >
                  Anterior
                </Button>

                <div className="flex gap-2">
                  {!isLastStep ? (
                    <Button 
                      onClick={() => setCurrentStep(prev => Math.min(tutorial.content.length - 1, prev + 1))}
                      className="gap-2"
                    >
                      Próximo passo
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Link href="/register">
                      <Button className="gap-2 bg-green-600 hover:bg-green-700">
                        Finalizar e Criar Conta
                        <CheckCircle2 className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar de Progresso */}
            <aside className="lg:col-span-4 space-y-8 hidden lg:block">
              <div className="sticky top-28 space-y-6">
                <div className="bg-muted/30 rounded-2xl p-6 border">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Conteúdo do Tutorial
                  </h3>
                  <div className="space-y-1">
                    {tutorial.content.map((step, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentStep(index)}
                        className={cn(
                          "w-full text-left px-4 py-3 rounded-lg text-sm transition-all flex items-center gap-3",
                          currentStep === index 
                            ? "bg-primary text-primary-foreground font-medium shadow-md" 
                            : "hover:bg-muted text-muted-foreground"
                        )}
                      >
                        <span className={cn(
                          "h-6 w-6 rounded-full flex items-center justify-center text-[10px] border",
                          currentStep === index 
                            ? "bg-primary-foreground/20 border-transparent" 
                            : "bg-background border-border"
                        )}>
                          {index + 1}
                        </span>
                        {step.title}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-linear-to-br from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20">
                  <h4 className="font-bold mb-2">Pronto para começar?</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Coloque em prática o que aprendeu e transforme seu negócio hoje mesmo.
                  </p>
                  <Link href="/register">
                    <Button className="w-full">Criar minha conta grátis</Button>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
