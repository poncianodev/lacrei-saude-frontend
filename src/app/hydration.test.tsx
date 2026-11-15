import { act } from "@testing-library/react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { expect, it, vi } from "vitest";
import Home from "./page";
import Providers from "./providers";

it("hidrata o conteúdo do servidor sem erros recuperáveis", async () => {
  const content = (
    <Providers>
      <Home />
    </Providers>
  );
  const container = document.createElement("div");
  container.innerHTML = renderToString(content);
  document.body.appendChild(container);
  const serverMarkup = container.innerHTML;
  const onRecoverableError = vi.fn();
  let root: ReturnType<typeof hydrateRoot> | undefined;

  try {
    await act(async () => {
      root = hydrateRoot(container, content, { onRecoverableError });
    });

    expect(onRecoverableError).not.toHaveBeenCalled();
    expect(container.innerHTML).toBe(serverMarkup);
  } finally {
    await act(async () => root?.unmount());
    container.remove();
  }
});
