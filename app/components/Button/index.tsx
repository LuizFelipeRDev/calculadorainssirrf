'use client'
import React from 'react'
import { ButtonContainer } from './style';

type props = {
    text:string;
    onClick:() => void;
}

export const Button = ({text,onClick}:props) => {
  return (
    <ButtonContainer onClick={onClick}>{text}</ButtonContainer>
  )
}
