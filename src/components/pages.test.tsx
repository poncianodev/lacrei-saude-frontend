import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, it, vi } from "vitest";
import Providers from "@/app/providers";
import Home from "@/app/page";
import ProfessionalsPage from "@/app/profissionais/page";
import { ProfessionalDialog } from "./professional-dialog";
import { professionals } from "@/mocks/professionals";

// jsdom não implementa showModal/close. A contenção nativa de foco é validada no navegador.
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute("open", "");
    this.querySelector("button")?.focus();
  };
  HTMLDialogElement.prototype.close = function () {
    this.removeAttribute("open");
  };
});

describe("Páginas e exploração", () => {
  it("renderiza as seções da Home e links de navegação reais", () => {
    render(<Home />, { wrapper: Providers });
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", { name: "Como funciona" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Cuidado que reconhece você" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Explorar profissionais" }),
    ).toHaveAttribute("href", "/profissionais");
    expect(
      within(screen.getByRole("navigation", { name: "Principal" })).getByRole(
        "link",
        { name: "Início" },
      ),
    ).toHaveAttribute("href", "/");
  });
  it("busca por nome sem acentos e combina busca com especialidade", async () => {
    render(<ProfessionalsPage />, { wrapper: Providers });
    const user = userEvent.setup();
    await user.type(screen.getByRole("searchbox"), "iris");
    expect(
      screen.getByRole("article", { name: "Íris Nuvélia" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(1);
    await user.click(screen.getByRole("button", { name: "Psicologia" }));
    expect(screen.queryByRole("article")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Limpar filtros" }));
    expect(screen.getAllByRole("article")).toHaveLength(6);
    expect(screen.getByRole("searchbox")).toHaveFocus();
    expect(screen.getByRole("searchbox")).toHaveValue("");
    expect(screen.getByRole("button", { name: "Todas" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });
  it("filtra por especialidade e anuncia o total", async () => {
    render(<ProfessionalsPage />, { wrapper: Providers });
    await userEvent.click(screen.getByRole("button", { name: "Nutrição" }));
    expect(screen.getAllByRole("article")).toHaveLength(2);
    expect(screen.getByRole("status")).toHaveTextContent(
      "2 perfis encontrados",
    );
  });
  it("abre detalhes, foca o botão de fechar e restaura o foco", async () => {
    render(<ProfessionalsPage />, { wrapper: Providers });
    const trigger = screen.getByRole("button", {
      name: "Ver detalhes de Ari Ventolume",
    });
    await userEvent.click(trigger);
    const dialog = screen.getByRole("dialog", { name: "Ari Ventolume" });
    expect(dialog).toHaveAccessibleDescription(professionals[0].details);
    const close = within(dialog).getByRole("button", {
      name: "Fechar detalhes",
    });
    expect(close).toHaveFocus();
    await userEvent.tab();
    expect(close).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(close).toHaveFocus();
    await userEvent.click(close);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
  it("trata o evento cancel emitido pelo Escape no modal nativo", () => {
    const onClose = vi.fn();
    render(
      <ProfessionalDialog professional={professionals[0]} onClose={onClose} />,
      { wrapper: Providers },
    );
    fireEvent(
      screen.getByRole("dialog"),
      new Event("cancel", { bubbles: false, cancelable: true }),
    );
    expect(onClose).toHaveBeenCalledOnce();
  });
});
