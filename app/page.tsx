'use client'
import { useEffect, useState } from "react"
import { Bar, Divisor, H1, H2, Main } from "./styles/globalStyle"
import { theme } from "./styles/theme"
import {
    CardDate,
    CardDescription,
    CardImage,
    CardTitle,
    EbcLabel,
    IntroSection,
    NavButton,
    NewsCard,
    NewsList,
    PageButton,
    PageWrapper,
    PaginationContainer,
    StatusText,
} from "./style"

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
        <PageWrapper>
            <Main Main style={{ backgroundColor: `${theme.colors.primary}` }}>
                <Divisor />
                <H1>Calculadora INSS e IRRF</H1>
                <H2 style={{ padding: '1rem' }}>Ferramentas de cálculo</H2>
                <Divisor />

                <IntroSection>
                    <p>Calcule o <strong>INSS</strong> e o <strong>IRRF</strong> de forma rápida e precisa.</p>
                    <p>Use os links do menu para acessar cada calculadora.</p>
                </IntroSection>

                <Bar />

                <H2 style={{ padding: '1rem' }}>
                    Últimas Notícias
                    <EbcLabel>(Agência Brasil - EBC)</EbcLabel>
                </H2>

                <Divisor />

                {erro && <StatusText>{erro}</StatusText>}

                {!erro && noticias.length === 0 && (
                    <StatusText>Carregando notícias...</StatusText>
                )}

                <NewsList>
                    {noticiasPagina.map((n, i) => (
                        <NewsCard key={i} href={n.link} target="_blank" rel="noopener noreferrer"
                        style={{}}>
                            <CardTitle>{n.titulo}</CardTitle>
                            {n.imagem && (
                                <CardImage src={n.imagem} alt={n.titulo} />
                            )}
                            <CardDescription>
                                {n.descricao.length > 150
                                    ? n.descricao.substring(0, 150) + '...'
                                    : n.descricao}
                            </CardDescription>
                            <CardDate>{n.data}</CardDate>
                        </NewsCard>
                    ))}
                </NewsList>

                {noticias.length > 0 && (
                    <PaginationContainer>
                        <NavButton
                            onClick={() => setPagina(p => Math.max(1, p - 1))}
                            disabled={pagina === 1}
                            $disabled={pagina === 1}
                        >
                            Anterior
                        </NavButton>

                        {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(p => (
                            <PageButton
                                key={p}
                                onClick={() => setPagina(p)}
                                $active={pagina === p}
                            >
                                {p}
                            </PageButton>
                        ))}

                        <NavButton
                            onClick={() => setPagina(p => Math.min(totalPaginas, p + 1))}
                            disabled={pagina === totalPaginas}
                            $disabled={pagina === totalPaginas}
                        >
                            Próximo
                        </NavButton>
                    </PaginationContainer>
                )}
            </Main>
        </PageWrapper>
    )
}
