import { irrfTable } from '../components/irrfCalculator'
import { CalcularINSS } from './CalcularInss'

export const CalcularIrrf = (salario: number, periodo: string) => {
    const tabelaIRRF = irrfTable[periodo]
    if (!tabelaIRRF) return 0

    const inss = CalcularINSS(salario, periodo)
    const baseCalculo = salario - inss

    const faixa = tabelaIRRF.faixas.find(
        f => baseCalculo >= f.min && (f.max === null || baseCalculo <= f.max)
    )

    if (!faixa) return 0

    return Math.max(0, baseCalculo * faixa.aliquota - faixa.deducao)
}
