export type Professional = {
  id: string;
  name: string;
  specialty: string;
  summary: string;
  details: string;
  initials: string;
};

export const professionals: Professional[] = [
  {
    id: "demo-1",
    name: "Ari Ventolume",
    initials: "AV",
    specialty: "Psicologia",
    summary: "Escuta e reflexão sobre os caminhos do cotidiano.",
    details:
      "Perfil fictício que ilustra uma apresentação voltada à escuta, às relações e ao autoconhecimento.",
  },
  {
    id: "demo-2",
    name: "Noa Floravento",
    initials: "NF",
    specialty: "Nutrição",
    summary: "Uma relação mais tranquila com a alimentação.",
    details:
      "Personagem demonstrativo com apresentação sobre hábitos, cultura alimentar e respeito às diferentes rotinas.",
  },
  {
    id: "demo-3",
    name: "Lumi Solarelo",
    initials: "LS",
    specialty: "Clínica geral",
    summary: "Um olhar amplo para as necessidades de cuidado.",
    details:
      "Perfil ilustrativo para apresentar a especialidade de clínica geral, sem orientações ou serviços de saúde reais.",
  },
  {
    id: "demo-4",
    name: "Eli Marulino",
    initials: "EM",
    specialty: "Psicologia",
    summary: "Espaço para conversar sobre mudanças e descobertas.",
    details:
      "Personagem fictício com apresentação focada em transições de vida, vínculos e experiências individuais.",
  },
  {
    id: "demo-5",
    name: "Íris Nuvélia",
    initials: "IN",
    specialty: "Nutrição",
    summary: "Alimentação possível para diferentes cotidianos.",
    details:
      "Perfil de demonstração que exemplifica uma apresentação sobre diversidade alimentar e escolhas cotidianas.",
  },
  {
    id: "demo-6",
    name: "Ravi Brisálio",
    initials: "RB",
    specialty: "Clínica geral",
    summary: "Cuidado atento à história de cada pessoa.",
    details:
      "Personagem inventado para demonstrar a exploração de perfis. Não representa uma pessoa habilitada para atendimento.",
  },
];
