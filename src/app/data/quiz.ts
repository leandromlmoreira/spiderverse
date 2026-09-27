export type Weights = Partial<Record<string, number>>;

export interface IQuizOption {
  text: string;
  weights: Weights;
}

export interface IQuizQuestion {
  prompt: string;
  sfx: string;
  options: IQuizOption[];
}

const PETER = "spider-man-616";
const GWEN = "mulher-aranha-65";
const MILES = "spider-man-1610";
const PENI = "sp-dr-14512";
const HAM = "spider-ham-8311";
const NOIR = "spider-man-90214";
const MIGUEL = "spider-man-928";

export const QUIZ: IQuizQuestion[] = [
  {
    prompt: "Sábado à noite. Onde você está?",
    sfx: "HMM?",
    options: [
      { text: "Ensaiando com a banda", weights: { [GWEN]: 3 } },
      { text: "Pintando um mural de fone no ouvido", weights: { [MILES]: 3 } },
      { text: "Montando um robô na garagem", weights: { [PENI]: 3, [MIGUEL]: 1 } },
      { text: "Pizza no sofá e cama cedo", weights: { [PETER]: 3, [HAM]: 1 } },
    ],
  },
  {
    prompt: "Qual é o seu estilo de luta?",
    sfx: "POW!",
    options: [
      { text: "Acrobacia: nunca estou onde esperam", weights: { [GWEN]: 2, [MILES]: 1 } },
      { text: "Força bruta com um robô gigante", weights: { [PENI]: 3 } },
      { text: "Garras, velocidade e zero paciência", weights: { [MIGUEL]: 3 } },
      { text: "Improviso e piada no meio do soco", weights: { [HAM]: 2, [PETER]: 1 } },
    ],
  },
  {
    prompt: "Escolha a trilha sonora da sua vida.",
    sfx: "TUNS!",
    options: [
      { text: "Hip-hop no volume máximo", weights: { [MILES]: 3 } },
      { text: "Punk rock com muita bateria", weights: { [GWEN]: 3 } },
      { text: "Jazz num rádio chiando", weights: { [NOIR]: 3 } },
      { text: "Synthwave direto do futuro", weights: { [MIGUEL]: 2, [PENI]: 1 } },
    ],
  },
  {
    prompt: "Um vilão aparece. Você...",
    sfx: "KRAK!",
    options: [
      { text: "Dá um sermão motivacional e depois age", weights: { [PETER]: 3 } },
      { text: "Espera na sombra e ataca no escuro", weights: { [NOIR]: 3 } },
      { text: "Calcula as probabilidades antes de agir", weights: { [MIGUEL]: 2, [PENI]: 1 } },
      { text: "Joga uma bigorna", weights: { [HAM]: 3 } },
    ],
  },
  {
    prompt: "Seu maior defeito é...",
    sfx: "OPS!",
    options: [
      { text: "Ser dramático demais", weights: { [NOIR]: 2, [MIGUEL]: 1 } },
      { text: "Não levar nada a sério", weights: { [HAM]: 3 } },
      { text: "Me cobrar demais", weights: { [MILES]: 2, [GWEN]: 1 } },
      { text: "Já ter visto de tudo e andar cansado", weights: { [PETER]: 3 } },
    ],
  },
  {
    prompt: "Última pergunta: escolha uma paleta.",
    sfx: "SPLASH!",
    options: [
      { text: "Vermelho e preto", weights: { [MILES]: 2, [PETER]: 1 } },
      { text: "Rosa, branco e ciano", weights: { [GWEN]: 2, [PENI]: 1 } },
      { text: "Preto e branco, sem discussão", weights: { [NOIR]: 3 } },
      { text: "Azul neon", weights: { [MIGUEL]: 3 } },
    ],
  },
];

export interface IQuizMatch {
  heroId: string;
  percent: number;
}

function maxScoreFor(heroId: string): number {
  return QUIZ.reduce(
    (sum, question) => sum + Math.max(0, ...question.options.map((option) => option.weights[heroId] ?? 0)),
    0
  );
}

export function scoreQuiz(answers: number[], heroIds: string[]): IQuizMatch[] {
  return heroIds
    .map((heroId, order) => {
      const score = answers.reduce((sum, choice, index) => sum + (QUIZ[index]?.options[choice]?.weights[heroId] ?? 0), 0);
      const max = maxScoreFor(heroId) || 1;
      return { heroId, percent: Math.round((score / max) * 100), order };
    })
    .sort((a, b) => b.percent - a.percent || a.order - b.order)
    .map(({ heroId, percent }) => ({ heroId, percent }));
}
