"use client";
import { useId, type InputHTMLAttributes } from "react";
import styled from "styled-components";

const Field = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[8]};
  min-width: 0;
  label {
    font-weight: 700;
  }
  input {
    width: 100%;
    min-width: 0;
    min-height: 44px;
    padding: ${({ theme }) => theme.spacing[12]};
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.background};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radii.sm};
  }
  input[aria-invalid="true"] {
    border-color: ${({ theme }) => theme.colors.error};
  }
  input:disabled {
    opacity: ${({ theme }) => theme.opacity.lg};
    cursor: not-allowed;
  }
  small {
    color: ${({ theme }) => theme.colors.muted};
  }
  [role="alert"] {
    color: ${({ theme }) => theme.colors.error};
  }
`;
export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  error?: string;
};
export function Input({
  label,
  hint,
  error,
  id,
  "aria-describedby": describedBy,
  "aria-invalid": invalid,
  ...props
}: InputProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const description =
    [describedBy, hint && `${fieldId}-hint`, error && `${fieldId}-error`]
      .filter(Boolean)
      .join(" ") || undefined;
  return (
    <Field>
      <label htmlFor={fieldId}>{label}</label>
      <input
        {...props}
        id={fieldId}
        aria-describedby={description}
        aria-invalid={error ? true : invalid}
      />
      {hint && <small id={`${fieldId}-hint`}>{hint}</small>}
      {error && (
        <small id={`${fieldId}-error`} role="alert">
          {error}
        </small>
      )}
    </Field>
  );
}
