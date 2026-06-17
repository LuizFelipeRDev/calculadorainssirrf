import { INSSFaixas } from "../components/inssCalculator";


export function calcularINSS(salario: number, tabela: INSSFaixas) {
    if (!tabela) { throw new Error('Tabela não encontrada') }
    const { faixa1, faixa2, faixa3, faixa4 } = tabela

    let inss = 0

    if (salario <= faixa1) {
        inss = salario * 0.075;
    } else if (salario <= faixa2) {
        inss =
            faixa1 * 0.075 +
            (salario - faixa1) * 0.09;
    } else if (salario <= faixa3) {
        inss =
            faixa1 * 0.075 +
            (faixa2 - faixa1) * 0.09 +
            (salario - faixa2) * 0.12
    } else if (salario <= faixa4) {
        inss =
            faixa1 * 0.075 +
            (faixa2 - faixa1) * 0.09 +
            (faixa3 - faixa2) * 0.12 +
            (salario - faixa3) * 0.14
    } else {
        inss =
            faixa1 * 0.075 +
            (faixa2 - faixa1) * 0.09 +
            (faixa3 - faixa2) * 0.12 +
            (faixa4 - faixa3) * 0.14
    }
    return inss;

}