import React, { useRef, useEffect } from 'react'
import { mascaraMoeda } from '@/app/util/FormatarMoeda'

type props = {
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    placeholder: string,
    maskType?: 'currency'
}

export const Input = ({ value, onChange, placeholder, maskType }: props) => {
    const rawRef = useRef(value);

    useEffect(() => {
        if (maskType === 'currency') {
            rawRef.current = value;
        }
    }, [value, maskType]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (maskType !== 'currency') return;

        if (e.key === 'Backspace') {
            e.preventDefault();
            rawRef.current = rawRef.current.slice(0, -1);
            onChange({
                target: { value: rawRef.current }
            } as React.ChangeEvent<HTMLInputElement>);
        } else if (e.key.length === 1 && e.key >= '0' && e.key <= '9') {
            e.preventDefault();
            rawRef.current += e.key;
            onChange({
                target: { value: rawRef.current }
            } as React.ChangeEvent<HTMLInputElement>);
        }
    };

    const displayValue = maskType === 'currency'
        ? (rawRef.current ? mascaraMoeda(rawRef.current) : '')
        : value;

    return (
        <input
            type={maskType === 'currency' ? 'text' : 'number'}
            value={displayValue}
            onKeyDown={handleKeyDown}
            onChange={() => {}}
            placeholder={placeholder}
        />
    );
}
