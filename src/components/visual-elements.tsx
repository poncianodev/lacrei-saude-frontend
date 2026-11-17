"use client";
import styled from "styled-components";
import Image from "next/image";

export const Avatar = styled.div`
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 72px;
  height: 72px;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.gradients.subtle};
  box-shadow: inset 0 -4px ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
  ${({ theme }) => theme.typography["headline-sm-highlight"]};
`;
export function CareArtwork() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 440 360" fill="none">
      <rect
        x="46"
        y="22"
        width="346"
        height="316"
        rx="60"
        fill="currentColor"
        opacity=".05"
      />
      <path
        d="M78 280C20 154 134 40 231 74s184 146 110 214"
        stroke="currentColor"
        strokeWidth="2"
        opacity=".2"
      />
      <path
        d="M100 282V170a120 120 0 0 1 240 0v112"
        fill="currentColor"
        opacity=".1"
      />
      <path
        d="M138 276c0-59 29-92 69-92s70 33 70 92"
        fill="currentColor"
        opacity=".75"
      />
      <circle cx="207" cy="143" r="34" fill="currentColor" opacity=".75" />
      <path
        d="M229 282c0-43 24-72 55-72s55 29 55 72"
        fill="currentColor"
        opacity=".35"
      />
      <circle cx="284" cy="178" r="27" fill="currentColor" opacity=".35" />
      <path
        d="m117 116 8-16 8 16 16 8-16 8-8 16-8-16-16-8 16-8Z"
        fill="currentColor"
      />
      <rect x="290" y="61" width="76" height="65" rx="24" fill="white" />
      <path
        d="M328 106s-19-11-19-22c0-10 14-13 19-4 5-9 19-6 19 4 0 11-19 22-19 22Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M67 296h304"
        stroke="currentColor"
        strokeWidth="2"
        opacity=".25"
      />
    </svg>
  );
}
export const SpecialtyBadge = styled.span`
  display: inline-flex;
  align-self: flex-start;
  padding: ${({ theme }) => `${theme.spacing[4]} ${theme.spacing[12]}`};
  border-radius: ${({ theme }) => theme.radii.pill};
  color: ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.surface};
  ${({ theme }) => theme.typography["text-sm-highlight"]};
`;
export function CareIcon({ kind }: { kind: "welcome" | "respect" | "choice" }) {
  if (kind !== "choice") {
    return (
      <Image
        src={`/assets/icons/${kind === "welcome" ? "heart" : "handshake"}.svg`}
        alt=""
        aria-hidden="true"
        width={kind === "welcome" ? 77 : 78}
        height={66}
        style={{ width: 40, height: "auto" }}
      />
    );
  }
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21V8m0 5L5 6m7 7 7-7M2 6h3V3m14 0v3h3" />
    </svg>
  );
}
