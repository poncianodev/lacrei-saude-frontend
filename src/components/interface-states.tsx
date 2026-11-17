"use client";
import type { ReactNode } from "react";
import styled from "styled-components";

const State = styled.div`
  padding: ${({ theme }) => theme.spacing[24]};
  overflow-wrap: anywhere;
  p {
    margin: 0;
  }
  > * + * {
    margin-top: ${({ theme }) => theme.spacing[16]};
  }
  &[role="alert"] {
    color: ${({ theme }) => theme.colors.error};
  }
`;
export function LoadingState({
  message = "Carregando…",
}: {
  message?: string;
}) {
  return (
    <State role="status" aria-live="polite">
      <p>{message}</p>
    </State>
  );
}
export function EmptyState({
  message = "Nenhum resultado encontrado.",
  children,
}: {
  message?: string;
  children?: ReactNode;
}) {
  return (
    <State role="status">
      <p>{message}</p>
      {children}
    </State>
  );
}
export function ErrorState({
  message = "Não foi possível carregar o conteúdo.",
  children,
}: {
  message?: string;
  children?: ReactNode;
}) {
  return (
    <State role="alert">
      <p>{message}</p>
      {children}
    </State>
  );
}
