import React from 'react'
import { inssTable } from '../components/InnsTable'

export const CalcularINSS = (salario:number,periodo:string) => {
    const tabela = inssTable[periodo]

    const faixa = tabela.faixas.find(
      (f) => salario >= f.min && (f.max === null || salario <=f.max)
    )

    if(!faixa) return 0

    return salario * faixa.aliquota - faixa.deducao
}
