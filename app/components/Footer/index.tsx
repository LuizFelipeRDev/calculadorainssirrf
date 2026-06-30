import React from 'react'
import { FooterContainer, FooterDescription, FooterText, FooterTitle } from './style'

const Footer = () => {
    return (
        <FooterContainer>
            <FooterTitle>Calculadora INSS e IRRF</FooterTitle>
            <FooterDescription>
                Ferramenta simples e rápida para calcular contribuições ao INSS e Imposto de Renda Retido na Fonte.
            </FooterDescription>
            <FooterText>&copy; Lue Project</FooterText>
        </FooterContainer>
    )
}

export default Footer
