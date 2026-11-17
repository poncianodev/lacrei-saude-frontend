import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";
import Providers from "./providers";

describe("Página inicial", () => {
  it("renderiza o conteúdo inicial com os providers da aplicação", () => {
    render(<Home />, { wrapper: Providers });

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Seu cuidado começa com respeito a quem você é.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("main")).toHaveTextContent(
      "Projeto em preparação.",
    );
  });
});
