export type BubbleKind = "speech" | "shout" | "thought";
export type BubbleVoice = "classic" | "punk" | "street" | "mecha" | "cartoon" | "noir" | "neon";

export interface IBubble {
  kind: BubbleKind;
  text: string;
}

export interface IPower {
  label: string;
  short: string;
  value: number;
}

export interface IHeroLore {
  archetype: string;
  voice: BubbleVoice;
  bubbles: IBubble[];
  powers: IPower[];
  abilities: string[];
  firstAppearance: string;
  creators: string;
  trivia: string[];
  quizBlurb: string;
}

const POWER_LABELS = [
  ["Força", "FOR"],
  ["Agilidade", "AGI"],
  ["Sentido-aranha", "SEN"],
  ["Teia", "TEI"],
  ["Intelecto", "INT"],
  ["Estilo", "EST"],
] as const;

function powers(values: [number, number, number, number, number, number]): IPower[] {
  return POWER_LABELS.map(([label, short], index) => ({ label, short, value: values[index] }));
}

const defaultLore: IHeroLore = {
  archetype: "Aranha desconhecido",
  voice: "classic",
  bubbles: [
    { kind: "speech", text: "Mais um portal aberto. Mais um dia comum." },
    { kind: "shout", text: "THWIP!" },
    { kind: "thought", text: "Onde foi que eu vim parar?" },
  ],
  powers: powers([60, 60, 60, 60, 60, 60]),
  abilities: ["Sentido-aranha", "Aderência a superfícies"],
  firstAppearance: "Arquivo perdido no multiverso",
  creators: "Autores desconhecidos",
  trivia: ["Ainda não catalogado no índice do multiverso."],
  quizBlurb: "Você é um mistério do multiverso.",
};

const lore: Record<string, IHeroLore> = {
  "spider-man-616": {
    archetype: "O veterano",
    voice: "classic",
    bubbles: [
      { kind: "speech", text: "Tá bom, eu salvo o multiverso. De novo." },
      { kind: "shout", text: "Alguém viu minha pizza?!" },
      { kind: "thought", text: "Minhas costas não aguentam mais um salto desses..." },
    ],
    powers: powers([80, 76, 92, 90, 84, 62]),
    abilities: ["Sentido-aranha afiado", "Lançadores de teia caseiros", "Aderência a superfícies", "Paciência de mentor"],
    firstAppearance: "Amazing Fantasy #15 · 1962",
    creators: "Stan Lee e Steve Ditko",
    trivia: [
      "A Terra-616 é a linha do tempo principal dos quadrinhos da Marvel.",
      "O lançador de teia é invenção dele, não um poder.",
      "Nesta versão, Peter já viu de tudo e virou mentor de uma nova geração de Aranhas.",
    ],
    quizBlurb: "Você já viu de tudo, reclama um pouco, mas nunca deixa ninguém para trás. Experiência é o seu superpoder.",
  },
  "mulher-aranha-65": {
    archetype: "A baterista",
    voice: "punk",
    bubbles: [
      { kind: "speech", text: "Eu toco bateria. O ritmo quem dita sou eu." },
      { kind: "shout", text: "Segura o compasso!" },
      { kind: "thought", text: "Não se apega, Gwen. Não se apega." },
    ],
    powers: powers([72, 96, 86, 84, 78, 94]),
    abilities: ["Acrobacia de balé", "Sentido-aranha", "Parkour urbano", "Baquetas de reserva"],
    firstAppearance: "Edge of Spider-Verse #2 · 2014",
    creators: "Jason Latour e Robbi Rodriguez",
    trivia: [
      "Toca bateria na banda The Mary Janes.",
      "No universo dela, foi a Gwen quem ganhou os poderes, e não o Peter.",
      "O pai dela, George Stacy, é capitão da polícia de Nova York.",
    ],
    quizBlurb: "Leve, rápida e com trilha sonora própria. Você resolve tudo no improviso e ainda sai com estilo.",
  },
  "spider-man-1610": {
    archetype: "O novato",
    voice: "street",
    bubbles: [
      { kind: "speech", text: "Não sou cópia de ninguém. Eu salto do meu jeito." },
      { kind: "shout", text: "É agora ou nunca!" },
      { kind: "thought", text: "Respira. Salto de fé... de novo." },
    ],
    powers: powers([74, 88, 70, 80, 82, 96]),
    abilities: ["Choque venenoso", "Camuflagem", "Sentido-aranha", "Grafite nas horas vagas"],
    firstAppearance: "Ultimate Fallout #4 · 2011",
    creators: "Brian Michael Bendis e Sara Pichelli",
    trivia: [
      "Além dos poderes clássicos, tem choque venenoso e camuflagem.",
      "É filho de pai afro-americano e mãe porto-riquenha.",
      "O tio dele, Aaron Davis, é o Gatuno.",
    ],
    quizBlurb: "Você duvida de si mesmo, mas quando pula, pula alto. Criativo, leal e dono do próprio estilo.",
  },
  "sp-dr-14512": {
    archetype: "A pilota",
    voice: "mecha",
    bubbles: [
      { kind: "speech", text: "O SP//dr é o músculo. Eu sou o cérebro!" },
      { kind: "shout", text: "Sincronia total!" },
      { kind: "thought", text: "Nota mental: lubrificar as patas depois." },
    ],
    powers: powers([99, 58, 72, 70, 95, 88]),
    abilities: ["SP//dr, o mecha-aranha", "Link psíquico", "Canhões de teia", "Engenharia de campo"],
    firstAppearance: "Edge of Spider-Verse #5 · 2014",
    creators: "Gerard Way e Jake Wyatt",
    trivia: [
      "O SP//dr só funciona com uma piloto ligada à aranha do núcleo.",
      "O cocriador Gerard Way é vocalista do My Chemical Romance.",
      "O visual bebe direto dos animes de robôs gigantes.",
    ],
    quizBlurb: "Cérebro de engenheira e coração enorme. Você prefere montar a solução do que esperar por ela.",
  },
  "spider-ham-8311": {
    archetype: "O palhaço",
    voice: "cartoon",
    bubbles: [
      { kind: "speech", text: "Um porco com poderes de aranha? Pode crer." },
      { kind: "shout", text: "Bigorna a caminho!" },
      { kind: "thought", text: "Será que tem trufa nesse universo?" },
    ],
    powers: powers([50, 84, 66, 74, 60, 90]),
    abilities: ["Física de desenho animado", "Martelo gigante", "Resistência a bigornas", "Timing cômico"],
    firstAppearance: "Marvel Tails #1 · 1983",
    creators: "Tom DeFalco e Mark Armstrong",
    trivia: [
      "Na origem, ele era uma aranha mordida por uma porca radioativa.",
      "Vive num universo de bichos falantes, a Terra-8311.",
      "Ganhou revista própria em 1985: Peter Porker, The Spectacular Spider-Ham.",
    ],
    quizBlurb: "Nada é tão sério que não caiba uma piada. Você desarma qualquer tensão com humor.",
  },
  "spider-man-90214": {
    archetype: "O detetive",
    voice: "noir",
    bubbles: [
      { kind: "speech", text: "A chuva não para. Eu também não." },
      { kind: "shout", text: "Mãos ao alto!" },
      { kind: "thought", text: "Cores... nunca confiei nelas." },
    ],
    powers: powers([84, 74, 88, 62, 76, 99]),
    abilities: ["Sentido-aranha", "Combate de rua", "Faro de detetive", "Discrição nas sombras"],
    firstAppearance: "Spider-Man Noir #1 · 2009",
    creators: "David Hine, Fabrice Sapolsky e Carmine Di Giandomenico",
    trivia: [
      "A história se passa na Nova York da Grande Depressão, nos anos 1930.",
      "Os poderes vieram de uma aranha ligada a um antigo ídolo.",
      "Ao contrário dos outros Aranhas, ele não hesita em andar armado.",
    ],
    quizBlurb: "Poucas palavras, muita presença. Você observa tudo e age na hora certa, sempre com classe.",
  },
  "spider-man-928": {
    archetype: "O futurista",
    voice: "neon",
    bubbles: [
      { kind: "speech", text: "O futuro tem regras. Eu cuido delas." },
      { kind: "shout", text: "Saiam da minha linha do tempo!" },
      { kind: "thought", text: "Mais uma anomalia. Claro." },
    ],
    powers: powers([88, 92, 40, 86, 97, 90]),
    abilities: ["Garras retráteis", "Presas venenosas", "Visão acelerada", "Traje de moléculas instáveis"],
    firstAppearance: "Spider-Man 2099 #1 · 1992",
    creators: "Peter David e Rick Leonardi",
    trivia: [
      "É geneticista da Alchemax, a megacorporação de 2099.",
      "Não tem sentido-aranha, mas enxerga em velocidade acelerada.",
      "O uniforme é feito de moléculas instáveis.",
    ],
    quizBlurb: "Intenso, estratégico e sempre dois passos à frente. Você leva regras a sério, até demais.",
  },
};

export function getHeroLore(heroId: string): IHeroLore {
  return lore[heroId] ?? defaultLore;
}

export function powerScore(list: IPower[]): number {
  return Math.round(list.reduce((sum, power) => sum + power.value, 0) / list.length);
}
