'use client'
import { CalcularINSS } from "@/app/util/CalcularInss";
import { useState } from "react";


export default function inssPage() {
    const [salario, setSalario] = useState("");
    const [tabela, setTabela] = useState("2024");
    const [resultado, setResultado] = useState("");

    function handleCalculate() {
        const valor = CalcularINSS(Number(salario), tabela);

        setResultado(
            `INSS: R$ ${valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            })}`
        );
    }

    function handleErase() {
        setSalario("");
        setResultado("");
    }

    return (
        <div style={{ padding: 40 }}>
            <h1>Calculadora INSS</h1>

            <input
                type="number"
                value={salario}
                onChange={(e) => setSalario(e.target.value)}
                placeholder="Salário bruto"
            />

            <select value={tabela} onChange={(e) => setTabela(e.target.value)}>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023.01">2023.01</option>
                <option value="2023.05">2023.05</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
            </select>

            <button onClick={handleCalculate}>Calcular</button>
            <button onClick={handleErase}>Limpar</button>

            {resultado && <pre style={{ marginTop: 20 }}>{resultado}</pre>}
        </div>
    );
}