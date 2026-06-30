import { theme } from "@/app/styles/theme";
import styled from "styled-components";

export const ButtonContainer = styled.button<{
    $bgColor?: string;
    $textColor?: string;
    $hoverColor?: string;
    $width?: string;
    $borderColor?: string;
}>`
    background-color: ${({ $bgColor }) => $bgColor ?? `color-mix(in srgb, ${theme.colors.quartiary} 80%, transparent)`};
    color: ${({ $textColor }) => $textColor ?? '#000'};
    border: 1px solid ${({ $borderColor }) => $borderColor ?? 'black'};
    width: ${({ $width }) => $width ?? 'auto'};
    box-shadow: 0 1px 1px black;
    padding:0.5rem 1rem;
    border-radius:8px;
    cursor: pointer;
    &:hover{
        background-color: ${({ $hoverColor, $bgColor }) =>
            $hoverColor ?? ($bgColor ?? theme.colors.quartiary)
        };
    }
`