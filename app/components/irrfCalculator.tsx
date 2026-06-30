export type FaixaIRRF = {
  min: number;
  max: number | null;
  aliquota: number;
  deducao: number;
  insento?: boolean;
};

export type IRRFTable = {
  periodo: string;
  faixas: FaixaIRRF[];
  deducaoPorDependente: number;
};

export const irrfTable: Record<string, IRRFTable> = {
  "2021": {
    periodo: "2021",
    deducaoPorDependente: 189.59,
    faixas: [
      { min: 0, max: 1903.98, aliquota: 0, deducao: 0, insento: true },
      { min: 1903.99, max: 2826.65, aliquota: 0.075, deducao: 142.80 },
      { min: 2826.66, max: 3751.05, aliquota: 0.15, deducao: 354.80 },
      { min: 3751.06, max: 4664.68, aliquota: 0.225, deducao: 636.13 },
      { min: 4664.69, max: null, aliquota: 0.275, deducao: 869.36 }
    ]
  },

  "2022": {
    periodo: "2022",
    deducaoPorDependente: 189.59,
    faixas: [
      { min: 0, max: 1903.98, aliquota: 0, deducao: 0, insento: true },
      { min: 1903.99, max: 2826.65, aliquota: 0.075, deducao: 142.80 },
      { min: 2826.66, max: 3751.05, aliquota: 0.15, deducao: 354.80 },
      { min: 3751.06, max: 4664.68, aliquota: 0.225, deducao: 636.13 },
      { min: 4664.69, max: null, aliquota: 0.275, deducao: 869.36 }
    ]
  },

  "2023.01": {
    periodo: "01/2023 a 04/2023",
    deducaoPorDependente: 189.59,
    faixas: [
      { min: 0, max: 1903.98, aliquota: 0, deducao: 0, insento: true },
      { min: 1903.99, max: 2826.65, aliquota: 0.075, deducao: 142.80 },
      { min: 2826.66, max: 3751.05, aliquota: 0.15, deducao: 354.80 },
      { min: 3751.06, max: 4664.68, aliquota: 0.225, deducao: 636.13 },
      { min: 4664.69, max: null, aliquota: 0.275, deducao: 869.36 }
    ]
  },

  "2023.05": {
    periodo: "05/2023 em diante",
    deducaoPorDependente: 189.59,
    faixas: [
      { min: 0, max: 2112, aliquota: 0, deducao: 0, insento: true },
      { min: 2112.01, max: 2826.65, aliquota: 0.075, deducao: 158.40 },
      { min: 2826.66, max: 3751.05, aliquota: 0.15, deducao: 370.40 },
      { min: 3751.06, max: 4664.68, aliquota: 0.225, deducao: 651.71 },
      { min: 4664.69, max: null, aliquota: 0.275, deducao: 884.96 }
    ]
  },

  "2024": {
    periodo: "2024",
    deducaoPorDependente: 189.59,
    faixas: [
      { min: 0, max: 2112, aliquota: 0, deducao: 0, insento: true },
      { min: 2112.01, max: 2826.65, aliquota: 0.075, deducao: 158.40 },
      { min: 2826.66, max: 3751.05, aliquota: 0.15, deducao: 370.40 },
      { min: 3751.06, max: 4664.68, aliquota: 0.225, deducao: 651.71 },
      { min: 4664.69, max: null, aliquota: 0.275, deducao: 884.96 }
    ]
  },

  "2025": {
    periodo: "2025",
    deducaoPorDependente: 227.25,
    faixas: [
      { min: 0, max: 2210, aliquota: 0, deducao: 0, insento: true },
      { min: 2210.01, max: 2826.65, aliquota: 0.075, deducao: 165.75 },
      { min: 2826.66, max: 3751.05, aliquota: 0.15, deducao: 380.00 },
      { min: 3751.06, max: 4664.68, aliquota: 0.225, deducao: 660.00 },
      { min: 4664.69, max: null, aliquota: 0.275, deducao: 900.00 }
    ]
  },

  "2026": {
    periodo: "2026",
    deducaoPorDependente: 227.25,
    faixas: [
      { min: 0, max: 2300, aliquota: 0, deducao: 0, insento: true },
      { min: 2300.01, max: 2826.65, aliquota: 0.075, deducao: 172.50 },
      { min: 2826.66, max: 3751.05, aliquota: 0.15, deducao: 390.00 },
      { min: 3751.06, max: 4664.68, aliquota: 0.225, deducao: 680.00 },
      { min: 4664.69, max: null, aliquota: 0.275, deducao: 920.00 }
    ]
  }
};