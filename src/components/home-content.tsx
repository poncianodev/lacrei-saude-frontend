"use client";
import styled from "styled-components";
import { SiteShell } from "./site-shell";
import { Container, Grid, ActionLink } from "./page-styles";
import { CareArtwork, CareIcon } from "./visual-elements";
import { Typography } from "./typography";

const Hero = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing[32]};
  padding: ${({ theme }) => theme.spacing[24]};
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing[48]};
  }
  background: ${({ theme }) => theme.gradients.subtle};
  border-radius: ${({ theme }) => theme.radii.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.surface};
  h1 {
    margin-block: 16px 24px;
    letter-spacing: -0.035em;
  }
  p:not(.eyebrow) {
    color: ${({ theme }) => theme.colors.muted};
  }
  a {
    margin-top: 16px;
    gap: 24px;
    box-shadow: ${({ theme }) => theme.shadows["shadow-md"]};
  }
  .art {
    color: ${({ theme }) => theme.colors.primary};
    text-align: center;
    min-width: 0;
  }
  .art svg {
    width: 100%;
    max-width: 440px;
    display: block;
    margin: auto;
  }
  .art p {
    color: ${({ theme }) => theme.colors.primary};
    ${({ theme }) => theme.typography["text-xl-highlight"]};
    margin: 0;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1.2fr 1fr;
    align-items: center;
  }
`;
const Journey = styled(Grid)`
  gap: ${({ theme }) => theme.spacing[32]};
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;
const Step = styled.div`
  position: relative;
  .number {
    display: grid;
    place-items: center;
    width: 56px;
    height: 56px;
    border-radius: ${({ theme }) => theme.radii.md};
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 24px;
  }
  h3 {
    margin: 0 0 12px;
  }
  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.muted};
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    &:not(:last-child)::after {
      content: "";
      position: absolute;
      top: 28px;
      left: 72px;
      right: 0;
      border-top: 1px dashed ${({ theme }) => theme.colors.primary};
      opacity: 0.35;
    }
  }
`;
const Benefits = styled.section`
  padding: ${({ theme }) => theme.spacing[24]};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.lg};
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing[48]};
  }
  .benefit {
    padding-top: 16px;
  }
  .benefit-icon {
    display: inline-grid;
    place-items: center;
    width: 56px;
    height: 56px;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.radii.md};
  }
  h3 {
    margin-block: 16px 8px;
  }
  .benefit p {
    margin: 0;
    color: ${({ theme }) => theme.colors.muted};
  }
`;
const Invitation = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
  padding: 8px 0 8px 24px;
  h2 {
    margin: 0 0 12px;
  }
  p {
    margin: 0;
  }
`;
export function HomeContent() {
  return (
    <SiteShell>
      <Container id="conteudo" tabIndex={-1}>
        <Hero>
          <div>
            <p className="eyebrow">Encontre seu cuidado</p>
            <Typography as="h1" $variant="headline-xl">
              Seu cuidado começa com respeito a quem você é.
            </Typography>
            <p>
              Um espaço para explorar possibilidades de cuidado, conhecer
              diferentes especialidades e fazer escolhas no seu tempo.
            </p>
            <ActionLink href="/profissionais">
              Explorar profissionais
            </ActionLink>
            <p>
              <small>
                Demonstração com dados fictícios. Projeto em preparação.
              </small>
            </p>
          </div>
          <div className="art" aria-hidden="true">
            <CareArtwork />
            <p>
              Você merece ser ouvido.
              <br />
              Por inteiro.
            </p>
          </div>
        </Hero>
        <section aria-labelledby="como-funciona">
          <p className="eyebrow">Um passo de cada vez</p>
          <Typography as="h2" id="como-funciona" $variant="headline-base">
            Como funciona
          </Typography>
          <Journey>
            {[
              [
                "Explore",
                "Conheça as especialidades e os perfis disponíveis nesta demonstração.",
              ],
              [
                "Encontre afinidades",
                "Use a busca e os filtros para explorar o que faz sentido para você.",
              ],
              [
                "Conheça os detalhes",
                "Leia as apresentações fictícias e descubra como a experiência funciona.",
              ],
            ].map(([title, text], index) => (
              <Step key={title}>
                <span className="number">0{index + 1}</span>
                <Typography as="h3" $variant="headline-sm-highlight">
                  {title}
                </Typography>
                <p>{text}</p>
              </Step>
            ))}
          </Journey>
        </section>
        <Benefits aria-labelledby="beneficios">
          <p className="eyebrow">O que orienta esta experiência</p>
          <Typography as="h2" id="beneficios" $variant="headline-base">
            Cuidado que reconhece você
          </Typography>
          <Grid>
            {[
              [
                "Acolhimento",
                "Espaço para suas dúvidas, histórias e necessidades.",
              ],
              [
                "Respeito",
                "Sua identidade e sua maneira de viver merecem ser respeitadas.",
              ],
              [
                "Autonomia",
                "Informação clara para explorar possibilidades e escolher seu caminho.",
              ],
            ].map(([title, text], index) => (
              <div className="benefit" key={title}>
                <span className="benefit-icon">
                  <CareIcon
                    kind={(["welcome", "respect", "choice"] as const)[index]}
                  />
                </span>
                <Typography as="h3" $variant="headline-sm-highlight">
                  {title}
                </Typography>
                <p>{text}</p>
              </div>
            ))}
          </Grid>
        </Benefits>
        <Invitation>
          <div>
            <Typography as="h2" $variant="headline-base">
              Vamos dar o primeiro passo?
            </Typography>
            <p>Explore os perfis demonstrativos e conheça a experiência.</p>
          </div>
          <ActionLink href="/profissionais">Conhecer profissionais</ActionLink>
        </Invitation>
      </Container>
    </SiteShell>
  );
}
