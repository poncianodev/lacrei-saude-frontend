"use client";
import Image from "next/image";
import styled from "styled-components";

const Logo = styled(Image)<{ $stacked: boolean }>`
  display: block;
  width: ${({ $stacked }) => ($stacked ? "170px" : "203px")};
  max-width: 100%;
  height: auto;
  @media (max-width: 599px) {
    width: ${({ $stacked }) => ($stacked ? "170px" : "180px")};
  }
`;

export function BrandLogo({
  stacked = false,
  responsive = false,
}: {
  stacked?: boolean;
  responsive?: boolean;
}) {
  const image = (
    <Logo
      src={`/assets/logos/lacrei-${stacked ? "stacked" : "horizontal"}.svg`}
      alt="Lacrei Saúde"
      width={stacked ? 170 : 203}
      height={stacked ? 48 : 26}
      $stacked={stacked}
    />
  );
  return responsive ? (
    <picture>
      <source
        media="(max-width: 599px)"
        srcSet="/assets/logos/lacrei-mobile.svg"
        width={134}
        height={16}
      />
      {image}
    </picture>
  ) : (
    image
  );
}
