"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import styled from "styled-components";
import { Header } from "./header";
import { Footer } from "./footer";

const Shell = styled.div`
  .skip {
    position: fixed;
    top: -100px;
    left: 16px;
    z-index: 10;
    padding: 12px;
    background: white;
  }
  .skip:focus {
    top: 8px;
  }
  header .header-content,
  footer > * {
    max-width: 1200px;
    margin-inline: auto;
  }
`;
export function SiteShell({ children }: { children: ReactNode }) {
  const path = usePathname();
  return (
    <Shell>
      <a className="skip" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Header
        activeHref={path ?? undefined}
        navigation={[
          { label: "Início", href: "/" },
          { label: "Profissionais", href: "/profissionais" },
        ]}
      />
      {children}
      <Footer
        navigationLabel="Nesta demonstração"
        links={[
          { label: "Início", href: "/" },
          { label: "Profissionais", href: "/profissionais" },
        ]}
        socialIcons={[
          { label: "Facebook", icon: "/assets/icons/facebook.svg" },
          { label: "Instagram", icon: "/assets/icons/instagram.svg" },
          { label: "LinkedIn", icon: "/assets/icons/linkedin.svg" },
        ]}
        legal={
          <p>
            Demonstração com dados fictícios · Projeto de desafio técnico. Não
            oferece atendimento ou agendamento.
          </p>
        }
      />
    </Shell>
  );
}
