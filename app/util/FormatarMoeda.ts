export const formatarMoeda = (valor: number): string => {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
};

export const formatarNumero = (valor: number, casas: number = 2): string => {
    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: casas,
        maximumFractionDigits: casas
    });
};


export const mascaraMoeda = (valor: string): string => {
    const apenasDigitos = valor.replace(/\D/g, "");
    if (apenasDigitos.length === 0) return "";


    const inteiro = apenasDigitos.slice(0, -2) || "0";
    const centavos = apenasDigitos.slice(-2).padStart(2, "0");

    const num = Number(`${inteiro}.${centavos}`);
    return formatarMoeda(num);
};

export const limparMoeda = (valor: string): number => {
    // Se já estiver formatado como moeda (contém R$, ponto ou vírgula)
    if (valor.includes("R$") || valor.includes(",") || valor.includes(".")) {
        const limpo = valor
            .replace(/[R$\s]/g, "")   // remove "R$ " e espaços
            .replace(/\./g, "")        // remove pontos dos milhares
            .replace(",", ".");        // troca vírgula decimal por ponto
        return Number(limpo);
    }

    const apenasDigitos = valor.replace(/\D/g, "");
    if (apenasDigitos.length === 0) return 0;

    const inteiro = apenasDigitos.slice(0, -2) || "0";
    const centavos = apenasDigitos.slice(-2).padStart(2, "0");
    return Number(`${inteiro}.${centavos}`);
};
