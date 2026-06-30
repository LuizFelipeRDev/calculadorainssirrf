import { NextRequest, NextResponse } from 'next/server'

const RSS_URL = 'https://agenciabrasil.ebc.com.br/rss/ultimasnoticias/feed.xml'

type Noticia = {
    titulo: string
    link: string
    descricao: string
    data: string
    categoria: string
    imagem: string
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
        const imagem = getTag('imagem-destaque')
        const descricao = getTag('description')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/<[^>]*>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
        const data = getTag('pubDate')
        const categoria = getTag('category')

        if (titulo) {
            items.push({ titulo, link, descricao, data, categoria, imagem })
        }
    }

    return items
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
        const noticias = parseRSS(xml)

        const resultado = noticias.map(n => ({
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
