// src/constants/subscriptionDetailsByType.ts
export const subscriptionDetailsByType: Record<
  string,
  {
    icon: string;
    audience: string;
    features: string[];
  }
> = {
  FREE_LISTENER: {
    icon: '🎧',
    audience: 'Para quem busca música gratuita com anúncios',
    features: [
      'Ouça com anúncios',
      'Não permite publicar faixas',
      'Acesso básico à plataforma',
    ],
  },
  FREE_ARTIST: {
    icon: '🆓🎨',
    audience: 'Para criadores iniciantes que querem começar sem custos',
    features: [
      'Publique até 5 faixas',
      'Ouça com anúncios',
      'Acesso limitado a recursos de criação',
    ],
  },
  SOLO: {
    icon: '🎶',
    audience: 'Para quem curte ouvir música sem interrupções',
    features: [
      'Música sem anúncios',
      'Qualidade premium',
      'Acesso ilimitado à biblioteca',
      'Não permite publicar faixas',
    ],
  },
  STUDENT: {
    icon: '🎓',
    audience: 'Ideal para estudantes apaixonados por música',
    features: [
      'Música sem anúncios',
      'Desconto exclusivo',
      'Experiência fluida de escuta',
      'Não permite publicar faixas',
    ],
  },
  FAMILY: {
    icon: '👨‍👩‍👧‍👦',
    audience: 'Perfeito para curtir com quem você ama',
    features: [
      'Até 5 contas independentes',
      'Sem anúncios para todos',
      'Playlist familiar compartilhada',
      'Não permite publicar faixas',
    ],
  },
  ARTIST: {
    icon: '🎨',
    audience: 'Feito para criadores independentes',
    features: [
      'Publique faixas ilimitadas',
      'Dashboard com estatísticas',
      'Ferramentas avançadas de criação',
      'Música sem anúncios',
    ],
  },
  LABEL: {
    icon: '🏢',
    audience: 'Para quem vive de música profissionalmente',
    features: [
      'Gerencie múltiplos artistas',
      'Dashboards executivos',
      'Promoção e distribuição avançadas',
      'Música sem anúncios',
    ],
  },
};
