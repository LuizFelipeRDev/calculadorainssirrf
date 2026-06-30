'use client'
import { useEffect, useState } from "react"
import { Bar, Divisor, H1, H2, Main } from "./styles/globalStyle"
import { theme } from "./styles/theme"

const ITENS_POR_PAGINA = 5
const MAX_PAGINAS = 3

type Noticia = {
    titulo: string
    link: string
    descricao: string
    data: string
    categoria: string
}

export default function Home() {
    const [noticias, setNoticias] = useState<Noticia[]>([])
    const [erro, setErro] = useState("")
    const [pagina, setPagina] = useState(1)

    useEffect(() => {
        fetch("/api/noticias")
            .then(res => res.json())
            .then(data => {
                if (data.erro) setErro(data.erro)
                else setNoticias(data.noticias)
            })
            .catch(() => setErro("Erro ao carregar notícias"))
    }, [])

    const totalPaginas = Math.min(Math.ceil(noticias.length / ITENS_POR_PAGINA), MAX_PAGINAS)
    const inicio = (pagina - 1) * ITENS_POR_PAGINA
    const noticiasPagina = noticias.slice(inicio, inicio + ITENS_POR_PAGINA)

    return (
        <div style={{ paddingInline: '20rem', paddingTop: '4rem' }}>
            <Main style={{ backgroundColor: `${theme.colors.primary}` }}>
                <Divisor />
                <H1>Calculadora INSS e IRRF</H1>
                <H2 style={{ padding: '1rem' }}>Ferramentas de cálculo</H2>
                <Divisor />

                <div style={{ padding: '1rem' }}>
                    <p>Calcule o <strong>INSS</strong> e o <strong>IRRF</strong> de forma rápida e precisa.</p>
                    <p>Use os links do menu para acessar cada calculadora.</p>
                </div>

                <Bar />

                <H2 style={{ padding: '1rem' }}>
                    Últimas Notícias
                    <span style={{ fontSize: '0.8rem', fontWeight: 400, marginLeft: '0.5rem', color: '#666' }}>
                        (Agência Brasil - EBC)
                    </span>
                </H2>

                <Divisor />

                {erro && <p style={{ padding: '1rem', color: '#888' }}>{erro}</p>}

                {!erro && noticias.length === 0 && (
                    <p style={{ padding: '1rem', color: '#888' }}>Carregando notícias...</p>
                )}

                <div style={{ padding: '1rem', textAlign: 'left', width: '100%', maxWidth: '700px' }}>
                    {noticiasPagina.map((n, i) => (
                        <div key={i} style={{
                            padding: '0.8rem',
                            marginBottom: '0.5rem',
                            background: '#fff',
                            borderRadius: '8px',
                            border: '1px solid #e0d5c0'
                        }}>
                            <a
                                href={n.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    color: '#333',
                                    fontWeight: 600,
                                    textDecoration: 'none',
                                    fontSize: '1rem'
                                }}
                            >
                                {n.titulo}
                            </a>
                            <p style={{ fontSize: '0.85rem', color: '#666', margin: '0.3rem 0' }}>
                                {n.descricao.length > 150
                                    ? n.descricao.substring(0, 150) + '...'
                                    : n.descricao}
                            </p>
                            <span style={{ fontSize: '0.75rem', color: '#999' }}>{n.data}</span>
                        </div>
                    ))}
                </div>

                {noticias.length > 0 && (
                    <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        justifyContent: 'center',
                        padding: '0 1rem 1.5rem'
                    }}>
                        <button
                            onClick={() => setPagina(p => Math.max(1, p - 1))}
                            disabled={pagina === 1}
                            style={{
                                padding: '0.5rem 1rem',
                                background: pagina === 1 ? '#e0d5c0' : theme.colors.secundary,
                                color: pagina === 1 ? '#999' : '#333',
                                border: `1px solid ${theme.colors.secundary}`,
                                borderRadius: '6px',
                                cursor: pagina === 1 ? 'default' : 'pointer',
                                fontWeight: 600,
                                fontSize: '0.9rem'
                            }}
                        >
                            Anterior
                        </button>

                        {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(p => (
                            <button
                                key={p}
                                onClick={() => setPagina(p)}
                                style={{
                                    padding: '0.5rem 0.9rem',
                                    background: pagina === p ? theme.colors.secundary : '#fff',
                                    color: '#333',
                                    border: `1px solid ${theme.colors.secundary}`,
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontWeight: pagina === p ? 700 : 400,
                                    fontSize: '0.9rem',
                                    transition: '0.1s ease-in-out'
                                }}
                                onMouseEnter={(e) => {
                                    if (pagina !== p) e.currentTarget.style.background = theme.colors.quartiary
                                }}
                                onMouseLeave={(e) => {
                                    if (pagina !== p) e.currentTarget.style.background = '#fff'
                                }}
                            >
                                {p}
                            </button>
                        ))}

                        <button
                            onClick={() => setPagina(p => Math.min(totalPaginas, p + 1))}
                            disabled={pagina === totalPaginas}
                            style={{
                                padding: '0.5rem 1rem',
                                background: pagina === totalPaginas ? '#e0d5c0' : theme.colors.secundary,
                                color: pagina === totalPaginas ? '#999' : '#333',
                                border: `1px solid ${theme.colors.secundary}`,
                                borderRadius: '6px',
                                cursor: pagina === totalPaginas ? 'default' : 'pointer',
                                fontWeight: 600,
                                fontSize: '0.9rem'
                            }}
                        >
                            Próximo
                        </button>
                    </div>
                )}
            </Main>
        </div>
    )
}
