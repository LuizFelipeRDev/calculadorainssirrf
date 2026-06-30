import styled from 'styled-components'
import { theme } from '../../styles/theme'

export const FooterContainer = styled.footer`
    background-color: ${theme.colors.primary};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1.5rem 10%;
    box-shadow: 0 -1px 10px rgba(0,0,0,0.1);
    width: 100%;
`

export const FooterText = styled.p`
    font-size: 0.9rem;
    color: #333;
    margin: 0;
`

export const FooterTitle = styled.p`
    font-size: 1.1rem;
    font-weight: 600;
    color: #333;
    margin: 0 0 0.3rem 0;
`

export const FooterDescription = styled.p`
    font-size: 0.8rem;
    color: #666;
    margin: 0.3rem 0 0 0;
    text-align: center;
    max-width: 400px;
`
