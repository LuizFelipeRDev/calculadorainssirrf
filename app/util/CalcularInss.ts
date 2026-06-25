import React from 'react'
import { inssTable } from '../components/InnsTable'

export type FaixaCalculada = {
    minExibicao: number;
    maxExibicao: number;
    aliquota: number;
    contribuicao: number;
};

export type ResultadoINSS = {
    total: number;
    faixas: FaixaCalculada[];
};

export const CalcularINSS = (salario: number, periodo: string): ResultadoINSS => {
    const tabela = inssTable[periodo];
    const faixasCalculadas: FaixaCalculada[] = [];
    let prevMax = 0;

    for (const faixa of tabela.faixas) {
        const currentMax = faixa.max ?? salario;

        if (salario <= prevMax) break;

        const maxExibicao = Math.min(salario, currentMax);
        const valorNaFaixa = maxExibicao - prevMax;

        if (valorNaFaixa <= 0) break;

        const contribuicao = valorNaFaixa * faixa.aliquota;

        faixasCalculadas.push({
            minExibicao: prevMax,
            maxExibicao,
            aliquota: faixa.aliquota,
            contribuicao,
        });

        prevMax = currentMax;
    }

    const total = faixasCalculadas.reduce((acc, f) => acc + f.contribuicao, 0);

    return { total, faixas: faixasCalculadas };
};
