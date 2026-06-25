'use client'
import { CalcularINSS } from "@/app/util/CalcularInss";
import { formatarNumero, limparMoeda } from "@/app/util/FormatarMoeda";
import { useState } from "react";
import { Bar, Divisor, H1, H2, InputWrapper, Main } from "../../styles/globalStyle"
import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input";

/* TODO
- Mapear opceos
- Estilizar/criar props Button ser ultilizavel no 'limpar'
*/
export default function inssPage() {
    const [salario, setSalario] = useState("3000");
    const [tabela, setTabela] = useState("2026");
    const [resultado, setResultado] = useState("");
    const [calculoError, setCalculoError] = useState(false);
    const [isCalculado, setIsCalculado] = useState(false)

    function handleCalculate() {
        const validaSalario = limparMoeda(salario);

        if (validaSalario <= 0) {
            setCalculoError(true);
            setResultado("");
            return;
        }

        setCalculoError(false);
        const { total, faixas } = CalcularINSS(validaSalario, tabela);

        let texto = `Período Calculado: ${tabela}\nValor Bruto Informado: R$ ${formatarNumero(validaSalario)}\nValor do INSS: R$ ${formatarNumero(total)}\n\nComo foi calculado:\n`;

        for (let i = 0; i < faixas.length; i++) {
            const f = faixas[i];
            const perc = (f.aliquota * 100).toFixed(0);
            if (f.minExibicao === 0) {
                texto += `Faixa ${i + 1}: R$ ${formatarNumero(f.maxExibicao)} x ${perc}% = R$ ${formatarNumero(f.contribuicao)}\n`;
            } else {
                texto += `Faixa ${i + 1}: (R$ ${formatarNumero(f.maxExibicao)} - R$ ${formatarNumero(f.minExibicao)}) x ${perc}% = R$ ${formatarNumero(f.contribuicao)}\n`;
            }
            setIsCalculado(true)
        }

        const contribs = faixas.map((f) => `R$ ${formatarNumero(f.contribuicao)}`).join(" + ");
        texto += `\nTotal Contribuição INSS: R$ ${formatarNumero(total)} = (${contribs})`;

        setResultado(texto);
    }

    function handleErase() {
        setSalario("");
        setResultado("");
        setIsCalculado(false)
    }


    return (
        <Main>
            <H1>Calculadora INSS</H1>

            <H2 style={{ padding: '1rem' }}>Informe:</H2>

            <Divisor />

            <InputWrapper >
                <H2>Remuneração Bruta: </H2>
                <Input
                    value={salario}
                    onChange={(e) => setSalario(e.target.value)}
                    placeholder="Salário bruto"
                    maskType="currency"
                />

            </InputWrapper>

            <Divisor />

            <InputWrapper>
              
                <H2>Periodo Tabela INSS: </H2>
                <select value={tabela} onChange={(e) => setTabela(e.target.value)}>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023.01">2023.01</option>
                    <option value="2023.05">2023.05</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                </select>

            </InputWrapper>

            <Divisor />

            <InputWrapper>
                {isCalculado ? (<Button
                    text="Recalcular"
                    onClick={handleCalculate}
                />) :
                    (<Button
                        text="Calcular"
                        onClick={handleCalculate}
                    />)}
                <button onClick={handleErase}>Limpar</button>
            </InputWrapper>




            <Bar />
            {calculoError ? (
                <p>Remuneração Bruta deve ser maior que zero!</p>
            ) : (
                resultado && <p style={{ whiteSpace: "pre-wrap" }}>{resultado}</p>
            )}
        </Main>
    );
}