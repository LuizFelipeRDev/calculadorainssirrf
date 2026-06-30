'use client'
import { CalcularIrrf } from "@/app/util/CalcularIrrf";
import { formatarNumero, limparMoeda } from "@/app/util/FormatarMoeda";
import { useState } from "react";
import { Bar, Divisor, H1, H2, InputWrapper, Main } from "../../styles/globalStyle"
import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input";
import { CalcEmptyState, CalcErrorState, CalcResultHeader } from "@/app/components/CalcMessage";

export default function IrrfPage() {
    const [salario, setSalario] = useState("");
    const [tabela, setTabela] = useState("2026");
    const [numDependentes, setNumDependentes] = useState("0");
    const [pensao, setPensao] = useState("");
    const [outrasDeducoes, setOutrasDeducoes] = useState("");
    const [descontoSimplificado, setDescontoSimplificado] = useState(false);
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

        const valPensao = limparMoeda(pensao);
        const valOutras = limparMoeda(outrasDeducoes);

        const res = CalcularIrrf(
            validaSalario,
            tabela,
            Number(numDependentes),
            valPensao,
            valOutras,
            descontoSimplificado
        );

        if (!res) {
            setResultado("Período não encontrado.");
            setIsCalculado(true);
            return;
        }

        let texto = `Período Calculado: ${tabela}\n`;
        texto += `Salário Bruto: R$ ${formatarNumero(validaSalario)}\n`;
        texto += `INSS: R$ ${formatarNumero(res.inss)}\n`;

        if (res.numDependentes > 0) {
            texto += `Dependentes (${res.numDependentes}): R$ ${formatarNumero(res.deducaoDependentes)}\n`;
        }
        if (res.pensao > 0) {
            texto += `Pensão Alimentícia: R$ ${formatarNumero(res.pensao)}\n`;
        }
        if (res.outrasDeducoes > 0) {
            texto += `Outras Deduções: R$ ${formatarNumero(res.outrasDeducoes)}\n`;
        }
        if (res.descontoSimplificado) {
            texto += `Desconto Simplificado: R$ 528,00\n`;
        }

        texto += `\nBase de Cálculo: R$ ${formatarNumero(res.baseCalculo)}\n`;
        texto += `Faixa de Enquadramento: ${res.faixaNome}\n`;

        if (res.aliquota > 0) {
            texto += `Alíquota: ${(res.aliquota * 100).toFixed(1)}%\n`;
            texto += `Parcela a Deduzir: R$ ${formatarNumero(res.deducaoFaixa)}\n\n`;
            texto += `IRRF = R$ ${formatarNumero(res.baseCalculo)} × ${(res.aliquota * 100).toFixed(1)}% - R$ ${formatarNumero(res.deducaoFaixa)}\n`;
        }

        texto += `\nValor do IRRF: R$ ${formatarNumero(res.irrf)}`;

        setResultado(texto);
        setIsCalculado(true)
    }

    function handleErase() {
        setSalario("");
        setPensao("");
        setOutrasDeducoes("");
        setNumDependentes("0");
        setDescontoSimplificado(false);
        setResultado("");
        setIsCalculado(false);
        setCalculoError(false);
    }

    return (
        <Main>
            <H1>Calculadora IRRF</H1>
            <H2 style={{ padding: '1rem' }}>Informe:</H2>
            <Divisor />

            <InputWrapper>
                <H2>Remuneração Bruta: </H2>
                <Input
                    value={salario}
                    onChange={(e) => setSalario(e.target.value)}
                    placeholder="0,00"
                    maskType="currency"
                />
            </InputWrapper>
            <Divisor />

            <InputWrapper>
                <H2>Período Tabela IRRF: </H2>
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
                <H2>Nº de Dependentes: </H2>
                <select value={numDependentes} onChange={(e) => setNumDependentes(e.target.value)}>
                    {Array.from({ length: 9 }, (_, i) => (
                        <option key={i} value={i}>{String(i).padStart(2, '0')}</option>
                    ))}
                </select>
            </InputWrapper>
            <p style={{ fontSize: '0.85rem', color: '#666', margin: '-0.5rem 0 0.5rem 0' }}>Campo opcional</p>
            <Divisor />

            <InputWrapper>
                <H2>Pensão Alimentícia: </H2>
                <Input
                    value={pensao}
                    onChange={(e) => setPensao(e.target.value)}
                    placeholder="0,00"
                    maskType="currency"
                />
            </InputWrapper>
            <p style={{ fontSize: '0.85rem', color: '#666', margin: '-0.5rem 0 0.5rem 0' }}>Campo opcional</p>
            <Divisor />

            <InputWrapper>
                <H2>Outras Deduções: </H2>
                <Input
                    value={outrasDeducoes}
                    onChange={(e) => setOutrasDeducoes(e.target.value)}
                    placeholder="0,00"
                    maskType="currency"
                />
            </InputWrapper>
            <p style={{ fontSize: '0.85rem', color: '#666', margin: '-0.5rem 0 0.5rem 0' }}>Campo opcional</p>
            <Divisor />

            <InputWrapper>
                <H2>Desconto Simplificado (R$ 528,00): </H2>
                <input
                    type="checkbox"
                    checked={descontoSimplificado}
                    onChange={(e) => setDescontoSimplificado(e.target.checked)}
                    title="Ativa o desconto de R$ 528,00 conforme Lei 14.663/23"
                />
            </InputWrapper>
            <Divisor />

            <InputWrapper>
                {isCalculado ? (
                    <Button text="Recalcular" onClick={handleCalculate} />
                ) : (
                    <Button text="Calcular" onClick={handleCalculate} />
                )}
                <Button text="Limpar" onClick={handleErase} $bgColor="#f0f0f0" $textColor="#333" $borderColor="#ccc" />
            </InputWrapper>

            <Bar />

            {calculoError ? (
                <CalcErrorState mensagem="Remuneração Bruta deve ser maior que zero!" />
            ) : resultado ? (
                <div style={{ textAlign: 'left', width: '600px', margin: '0 auto' }}>
                    <CalcResultHeader />
                    <p style={{ whiteSpace: "pre-wrap", background: '#fff', padding: '1rem', borderRadius: '8px', border: '1px solid #e0d5c0' }}>{resultado}</p>
                </div>
            ) : (
                <CalcEmptyState tipo="IRRF" />
            )}
        </Main>
    )
}
