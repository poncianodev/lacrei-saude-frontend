import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Providers from "@/app/providers";
import { Header } from "./header";
import { Footer } from "./footer";

const navigation = [
  { label: "Início", href: "/" },
  { label: "Profissionais", href: "/profissionais" },
];

function mobileToggle() {
  const toggle = screen.getByLabelText("Abrir menu");
  toggle.style.display = "inline-flex";
  return toggle;
}
describe("Header e footer responsivos", () => {
  it("abre e fecha o menu pelo botão, expondo estado e painel controlado", async () => {
    const user = userEvent.setup();
    render(<Header navigation={navigation} activeHref="/" />, {
      wrapper: Providers,
    });
    const toggle = mobileToggle();
    const nav = screen.getByRole("navigation", { name: "Principal" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveAttribute("aria-controls", nav.id);
    expect(nav).toHaveAttribute("data-expanded", "false");
    await user.click(toggle);
    expect(toggle).toHaveAccessibleName("Fechar menu");
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(nav).toHaveAttribute("data-expanded", "true");
    expect(within(nav).getByRole("link", { name: "Início" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("fecha por Escape e restaura foco mesmo após sair da navegação não modal", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Header navigation={navigation} />
        <button>Conteúdo</button>
      </>,
      { wrapper: Providers },
    );
    const toggle = mobileToggle();
    await user.click(toggle);
    screen.getByRole("button", { name: "Conteúdo" }).focus();
    await user.keyboard("{Escape}");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveFocus();
  });

  it.each(navigation)(
    "preserva o destino $href e fecha ao selecionar $label",
    async ({ label, href }) => {
      render(<Header navigation={navigation} activeHref="/profissionais" />, {
        wrapper: Providers,
      });
      const toggle = mobileToggle();
      await userEvent.click(toggle);
      const link = screen.getByRole("link", { name: label });
      expect(link).toHaveAttribute("href", href);
      link.addEventListener("click", (event) => event.preventDefault());
      fireEvent.click(link);
      expect(toggle).toHaveAttribute("aria-expanded", "false");
      expect(toggle).toHaveFocus();
    },
  );

  it("não intercepta Escape de um diálogo aberto sobre a navegação", async () => {
    render(
      <>
        <Header navigation={navigation} />
        <dialog open>
          <button>Fechar diálogo</button>
        </dialog>
      </>,
      { wrapper: Providers },
    );
    const toggle = mobileToggle();
    await userEvent.click(toggle);
    const dialogControl = screen.getByRole("button", {
      name: "Fechar diálogo",
    });
    expect(
      fireEvent.keyDown(dialogControl, { key: "Escape", cancelable: true }),
    ).toBe(true);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
  });

  it("volta ao topo e leva o foco ao logo do header", async () => {
    const scroll = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    render(
      <>
        <Header />
        <Footer
          links={navigation}
          socialIcons={[
            { label: "Facebook", icon: "/assets/icons/facebook.svg" },
          ]}
        />
      </>,
      { wrapper: Providers },
    );
    const footer = screen.getByRole("contentinfo");
    expect(
      within(footer)
        .getAllByRole("link")
        .map((link) => link.getAttribute("href")),
    ).toEqual(["/", "/", "/profissionais"]);
    expect(footer.querySelector(".footer-socials a")).toBeNull();
    expect(footer.querySelector(".footer-socials img")).toBeInTheDocument();
    await userEvent.click(
      screen.getByRole("button", { name: "Voltar ao topo" }),
    );
    expect(scroll).toHaveBeenCalledWith({ top: 0, behavior: "instant" });
    expect(
      within(screen.getByRole("banner")).getByRole("link", {
        name: "Lacrei Saúde — início",
      }),
    ).toHaveFocus();
    scroll.mockRestore();
  });
});
