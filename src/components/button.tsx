"use client";
import type { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

type Variant = "primary" | "secondary" | "danger";
const Control = styled.button<{ $variant: Variant }>`
  min-height: 44px;
  max-width: 100%;
  padding: ${({ theme }) => `${theme.spacing[8]} ${theme.spacing[16]}`};
  border: 2px solid
    ${({ theme, $variant }) =>
      $variant === "danger" ? theme.colors.error : theme.colors.primary};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme, $variant }) =>
    $variant === "secondary"
      ? theme.colors.background
      : $variant === "danger"
        ? theme.colors.error
        : theme.colors.primary};
  color: ${({ theme, $variant }) =>
    $variant === "secondary" ? theme.colors.primary : theme.colors.onPrimary};
  font-weight: 700;
  overflow-wrap: anywhere;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows["drop-shadow"]};
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;
  &:hover:not(:disabled) {
    background: ${({ theme, $variant }) =>
      $variant === "secondary"
        ? theme.colors.primary
        : $variant === "danger"
          ? theme.colors.errorHover
          : theme.colors.primaryHover};
    border-color: ${({ theme, $variant }) =>
      $variant === "secondary"
        ? theme.colors.primary
        : $variant === "danger"
          ? theme.colors.errorHover
          : theme.colors.primaryHover};
    color: ${({ theme }) => theme.colors.onPrimary};
  }
  &:disabled {
    cursor: not-allowed;
    opacity: ${({ theme }) => theme.opacity.lg};
  }
`;
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  loading?: boolean;
};
export function Button({
  variant = "primary",
  loading = false,
  disabled,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <Control
      {...props}
      type={type}
      $variant={variant}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
    >
      {loading ? (
        <>
          Carregando… <span>{children}</span>
        </>
      ) : (
        children
      )}
    </Control>
  );
}
