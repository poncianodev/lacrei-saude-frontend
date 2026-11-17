"use client";

import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.body};
    line-height: 1.5;
    font-size: 1rem;
  }
  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 4px;
  }
  a { color: ${({ theme }) => theme.colors.primary}; }
  img, svg { max-width: 100%; }
  h1, h2, h3, p { overflow-wrap: anywhere; }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation: none !important;
      transition: none !important;
      scroll-behavior: auto !important;
    }
  }
`;
