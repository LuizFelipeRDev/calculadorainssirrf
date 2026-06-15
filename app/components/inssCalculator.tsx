
export type INSSFaixas = {
    faixa1: number;
    faixa2: number;
    faixa3: number;
    faixa4: number;
}

export const inssTable: Record<string, INSSFaixas> = {
    '2021': {
        faixa1: 1100,
        faixa2: 2203.48,
        faixa3: 3305.22,
        faixa4: 6433.57
    },
    '2022': {
        faixa1: 1212,
        faixa2: 2427.35,
        faixa3: 3641.03,
        faixa4: 7087.22
    },
    '2023.1': {
        faixa1: 1302,
        faixa2: 2571.29,
        faixa3: 3856.94,
        faixa4: 7507.49
    },
    '2023.05': {
        faixa1: 1412,
        faixa2: 2666.68,
        faixa3: 4000.03,
        faixa4: 7786.02
    }

}