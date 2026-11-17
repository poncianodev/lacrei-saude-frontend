"use client";
import { useId, type ReactNode } from "react";
import styled from "styled-components";

const Surface = styled.article`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[12]};
  padding: ${({ theme }) => theme.spacing[24]};
  border: 1px solid ${({ theme }) => theme.colors.primary}26;
  box-shadow: ${({ theme }) => theme.shadows["shadow-sm"]};
  &:hover,
  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows["shadow-md"]};
  }
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.background};
  > p {
    color: ${({ theme }) => theme.colors.muted};
  }
  .card-status {
    font-size: 0.75rem;
  }
  h2,
  h3,
  h4 {
    margin: 0;
  }
  > * {
    margin-block: 0;
  }
  .card-actions {
    margin-top: auto;
    padding-top: ${({ theme }) => theme.spacing[24]};
    border-top: 1px solid ${({ theme }) => theme.colors.surface};
  }
  .card-actions button {
    width: 100%;
  }
`;
export function Card({
  title,
  headingLevel = 2,
  description,
  children,
  status,
  actions,
  leading,
  metadata,
}: {
  title: string;
  headingLevel?: 2 | 3 | 4;
  description?: string;
  children?: ReactNode;
  status?: string;
  actions?: ReactNode;
  leading?: ReactNode;
  metadata?: ReactNode;
}) {
  const id = useId();
  const Heading = `h${headingLevel}` as "h2" | "h3" | "h4";
  return (
    <Surface aria-labelledby={id}>
      {leading}
      <Heading id={id}>{title}</Heading>
      {metadata}
      {description && <p>{description}</p>}
      {status && <p className="card-status">{status}</p>}
      {children}
      {actions && <div className="card-actions">{actions}</div>}
    </Surface>
  );
}
