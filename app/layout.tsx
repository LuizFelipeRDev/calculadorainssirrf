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
          <div
            className="min-h-screen w-full"
            style={{
              backgroundColor: '#fff',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Crect width='2' height='2' fill='%23c0c0c0'/%3E%3C/svg%3E")`,
              backgroundSize: '20px 20px',
            }}
          >
            {children}
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
