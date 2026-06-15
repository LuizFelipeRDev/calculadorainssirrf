

import { inssTable } from '@/app/components/inssCalculator'
import React, { useState } from 'react'

export default function InssPage() {
    const [salario, setSalario] = useState('')
    const [tabela, setTabela] = useState('2024')
    const [resultado, setResultado] = useState<string | null>(null)

    const real = (n: number) =>
        n.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })


    const handleCalculate = () => {
        const sal = Number(salario)

        if(!sal || sal <= 0){
            setResultado('salario invalido')
            return
        }

        const tabelaSelecionada = inssTable[tabela]
        const inss = calcularINSS(sal, tabelaSelecionada)

        setResultado(`
                Salário:
            `)

    }

}
