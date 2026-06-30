import { NextRequest, NextResponse } from 'next/server'

const RSS_URL = 'https://agenciabrasil.ebc.com.br/rss/ultimasnoticias/feed.xml'

const KEYWORDS = [
    'inss', 'irrf', 'fgts', 'previdência', 'previdencia',
    'imposto de renda', 'receita federal', 'trabalho',
    'emprego', 'salário mínimo', 'salario minimo',
    'contribuição', 'contribuicao', 'aposentadoria', 'pensão', 'pensao'
]

type Noticia = {
    titulo: string
    link: string
    descricao: string
    data: string
    categoria: string
}

function parseRSS(xml: string): Noticia[] {
    const items: Noticia[] = []
    const itemRegex = /<item>([\s\S]*?)<\/item>/gi
    let match

    while ((match = itemRegex.exec(xml)) !== null) {
        const content = match[1]

        const getTag = (tag: string) => {
            const m = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i').exec(content)
            return m ? m[1].trim() : ''
        }

        const titulo = getTag('title')
        const link = getTag('link')
        const descricao = getTag('description').replace(/<[^>]*>/g, '').trim()
        const data = getTag('pubDate')
        const categoria = getTag('category')

        if (titulo) {
            items.push({ titulo, link, descricao, data, categoria })
        }
    }

    return items
}

function filtrarPorKeywords(items: Noticia[]): Noticia[] {
    return items.filter(item => {
        const texto = `${item.titulo} ${item.descricao} ${item.categoria}`.toLowerCase()
        return KEYWORDS.some(kw => texto.includes(kw))
    })
}

export async function GET(request: NextRequest) {
    try {
        const response = await fetch(RSS_URL, {
            next: { revalidate: 1800 }
        })

        if (!response.ok) {
            throw new Error(`RSS retornou ${response.status}`)
        }

        const xml = await response.text()
        const todasNoticias = parseRSS(xml)
        const filtradas = filtrarPorKeywords(todasNoticias)

        const resultado = filtradas.slice(0, 15).map(n => ({
            ...n,
            data: formatarData(n.data)
        }))

        return NextResponse.json({
            total: resultado.length,
            noticias: resultado,
            fonte: 'Agência Brasil - EBC'
        })
    } catch (error) {
        return NextResponse.json(
            { erro: 'Não foi possível carregar as notícias' },
            { status: 500 }
        )
    }
}

function formatarData(dataRSS: string): string {
    if (!dataRSS) return ''
    try {
        const data = new Date(dataRSS)
        return data.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })
    } catch {
        return dataRSS
    }
}
