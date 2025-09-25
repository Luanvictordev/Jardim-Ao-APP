import { plants } from "./plants";
import type { Plant } from "./plants";

export type GuideDifficulty = "Iniciante" | "Intermediário" | "Avançado";

export type GuidePhase = {
  title: string;
  description: string;
  checklist: string[];
};

export type GuideHighlight = {
  title: string;
  description: string;
};

export type GuideEssential = {
  label: string;
  value: string;
};

export type GuideResource = {
  title: string;
  description: string;
  link?: string;
};

export type Guide = {
  id: string;
  slug: string;
  icon: string;
  title: string;
  description: string;
  difficulty: GuideDifficulty;
  duration: string;
  season: string;
  steps: number;
  topics: string[];
  introduction: string;
  goal: string;
  essentials: GuideEssential[];
  highlights: GuideHighlight[];
  phases: GuidePhase[];
  maintenance: string[];
  resources: GuideResource[];
};

const difficultyMap: Record<Plant["difficulty"], GuideDifficulty> = {
  "Fácil": "Iniciante",
  Moderado: "Intermediário",
  Avançado: "Avançado",
};

const stepsByDifficulty: Record<GuideDifficulty, number> = {
  Iniciante: 5,
  Intermediário: 6,
  Avançado: 7,
};

const lowerCaseFirst = (value: string) => {
  if (!value.length) {
    return value;
  }
  return value.charAt(0).toLowerCase() + value.slice(1);
};

const createHighlights = (plant: Plant): GuideHighlight[] => {
  const [firstBenefit] = plant.benefits;
  return [
    {
      title: "Benefício principal",
      description: firstBenefit ?? "Espécie versátil para hortas urbanas.",
    },
    {
      title: "Rotina de cuidados",
      description: `Rega: ${lowerCaseFirst(plant.waterFrequency)}.`,
    },
    {
      title: "Ambiente ideal",
      description: `Prefere ${plant.sunlight.toLowerCase()} em clima de ${plant.climate.toLowerCase()}.`,
    },
  ];
};

const createPhases = (plant: Plant): GuidePhase[] => {
  const plantName = plant.name.toLowerCase();
  return [
    {
      title: "Preparação",
      description: `Organize o espaço e os materiais para receber ${plantName}.`,
      checklist: [
        "Separar ferramentas limpas",
        `Preparar o solo conforme ${plant.tip.toLowerCase()}`,
        `Reservar área com ${plant.sunlight.toLowerCase()}`,
      ],
    },
    {
      title: "Plantio e emergência",
      description: "Realize o plantio com atenção ao espaçamento e aos primeiros cuidados.",
      checklist: [
        `Respeitar o espaçamento de ${plant.spacing}`,
        `Manter o substrato úmido (${plant.waterFrequency.toLowerCase()})`,
        "Proteger as mudas do sol forte nos primeiros dias",
      ],
    },
    {
      title: "Crescimento ativo",
      description: "Acompanhe o desenvolvimento, faça podas leves e observe sinais de pragas.",
      checklist: [
        "Retirar folhas doentes ou amareladas",
        "Registrar datas de adubação e poda",
        "Usar soluções naturais para pragas quando necessário",
      ],
    },
    {
      title: "Colheita e avaliação",
      description: `Planeje a colheita de ${plantName} e avalie o que funcionou melhor no ciclo.`,
      checklist: [
        "Anotar o volume colhido",
        "Guardar sementes ou mudas saudáveis",
        "Compartilhar aprendizados com a comunidade",
      ],
    },
  ];
};

const createMaintenance = (plant: Plant): string[] => [
  `Seguir a rotina: ${lowerCaseFirst(plant.waterFrequency)}.`,
  `Verificar a luminosidade (${plant.sunlight.toLowerCase()}) e ajustar se necessário.`,
  `Registrar observações sobre ${plant.name.toLowerCase()} a cada semana.`,
];

const createResources = (plant: Plant): GuideResource[] => [
  {
    title: "Planilha de acompanhamento",
    description: "Modelo simples para anotar regas, adubações e colheitas.",
  },
  {
    title: "Ficha de observação",
    description: `Checklist rápido para monitorar ${plant.name.toLowerCase()} em aulas ou oficinas.`,
  },
];

const createGuide = (plant: Plant): Guide => {
  const difficulty = difficultyMap[plant.difficulty];
  const mainBenefit = plant.benefits[0] ?? "mais autonomia alimentar";
  const secondaryBenefit = plant.benefits[1] ?? plant.tip;
  const categoriesList = plant.categories.length
    ? plant.categories.join(", ").toLowerCase()
    : "cultivo urbano";
  const slug = plant.id;

  return {
    id: slug,
    slug,
    icon: plant.icon,
    title: `${plant.name} passo a passo`,
    description: plant.description,
    difficulty,
    duration: plant.harvestTime,
    season: plant.season,
    steps: stepsByDifficulty[difficulty],
    topics: [
      "Preparar o solo e recipientes",
      "Rotina de regas e nutrição",
      "Controle natural de pragas",
      "Colheita e registro de resultados",
      `Integração com ${categoriesList}`,
    ],
    introduction: `${plant.name} é uma das espécies selecionadas para nossos projetos de agricultura urbana. ${plant.description} Ideal para quem busca ${lowerCaseFirst(mainBenefit)} em iniciativas comunitárias e escolares.`,
    goal: `Conduzir o cultivo de ${plant.name.toLowerCase()} do plantio à colheita, documentando ${lowerCaseFirst(secondaryBenefit)}.`,
    essentials: [
      { label: "Ambiente", value: `Prefere ${plant.sunlight.toLowerCase()}.` },
      { label: "Rega", value: plant.waterFrequency },
      { label: "Clima", value: `Melhor desempenho em ${plant.climate.toLowerCase()}.` },
    ],
    highlights: createHighlights(plant),
    phases: createPhases(plant),
    maintenance: createMaintenance(plant),
    resources: createResources(plant),
  };
};

export const guides: Guide[] = plants.map(createGuide);

export const getGuideBySlug = (slug: string) => guides.find((guide) => guide.slug === slug);
