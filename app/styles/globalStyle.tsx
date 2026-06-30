import styled, { createGlobalStyle } from "styled-components";
import { theme } from './theme'
export const GlobalStyle = createGlobalStyle`
*{
  margin:0;
  padding:0;
  box-sizing: border-box;
}
  body {
    font-family: var(--font-roboto), sans-serif;
    color: black;
  }
`;

export const H1 = styled.h1`
  font-weight: 600;
  font-size:1.5rem;
  background-color: ${theme.colors.secundary};
  width: 100%;
  padding: ${theme.spacing.primary} 0;
`

export const H2 = styled.h2`
  font-weight: 600;
  font-size:1.2rem;
`

export const Divisor = styled.div`
  border-bottom: 2px solid ${theme.colors.terciary};
  width:80%;
  margin-bottom: ${theme.spacing.primary};
  border-radius: 8px;
`

export const Main = styled.main`
    display:flex;
    flex-direction: column;
    text-align:center;
   align-items: center;
    
`

export const InputWrapper = styled.div`
  padding:0 0 ${theme.spacing.primary} 0;
  display: flex;
  justify-content: center;
  gap:0.5rem
`

export const Bar = styled.div`
  height: 2rem;
  background-color: ${theme.colors.secundary};
  width:100%;
  margin-bottom: ${theme.spacing.primary};
`