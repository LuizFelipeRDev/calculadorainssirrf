
export type FaixaINSS = {
    min: number;
    max: number | null;
    aliquota: number;
    deducao: number
}

export type INSSTabela = {
    periodo: string;
    faixas: FaixaINSS[]
}

export const inssTable: Record<string, INSSTabela> = {
    '2021': {
        periodo: '2021',
        faixas: [
            { min: 0, max: 1100, aliquota: .075, deducao: 0 },
            { min: 1100.01, max: 2203.48, aliquota: .09, deducao: 82.50 },
            { min: 2203.49, max: 3305.22, aliquota: 0.12, deducao: 181.81 },
            { min: 3305.23, max: null, aliquota: 0.14, deducao: 314.02 },
        ]
    },
    '2022': {
        periodo: '2022',
        faixas: [
            { min: 0, max: 1212, aliquota: 0.075, deducao: 0 },
            { min: 1212.01, max: 2427.35, aliquota: 0.09, deducao: 90.9 },
            { min: 2427.36, max: 3641.03, aliquota: 0.12, deducao: 163.82 },
            { min: 3641.04, max: null, aliquota: 0.14, deducao: 236.73 }
        ]
    }, 
    '2023.01': {
        periodo: '2023.01',
        faixas: [
            { min: 0, max: 1302, aliquota: 0.075, deducao: 0 },
            { min: 1302.01, max: 2571.29, aliquota: 0.09, deducao: 105.90 },
            { min: 2571.30, max: 3856.94, aliquota: 0.12, deducao: 193.00 },
            { min: 3856.95, max: null, aliquota: 0.14, deducao: 273.01 }
        ]
    },
    '2023.05': {
        periodo: '2023.05',
        faixas: [
            { min: 0, max: 1412, aliquota: 0.075, deducao: 0 },
            { min: 1412.01, max: 2666.68, aliquota: 0.09, deducao: 105.90 },
            { min: 2666.69, max: 4000.03, aliquota: 0.12, deducao: 193.00 },
            { min: 4000.04, max: null, aliquota: 0.14, deducao: 273.01 }
        ]
    }, '2024': {
        periodo: '2024',
        faixas: [
            { min: 0, max: 1412, aliquota: 0.075, deducao: 0 },
            { min: 1412.01, max: 2666.68, aliquota: 0.09, deducao: 105.90 },
            { min: 2666.69, max: 4000.03, aliquota: 0.12, deducao: 193.00 },
            { min: 4000.04, max: null, aliquota: 0.14, deducao: 318.00 }
        ]
    },

    '2025': {
        periodo: '2025',
        faixas: [
            { min: 0, max: 1518, aliquota: 0.075, deducao: 0 },
            { min: 1518.01, max: 2793.88, aliquota: 0.09, deducao: 113.85 },
            { min: 2793.89, max: 4190.83, aliquota: 0.12, deducao: 215.00 },
            { min: 4190.84, max: null, aliquota: 0.14, deducao: 365.00 }
        ]
    },

    '2026': {
        periodo: '2026',
        faixas: [
            { min: 0, max: 1621, aliquota: 0.075, deducao: 0 },
            { min: 1621.01, max: 2902.84, aliquota: 0.09, deducao: 120.00 },
            { min: 2902.85, max: 4354.27, aliquota: 0.12, deducao: 230.00 },
            { min: 4354.28, max: null, aliquota: 0.14, deducao: 380.00 }
        ]
    }


}