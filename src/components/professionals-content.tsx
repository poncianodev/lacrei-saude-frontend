"use client";
import { useState, useRef } from "react";
import styled from "styled-components";
import { professionals, type Professional } from "@/mocks/professionals";
import { SiteShell } from "./site-shell";
import { Container, Grid } from "./page-styles";
import { Typography } from "./typography";
import { Input } from "./input";
import { Button } from "./button";
import { Card } from "./card";
import { EmptyState } from "./interface-states";
import { Avatar, SpecialtyBadge } from "./visual-elements";
import { ProfessionalDialog } from "./professional-dialog";

const Intro = styled.div`
  display: grid;
  gap: 24px;
  align-items: end;
  h1 {
    margin-block: 12px 16px;
    letter-spacing: -0.03em;
  }
  p {
    margin: 0;
  }
  .demo {
    padding: 16px 24px;
    border-left: 3px solid ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surface};
    border-radius: 0 ${({ theme }) => theme.radii.md}
      ${({ theme }) => theme.radii.md} 0;
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.muted};
  }
  .demo strong {
    display: block;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 4px;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1.6fr 1fr;
    gap: 64px;
  }
`;
const Filters = styled.div`
  padding: ${({ theme }) => theme.spacing[24]};
  margin-block: ${({ theme }) => theme.spacing[32]};
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing[32]};
  }
  background: ${({ theme }) => theme.gradients.subtle};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows["shadow-sm"]};
  input {
    min-height: 56px;
    border: 2px solid ${({ theme }) => theme.colors.primary};
    padding-inline: 16px;
    font-size: 1.125rem;
  }
  fieldset {
    border: 0;
    padding: 24px 0 0;
    margin: 24px 0 0;
    min-width: 0;
    border-top: 1px solid ${({ theme }) => theme.colors.primary}26;
  }
  legend {
    float: left;
    width: 100%;
    font-weight: 700;
    margin-bottom: 12px;
  }
  .choices {
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing[8]};
    clear: both;
  }
  .choices button {
    border-radius: ${({ theme }) => theme.radii.pill};
    padding-inline: ${({ theme }) => theme.spacing[24]};
  }
  .choices button[aria-pressed="true"] {
    box-shadow: ${({ theme }) => theme.shadows["shadow-sm"]};
  }
`;
const Results = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 24px;
  p {
    margin: 0;
    font-weight: 700;
  }
  span {
    color: ${({ theme }) => theme.colors.muted};
    font-size: 0.875rem;
  }
`;
const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .trim();
export function ProfessionalsContent() {
  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState("Todas");
  const [selected, setSelected] = useState<Professional | null>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const results = professionals.filter(
    (p) =>
      (specialty === "Todas" || p.specialty === specialty) &&
      normalize(`${p.name} ${p.specialty}`).includes(normalize(query)),
  );
  function clear() {
    setQuery("");
    setSpecialty("Todas");
    filtersRef.current?.querySelector("input")?.focus();
  }
  return (
    <SiteShell>
      <Container id="conteudo" tabIndex={-1}>
        <Intro>
          <div>
            <p className="eyebrow">Encontre seu cuidado</p>
            <Typography as="h1" $variant="headline-lg">
              Explore profissionais
            </Typography>
            <p>
              Conheça diferentes especialidades e explore os perfis no seu
              tempo.
            </p>
          </div>
          <p className="demo">
            <strong>Demonstração com dados fictícios.</strong> Todos os perfis
            são inventados. Não há consultas ou agendamentos.
          </p>
        </Intro>
        <Filters ref={filtersRef}>
          <Input
            label="Buscar por nome ou especialidade"
            type="search"
            placeholder="Nome ou especialidade"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            hint="Você pode buscar com ou sem acentos."
          />
          <fieldset>
            <legend>Especialidade</legend>
            <div className="choices">
              {["Todas", "Psicologia", "Nutrição", "Clínica geral"].map(
                (value) => (
                  <Button
                    key={value}
                    variant={specialty === value ? "primary" : "secondary"}
                    aria-pressed={specialty === value}
                    onClick={() => setSpecialty(value)}
                  >
                    {value}
                  </Button>
                ),
              )}
            </div>
          </fieldset>
        </Filters>
        <Results>
          <p role="status" aria-live="polite" aria-atomic="true">
            {results.length}{" "}
            {results.length === 1 ? "perfil encontrado" : "perfis encontrados"}
          </p>
          <span>Explore no seu tempo. Escolha por você.</span>
        </Results>
        {results.length ? (
          <Grid>
            {results.map((person) => (
              <Card
                key={person.id}
                title={person.name}
                description={person.summary}
                leading={<Avatar aria-hidden="true">{person.initials}</Avatar>}
                metadata={<SpecialtyBadge>{person.specialty}</SpecialtyBadge>}
                status="Perfil fictício"
                actions={
                  <Button
                    variant="secondary"
                    aria-label={`Ver detalhes de ${person.name}`}
                    onClick={() => setSelected(person)}
                  >
                    Ver detalhes
                  </Button>
                }
              />
            ))}
          </Grid>
        ) : (
          <EmptyState message="Nenhum perfil corresponde à sua busca.">
            <Button onClick={clear}>Limpar filtros</Button>
          </EmptyState>
        )}
        {selected && (
          <ProfessionalDialog
            professional={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </Container>
    </SiteShell>
  );
}
