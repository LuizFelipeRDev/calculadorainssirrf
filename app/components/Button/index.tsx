'use client'
import React from 'react'
import { ButtonContainer } from './style';

type props = {
    text:string;
    onClick:() => void;
    $bgColor?: string;
    $textColor?: string;
    $hoverColor?: string;
    $width?: string;
    $borderColor?: string;
}

export const Button = ({text,onClick,...styleProps}:props) => {
  return (
    <ButtonContainer onClick={onClick} {...styleProps}>{text}</ButtonContainer>
  )
}
