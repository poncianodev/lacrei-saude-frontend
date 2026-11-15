import type { Metadata } from "next";
import StyledComponentsRegistry from "@/lib/styled-components-registry";
import Providers from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lacrei Saúde",
  description: "Projeto do desafio técnico de Frontend da Lacrei Saúde.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <StyledComponentsRegistry>
          <Providers>{children}</Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
