import { irrfTable } from '../components/irrfCalculator'
import { CalcularINSS } from './CalcularInss'

const DESCONTO_2026 = [
    { salario: 5000, final: 0 },
    { salario: 5500, final: 203.13 },
    { salario: 6000, final: 417.85 },
    { salario: 6500, final: 633.57 },
    { salario: 7000, final: 849.29 },
]

export type ResultadoIRRF = {
    irrf: number;
    inss: number;
    salario: number;
    baseCalculo: number;
    numDependentes: number;
    deducaoDependentes: number;
    pensao: number;
    outrasDeducoes: number;
    descontoSimplificado: boolean;
    aliquota: number;
    deducaoFaixa: number;
    faixaNome: string;
};

function aplicarReforma2026(salario: number, irrfNormal: number): number {
    if (salario <= 5000) return 0
    if (salario >= 7000) return irrfNormal

    for (let i = 0; i < DESCONTO_2026.length - 1; i++) {
        const a = DESCONTO_2026[i]
        const b = DESCONTO_2026[i + 1]
        if (salario >= a.salario && salario <= b.salario) {
            const ratio = (salario - a.salario) / (b.salario - a.salario)
            return Math.round((a.final + ratio * (b.final - a.final)) * 100) / 100
        }
    }

    return irrfNormal
}

export const CalcularIrrf = (
    salario: number,
    periodo: string,
    numDependentes: number = 0,
    pensao: number = 0,
    outrasDeducoes: number = 0,
    descontoSimplificado: boolean = false
): ResultadoIRRF | null => {
    const tabelaIRRF = irrfTable[periodo]
    if (!tabelaIRRF) return null

    const inss = CalcularINSS(salario, periodo)

    const deducaoDependentes = numDependentes * tabelaIRRF.deducaoPorDependente
    const descontoSimples = descontoSimplificado ? 528 : 0
    const totalDeducoes = deducaoDependentes + pensao + outrasDeducoes + descontoSimples

    const baseCalculo = Math.max(0, salario - inss.total - totalDeducoes)

    if (baseCalculo <= 0) {
        return {
            irrf: 0,
            inss: inss.total,
            salario,
            baseCalculo: 0,
            numDependentes,
            deducaoDependentes,
            pensao,
            outrasDeducoes,
            descontoSimplificado,
            aliquota: 0,
            deducaoFaixa: 0,
            faixaNome: "Dentro da faixa de isenção"
        }
    }

    const faixa = tabelaIRRF.faixas.find(
        f => baseCalculo >= f.min && (f.max === null || baseCalculo <= f.max)
    )

    if (!faixa) return null

    const aliquota = faixa.aliquota
    const deducaoFaixa = faixa.deducao
    let irrf = Math.max(0, baseCalculo * aliquota - deducaoFaixa)

    if (periodo === "2026") {
        irrf = aplicarReforma2026(salario, irrf)
    }

    const numFaixa = tabelaIRRF.faixas.indexOf(faixa) + 1
    const faixaNome = faixa.insento
        ? "Isento"
        : `${numFaixa}ª Faixa — ${(aliquota * 100).toFixed(1)}%`

    return {
        irrf,
        inss: inss.total,
        salario,
        baseCalculo,
        numDependentes,
        deducaoDependentes,
        pensao,
        outrasDeducoes,
        descontoSimplificado,
        aliquota,
        deducaoFaixa,
        faixaNome
    }
}
