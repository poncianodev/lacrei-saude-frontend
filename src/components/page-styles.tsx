"use client";
import Link from "next/link";
import styled from "styled-components";

export const Container = styled.main`
  max-width: 1200px;
  margin-inline: auto;
  padding: ${({ theme }) =>
    `${theme.spacing[32]} ${theme.spacing[16]} ${theme.spacing[64]}`};
  section + section {
    margin-top: ${({ theme }) => theme.spacing[64]};
  }
  @media (max-width: 599px) {
    h1 {
      ${({ theme }) => theme.typography["headline-base"]};
    }
  }
  h2 {
    ${({ theme }) => theme.typography["headline-base"]};
  }
  article h2 {
    ${({ theme }) => theme.typography["headline-sm-highlight"]};
  }
  section > h2 {
    margin-bottom: ${({ theme }) => theme.spacing[24]};
  }
  p {
    max-width: 65ch;
  }
  .eyebrow {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-size: 0.875rem;
  }
`;
export const Grid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[24]};
  grid-template-columns: minmax(0, 1fr);
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;
export const ActionLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: ${({ theme }) => `${theme.spacing[12]} ${theme.spacing[24]}`};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  text-decoration: none;
  font-weight: 700;
  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`;
