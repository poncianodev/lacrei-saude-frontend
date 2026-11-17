"use client";
import styled from "styled-components";
import type { tokens } from "@/styles/theme";

export const Typography = styled.p<{
  $variant?: keyof typeof tokens.typography;
}>`
  ${({ theme, $variant = "text-base" }) => theme.typography[$variant]};
  margin: 0;
  overflow-wrap: anywhere;
`;
