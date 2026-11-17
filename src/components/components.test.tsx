import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Providers from "@/app/providers";
import { Button } from "./button";
import { Input } from "./input";
import { Card } from "./card";
import { Header } from "./header";
import { Footer } from "./footer";
import { LoadingState, EmptyState, ErrorState } from "./interface-states";
import { Typography } from "./typography";

describe("Componentes compartilhados", () => {
  it("permite navegar e ativar o botão por teclado", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Continuar</Button>, {
      wrapper: Providers,
    });
    await user.tab();
    expect(screen.getByRole("button")).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledOnce();
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it.each(["primary", "secondary", "danger"] as const)(
    "bloqueia ações durante loading na variante %s",
    async (variant) => {
      const onClick = vi.fn();
      render(
        <Button variant={variant} loading onClick={onClick}>
          Salvar
        </Button>,
        { wrapper: Providers },
      );
      const button = screen.getByRole("button", { name: /Salvar/ });
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute("aria-busy", "true");
      await userEvent.click(button);
      expect(onClick).not.toHaveBeenCalled();
    },
  );

  it("associa label, ajuda, descrição externa e erro ao campo", async () => {
    render(
      <>
        <p id="external">Obrigatório</p>
        <Input
          label="Nome"
          hint="Nome completo"
          error="Informe seu nome"
          aria-describedby="external"
        />
      </>,
      { wrapper: Providers },
    );
    const input = screen.getByRole("textbox", { name: "Nome" });
    expect(input).toHaveAccessibleDescription(
      "Obrigatório Nome completo Informe seu nome",
    );
    expect(input).toHaveAttribute("aria-invalid", "true");
    await userEvent.click(screen.getByText("Nome", { selector: "label" }));
    expect(input).toHaveFocus();
    await userEvent.type(input, "Maria");
    expect(input).toHaveValue("Maria");
  });

  it("preserva ids únicos e impede edição em campo desabilitado", () => {
    render(
      <>
        <Input label="Primeiro" disabled />
        <Input label="Segundo" />
      </>,
      { wrapper: Providers },
    );
    expect(screen.getByLabelText("Primeiro")).toBeDisabled();
    expect(screen.getByLabelText("Primeiro").id).not.toBe(
      screen.getByLabelText("Segundo").id,
    );
  });

  it("expõe mensagens de estados às tecnologias assistivas", () => {
    render(
      <>
        <LoadingState />
        <EmptyState />
        <ErrorState />
      </>,
      { wrapper: Providers },
    );
    expect(screen.getAllByRole("status")).toHaveLength(2);
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Não foi possível carregar",
    );
  });

  it("preserva a hierarquia semântica do card e da tipografia", () => {
    render(
      <>
        <Typography as="h1" $variant="headline-lg">
          Título
        </Typography>
        <Card
          title="Detalhes"
          headingLevel={3}
          description="Descrição"
          status="Disponível"
          actions={<Button>Abrir</Button>}
        >
          Complemento
        </Card>
      </>,
      { wrapper: Providers },
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Título",
    );
    expect(screen.getByRole("article", { name: "Detalhes" })).toHaveTextContent(
      "Complemento",
    );
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "Detalhes",
    );
  });

  it("renderiza as áreas opcionais do header e omite links não fornecidos no footer", async () => {
    const scroll = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    render(
      <>
        <Header
          search={<Input label="Buscar" />}
          help={<Button>Ajuda</Button>}
          userMenu={<Button>Menu</Button>}
        />
        <Footer />
      </>,
      { wrapper: Providers },
    );
    expect(screen.getByRole("banner")).toContainElement(
      screen.getByRole("textbox", { name: "Buscar" }),
    );
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    await userEvent.click(
      screen.getByRole("button", { name: "Voltar ao topo" }),
    );
    expect(scroll).toHaveBeenCalledWith({ top: 0, behavior: "instant" });
    scroll.mockRestore();
  });
});
