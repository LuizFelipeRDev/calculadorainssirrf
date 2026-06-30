import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { GlobalStyle } from "./styles/globalStyle";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "CALCULADORA INSS e IRRF",
  description: "Calculadora fde facil uso para inss e irrf",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-br"
      className={`${roboto.variable}
       h-full antialiased`}
    >
      <body >
        <GlobalStyle />
        <Header />
        <div>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
