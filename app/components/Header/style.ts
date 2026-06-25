
import styled from 'styled-components'
import { theme } from '../../styles/theme'


export const NavContainer = styled.nav`
    background-color: ${theme.colors.primary};
    display:flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.2rem 10%;
    box-shadow: 0 1px 20px;
    position: fixed;
    width: 100%;
`

export const LinksContainer = styled.ul`
    list-style: none;
    display:flex;
    gap:2rem;
    li{
        transition: 0.1s ease-in-out;
        a{
            text-decoration:none;
            color:inherit;
            font-size:1.2rem
        }
        border-bottom: 2px solid transparent;
        &:hover{
            border-bottom: 2px solid black;
        }
    }
`
