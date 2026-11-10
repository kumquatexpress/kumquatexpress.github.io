// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { hydrateRoot } from "react-dom/client";
import { App } from "./App";

beforeEach(() => {
  const values = new Map<string, string>();
  vi.stubGlobal("localStorage", {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => values.set(key, value),
    removeItem: (key: string) => values.delete(key),
    clear: () => values.clear(),
    key: (index: number) => [...values.keys()][index] ?? null,
    get length() {
      return values.size;
    },
  });
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  );
});
afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("The personal site", () => {
  it("keeps biography, work, and valid section destinations in static HTML", () => {
    const page = new DOMParser().parseFromString(
      renderToString(<App />),
      "text/html",
    );
    expect(page.querySelectorAll("h1")).toHaveLength(1);
    for (const section of ["main", "work", "about", "contact", "stylized"])
      expect(page.getElementById(section)).not.toBeNull();
    expect(page.body.textContent).toContain("Boyang Niu");
    expect(page.body.textContent).toContain("I co-founded Stylized");
    for (const link of page.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'))
      if (link.hash) expect(page.querySelector(link.hash)).not.toBeNull();
    for (const link of page.querySelectorAll<HTMLAnchorElement>(
      'a[target="_blank"]',
    )) {
      expect(link.rel).toContain("noreferrer");
      expect(link.getAttribute("href")).toMatch(/^https:\/\//);
    }
    expect(
      page.querySelector('input[type="range"]')?.hasAttribute("disabled"),
    ).toBe(true);
    expect(
      page.querySelector(".site-shell")?.classList.contains("is-hydrated"),
    ).toBe(false);
  });

  it("moves the light and cast shadow in opposite directions, with precise accessible values", () => {
    const { container } = render(<App />);
    const control = screen.getByRole("slider", { name: /Move the light/ });
    fireEvent.change(control, { target: { value: "80" } });
    expect(control.getAttribute("aria-valuetext")).toBe("80% to the right");
    expect(
      container.querySelector(".light-source")?.getAttribute("style"),
    ).toContain("translateX(124px)");
    expect(
      container.querySelector(".light-shadow")?.getAttribute("style"),
    ).toContain("translateX(-53.6px)");
    fireEvent.change(control, { target: { value: "0" } });
    expect(control.getAttribute("aria-valuetext")).toBe("Light directly above");
  });

  it("persists the visitor's pause setting across visits", () => {
    const first = render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /Pause motion/ }));
    expect(window.localStorage.getItem("boyang-motion-paused")).toBe("true");
    first.unmount();
    const second = render(<App />);
    expect(
      second.container.firstElementChild?.classList.contains("motion-paused"),
    ).toBe(true);
    fireEvent.click(screen.getByRole("button", { name: /Resume motion/ }));
    expect(window.localStorage.getItem("boyang-motion-paused")).toBe("false");
  });

  it("starts paused when the system requests reduced motion", () => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    );
    const { container } = render(<App />);
    expect(
      container.firstElementChild?.classList.contains("motion-paused"),
    ).toBe(true);
    expect(
      screen
        .getByRole("button", { name: /Resume motion/ })
        .getAttribute("aria-pressed"),
    ).toBe("true");
  });

  it("keeps the page and motion controls usable when browser storage is blocked", () => {
    vi.spyOn(window.localStorage, "getItem").mockImplementation(() => {
      throw new DOMException("Storage is blocked", "SecurityError");
    });
    vi.spyOn(window.localStorage, "setItem").mockImplementation(() => {
      throw new DOMException("Storage is blocked", "SecurityError");
    });
    const warning = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<App />);
    expect(screen.getByRole("slider").hasAttribute("disabled")).toBe(false);
    fireEvent.click(screen.getByRole("button", { name: /Pause motion/ }));
    expect(
      screen
        .getByRole("button", { name: /Resume motion/ })
        .getAttribute("aria-pressed"),
    ).toBe("true");
    expect(warning).toHaveBeenCalledWith(
      expect.stringContaining("MOTION_STORAGE_UNAVAILABLE"),
      expect.any(DOMException),
    );
    warning.mockRestore();
  });

  it("streams a local example on request and stops progressing when paused", () => {
    vi.useFakeTimers();
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /Replay example/ }));
    act(() => vi.advanceTimersByTime(45));
    expect(screen.getByLabelText("Local streaming example").textContent).toBe(
      "S▎",
    );
    fireEvent.click(screen.getByRole("button", { name: /Pause example/ }));
    act(() => vi.advanceTimersByTime(500));
    expect(screen.getByLabelText("Local streaming example").textContent).toBe(
      "S▎",
    );
    fireEvent.click(screen.getByRole("button", { name: /Replay example/ }));
    fireEvent.click(screen.getByRole("button", { name: /Pause motion/ }));
    act(() => vi.advanceTimersByTime(500));
    expect(screen.getByLabelText("Local streaming example").textContent).toBe(
      "▎",
    );
  });

  it("hydrates the static document without replacing content or reporting mismatches", async () => {
    const container = document.createElement("div");
    container.innerHTML = renderToString(<App />);
    document.body.append(container);
    const originalHeading = container.querySelector("h1");
    const errors: unknown[] = [];
    let root: ReturnType<typeof hydrateRoot>;
    await act(async () => {
      root = hydrateRoot(container, <App />, {
        onRecoverableError: (error) => errors.push(error),
      });
    });
    expect(errors).toEqual([]);
    expect(container.querySelector("h1")).toBe(originalHeading);
    expect(screen.getByRole("slider").hasAttribute("disabled")).toBe(false);
    await act(async () => root.unmount());
    container.remove();
  });
});
