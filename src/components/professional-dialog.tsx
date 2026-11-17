"use client";
import { useEffect, useRef, useId } from "react";
import styled from "styled-components";
import type { Professional } from "@/mocks/professionals";
import { Button } from "./button";
import { Avatar, SpecialtyBadge } from "./visual-elements";
import { Typography } from "./typography";

const Dialog = styled.dialog`
  width: min(560px, calc(100% - 32px));
  max-height: calc(100dvh - 32px);
  overflow-y: auto;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing[24]};
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing[40]};
  }
  border-top: 6px solid ${({ theme }) => theme.colors.primary};
  box-shadow: ${({ theme }) => theme.shadows["shadow-lg"]};
  .identity {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-block: 24px;
  }
  .identity h2 {
    margin: 0 0 8px;
  }
  .demo {
    color: ${({ theme }) => theme.colors.muted};
    font-size: 0.875rem;
  }
  .notice {
    padding: 16px;
    background: ${({ theme }) => theme.colors.surface};
    border-radius: ${({ theme }) => theme.radii.sm};
    font-size: 0.875rem;
    margin-block: 24px;
  }
  button {
    width: 100%;
  }
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.background};
  &::backdrop {
    background: rgb(0 0 0 / 50%);
  }
`;
export function ProfessionalDialog({
  professional,
  onClose,
}: {
  professional: Professional;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const id = useId();
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const dialog = ref.current!;
    dialog.showModal();
    return () => {
      dialog.close();
      previousFocus?.focus();
    };
  }, []);
  return (
    <Dialog
      ref={ref}
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-description`}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const controls = Array.from(
          event.currentTarget.querySelectorAll<HTMLElement>(
            'button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex="0"]',
          ),
        );
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
    >
      <p className="demo">Demonstração · Perfil fictício</p>
      <div className="identity">
        <Avatar aria-hidden="true">{professional.initials}</Avatar>
        <div>
          <Typography
            as="h2"
            id={`${id}-title`}
            $variant="headline-sm-highlight"
          >
            {professional.name}
          </Typography>
          <SpecialtyBadge>{professional.specialty}</SpecialtyBadge>
        </div>
      </div>
      <p id={`${id}-description`}>{professional.details}</p>
      <p className="notice">
        Não há atendimento, agendamento ou disponibilidade real neste projeto.
      </p>
      <Button onClick={onClose}>Fechar detalhes</Button>
    </Dialog>
  );
}
