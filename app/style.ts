import styled from 'styled-components'
import { theme } from './styles/theme'

export const PageWrapper = styled.div`
    padding-inline: 10%;
    padding-top: 4rem;
`

export const IntroSection = styled.div`
    padding: 1rem;

    p {
        margin: 0.3rem 0;
    }
`

export const NewsList = styled.div`
    padding: 1rem;
    text-align: left;
    width: 100%;
    max-width: 700px;
`

export const NewsCard = styled.a`
    display: block;
    padding: 0.8rem;
    margin-bottom: 0.5rem;
    background: #fff;
    border-radius: 8px;
    border: 1px solid #e0d5c0;
    text-decoration: none;
    color: inherit;
    cursor: pointer;
    transition: background 0.15s;
    border:4px solid  transparent;

    &:hover {
        background: #faf8f4;
        border:4px solid #EFC87F
    }
`

export const CardTitle = styled.div`
    font-weight: 600;
    font-size: 1rem;
    color: #333;
`

export const CardImage = styled.img`
    width: 100%;
    height: 160px;
    object-fit: cover;
    border-radius: 6px;
    margin: 0.5rem 0;
`

export const CardDescription = styled.p`
    font-size: 0.85rem;
    color: #666;
    margin: 0.3rem 0;
`

export const CardDate = styled.span`
    font-size: 0.75rem;
    color: #999;
`

export const StatusText = styled.p`
    padding: 1rem;
    color: #888;
`

export const EbcLabel = styled.span`
    font-size: 0.8rem;
    font-weight: 400;
    margin-left: 0.5rem;
    color: #666;
`

export const PaginationContainer = styled.div`
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    padding: 0 1rem 1.5rem;
`

export const NavButton = styled.button<{ $disabled?: boolean }>`
    padding: 0.5rem 1rem;
    background: ${({ $disabled }) => ($disabled ? '#e0d5c0' : theme.colors.secundary)};
    color: ${({ $disabled }) => ($disabled ? '#999' : '#333')};
    border: 1px solid ${theme.colors.secundary};
    border-radius: 6px;
    cursor: ${({ $disabled }) => ($disabled ? 'default' : 'pointer')};
    font-weight: 600;
    font-size: 0.9rem;
`

export const PageButton = styled.button<{ $active?: boolean }>`
    padding: 0.5rem 0.9rem;
    background: ${({ $active }) => ($active ? theme.colors.secundary : '#fff')};
    color: #333;
    border: 1px solid ${theme.colors.secundary};
    border-radius: 6px;
    cursor: pointer;
    font-weight: ${({ $active }) => ($active ? 700 : 400)};
    font-size: 0.9rem;
    transition: 0.1s ease-in-out;

    &:hover {
        background: ${({ $active }) => ($active ? theme.colors.secundary : theme.colors.quartiary)};
    }
`
