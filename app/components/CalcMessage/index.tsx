import { Calculator, FileText, Info } from "lucide-react"

export function CalcEmptyState({ tipo }: { tipo: "INSS" | "IRRF" }) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '2rem',
            color: '#888'
        }}>
            <Calculator size={48} strokeWidth={1.5} />
            <p style={{ margin: 0, fontSize: '1rem' }}>
                Preencha os campos acima e clique em <strong>Calcular</strong>
            </p>
            <p style={{ margin: 0, fontSize: '0.85rem' }}>
                para ver o resultado do cálculo do {tipo}
            </p>
        </div>
    )
}

export function CalcErrorState({ mensagem }: { mensagem: string }) {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            justifyContent: 'center',
            color: '#c00'
        }}>
            <Info size={20} />
            <p>{mensagem}</p>
        </div>
    )
}

export function CalcResultHeader() {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            justifyContent: 'center',
            marginBottom: '0.5rem'
        }}>
            <FileText size={20} />
            <h3 style={{ margin: 0 }}>Resultado do Cálculo</h3>
        </div>
    )
}
