import Link from 'next/link'
import React from 'react'
import { LinksContainer, NavContainer } from './style'

const Header = () => {

    const menuLinks = [
        {
            name: 'Home',
            href: '/home'
        },
        {
            name: 'INSS',
            href: '/inss'
        },
        {
            name: 'IRRF',
            href: '/irrf'
        }
    ]


    return (
        <NavContainer>
            <div style={{fontSize:30, fontWeight:600,zIndex:99}}>LueCalc</div>

            <LinksContainer>
                {menuLinks.map((link, index) => {
                    return (
                        <li key={index}>
                            <Link href={link.href}>{link.name}</Link>
                        </li>
                    )
                })}
            </LinksContainer>

        </NavContainer>
    )
}

export default Header