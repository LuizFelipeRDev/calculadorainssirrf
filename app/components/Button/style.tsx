import { theme } from "@/app/styles/theme";
import styled from "styled-components";

export const ButtonContainer = styled.button`
    background-color: color-mix(in srgb, ${theme.colors.quartiary} 80%, transparent);
    border: 1px solid black;
    box-shadow: 0 1px 1px black;
    padding:0.5rem 1rem;
    border-radius:8px;
    cursor: pointer;
    &:hover{
        background-color: ${theme.colors.quartiary};
    }
`