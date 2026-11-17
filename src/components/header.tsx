"use client";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import styled from "styled-components";
import { BrandLogo } from "./brand-logo";
import { Button } from "./button";

const Shell = styled.header`
  padding: ${({ theme }) => `${theme.spacing[16]} ${theme.spacing[24]}`};
  background: linear-gradient(180deg, #f5fffb 31.04%, #ffffff 100%);
  .header-content {
    min-height: 64px;
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[16]};
  }
  .header-brand {
    font-weight: 700;
    font-size: 1.75rem;
    letter-spacing: -0.04em;
    text-decoration: none;
    overflow-wrap: anywhere;
  }
  .header-brand img {
    width: 187px;
    height: auto;
  }
  .header-actions {
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing[12]};
    align-items: center;
  }
  a {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
  }
  .header-search {
    grid-column: 1 / -1;
    min-width: 0;
  }
  .menu-toggle {
    display: none;
    width: 48px;
    height: 48px;
    padding: ${({ theme }) => theme.spacing[12]};
  }
  .primary-nav {
    display: flex;
    gap: ${({ theme }) => theme.spacing[8]};
  }
  .primary-nav a {
    min-height: 48px;
    padding: ${({ theme }) => `${theme.spacing[8]} ${theme.spacing[32]}`};
    border-radius: ${({ theme }) => theme.radii.sm};
    text-decoration: none;
    font-size: 1.125rem;
    font-weight: 700;
  }
  .primary-nav a:not([aria-current="page"]):hover {
    background: ${({ theme }) => theme.colors.surface};
  }
  .primary-nav [aria-current="page"] {
    font-weight: 700;
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.onPrimary};
  }
  @media (max-width: 599px) {
    padding-inline: ${({ theme }) => theme.spacing[24]};
    .header-content {
      min-height: 48px;
    }
    .header-brand img {
      width: 134px;
    }
    .menu-toggle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .primary-nav {
      grid-column: 1 / -1;
      flex-direction: column;
      padding-top: ${({ theme }) => theme.spacing[16]};
      border-top: 1px solid ${({ theme }) => theme.colors.primary}30;
    }
    .primary-nav[data-expanded="false"] {
      display: none;
    }
    .primary-nav a {
      min-height: 48px;
    }
  }
`;
type NavigationLink = { label: string; href: string };
export function Header({
  brand,
  search,
  help,
  userMenu,
  navigation,
  activeHref,
}: {
  brand?: ReactNode;
  search?: ReactNode;
  help?: ReactNode;
  userMenu?: ReactNode;
  navigation?: NavigationLink[];
  activeHref?: string;
}) {
  const [open, setOpen] = useState(false);
  const navigationId = useId();
  const contentRef = useRef<HTMLDivElement>(null);
  function closeMenu() {
    setOpen(false);
    contentRef.current
      ?.querySelector<HTMLButtonElement>(".menu-toggle")
      ?.focus();
  }
  useEffect(() => {
    if (!open) return;
    function onEscape(event: KeyboardEvent) {
      if (
        event.target instanceof Element &&
        event.target.closest("dialog[open]")
      )
        return;
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
      }
    }
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [open]);
  return (
    <Shell>
      <div className="header-content" ref={contentRef}>
        <Link
          className="header-brand"
          href="/"
          aria-label="Lacrei Saúde — início"
        >
          {brand ?? <BrandLogo responsive />}
        </Link>
        {(help || userMenu) && (
          <div className="header-actions">
            {help}
            {userMenu}
          </div>
        )}
        {navigation && (
          <>
            <Button
              className="menu-toggle"
              variant="secondary"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              aria-controls={navigationId}
              onClick={() => setOpen((value) => !value)}
            >
              <svg
                aria-hidden="true"
                focusable="false"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path
                  d={open ? "m6 6 12 12M6 18 18 6" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </Button>
            <nav
              id={navigationId}
              className="primary-nav"
              aria-label="Principal"
              data-expanded={open}
            >
              {navigation.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={activeHref === link.href ? "page" : undefined}
                  onClick={() => {
                    if (open) closeMenu();
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </>
        )}
        {search && <div className="header-search">{search}</div>}
      </div>
    </Shell>
  );
}
