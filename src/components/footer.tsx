"use client";
import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { Button } from "./button";
import { BrandLogo } from "./brand-logo";

const Shell = styled.footer`
  padding: ${({ theme }) =>
    `${theme.spacing[32]} ${theme.spacing[16]} ${theme.spacing[24]}`};
  background: ${({ theme }) => theme.colors.background};
  .footer-brand {
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.75rem;
    margin-top: 0;
  }
  .footer-about {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[32]};
  }
  .footer-legal {
    min-width: 0;
    max-width: 90ch;
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.muted};
  }
  .footer-legal p {
    margin: 0;
  }
  button {
    align-self: flex-start;
  }
  nav {
    display: block;
  }
  nav > p {
    margin: 0 0 ${({ theme }) => theme.spacing[16]};
    font-size: 1.125rem;
    font-weight: 700;
  }
  a {
    text-underline-offset: 4px;
  }
  .footer-content {
    display: grid;
    gap: ${({ theme }) => theme.spacing[32]};
    align-items: start;
    padding-block: ${({ theme }) => theme.spacing[48]};
    border-top: 1px solid #b0e0d3;
  }
  .footer-bottom {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: ${({ theme }) => theme.spacing[24]};
    border-top: 1px solid #b0e0d3;
    padding-top: ${({ theme }) => theme.spacing[24]};
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[4]};
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .back-to-top {
    align-self: flex-end;
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    padding: 8px;
    box-shadow: ${({ theme }) => theme.shadows["shadow-md"]};
  }
  a {
    display: inline-flex;
    min-height: 44px;
    align-items: center;
    overflow-wrap: anywhere;
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  .footer-socials ul {
    flex-direction: row;
    gap: ${({ theme }) => theme.spacing[8]};
  }
  .footer-socials li {
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    .footer-content {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: ${({ theme }) =>
      `${theme.spacing[48]} ${theme.spacing[24]} ${theme.spacing[24]}`};
    .footer-content {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: ${({ theme }) => theme.spacing[32]};
    }
    .footer-bottom {
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;
    }
  }
`;
export type FooterLink = { label: string; href: string };
type SocialIcon = { label: string; icon: string };
export function Footer({
  brand,
  links = [],
  socialIcons = [],
  legal,
  navigationLabel = "Institucional",
}: {
  brand?: ReactNode;
  links?: FooterLink[];
  socialIcons?: SocialIcon[];
  legal?: ReactNode;
  navigationLabel?: string;
}) {
  return (
    <Shell>
      <div className="footer-content">
        <div className="footer-about">
          <Link
            href="/"
            className="footer-brand"
            aria-label="Lacrei Saúde — início"
          >
            {brand ?? <BrandLogo stacked />}
          </Link>
          {socialIcons.length > 0 && (
            <div className="footer-socials" aria-hidden="true">
              <ul>
                {socialIcons.map((item) => (
                  <li key={item.label}>
                    <Image src={item.icon} alt="" width={32} height={32} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {links.length > 0 && (
          <nav aria-label={navigationLabel}>
            <p>{navigationLabel}</p>
            <ul>
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
      <div className="footer-bottom">
        {legal && <div className="footer-legal">{legal}</div>}
        <Button
          className="back-to-top"
          variant="secondary"
          aria-label="Voltar ao topo"
          title="Voltar ao topo"
          onClick={() => {
            document
              .querySelector<HTMLAnchorElement>("header .header-brand")
              ?.focus({ preventScroll: true });
            window.scrollTo({ top: 0, behavior: "instant" });
          }}
        >
          <svg
            aria-hidden="true"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="m6 15 6-6 6 6" />
          </svg>
        </Button>
      </div>
    </Shell>
  );
}
