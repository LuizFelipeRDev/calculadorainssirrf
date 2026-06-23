import React from 'react'
import { irrfTable } from '../components/irrfCalculator'
import { inssTable } from '../components/InnsTable'
import { CalcularINSS } from './CalcularInss'

export const CalcularIrrf = (salario: number, periodo: string) => {
    const tabelaIRRF = irrfTable[periodo]

    const faixa = tabelaIRRF.faixas.find(
        f => salario >= f.min && (f.max === null || salario <= f.max)
    );

    if(!faixa) return 0; 
    const inss = CalcularINSS(salario,periodo)

    const imposto = salario * faixa.aliquota - faixa.deducao - inss

    return Math.max(0,imposto);

}
