import type { Metadata } from "next";
import localFont from "next/font/local";
import StyledComponentsRegistry from "@/lib/styled-components-registry";
import Providers from "./providers";
import "./globals.css";

const nunito = localFont({
  src: "../styles/fonts/Nunito-Variable.ttf",
  weight: "200 1000",
  style: "normal",
  display: "swap",
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Lacrei Saúde",
  description: "Projeto do desafio técnico de Frontend da Lacrei Saúde.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={nunito.variable}>
      <body>
        <StyledComponentsRegistry>
          <Providers>{children}</Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
