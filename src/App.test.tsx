// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
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

afterEach(cleanup);

describe("The personal site", () => {
  it("keeps the full biography, work, and valid section destinations in its static HTML", () => {
    const html = renderToString(<App />);
    const page = new DOMParser().parseFromString(html, "text/html");
    expect(page.querySelectorAll("h1")).toHaveLength(1);
    for (const section of ["main", "work", "about", "contact"]) {
      expect(page.getElementById(section)).not.toBeNull();
    }
    expect(page.body.textContent).toContain("Boyang Niu");
    expect(page.body.textContent).toContain("I co-founded Stylized");
    for (const link of page.querySelectorAll<HTMLAnchorElement>(
      'a[href^="#"]',
    )) {
      if (link.hash) expect(page.querySelector(link.hash)).not.toBeNull();
    }
    for (const link of page.querySelectorAll<HTMLAnchorElement>(
      'a[target="_blank"]',
    )) {
      expect(link.rel).toContain("noreferrer");
      expect(link.getAttribute("href")).toMatch(/^https:\/\//);
    }
  });

  it("lets visitors change the sculpture palette and turn it using native buttons", () => {
    render(<App />);
    const ultramarine = screen.getByRole("button", {
      name: "Ultramarine palette",
    });
    const moss = screen.getByRole("button", { name: "Moss palette" });
    expect(ultramarine.getAttribute("aria-pressed")).toBe("true");
    fireEvent.click(moss);
    expect(moss.getAttribute("aria-pressed")).toBe("true");
    expect(ultramarine.getAttribute("aria-pressed")).toBe("false");
    const flower = screen.getByRole("button", {
      name: "Spin the paper sculpture",
    });
    fireEvent.click(flower);
    expect(flower.innerHTML).toContain("rotate(100deg)");
    fireEvent.click(flower);
    expect(flower.innerHTML).toContain("rotate(200deg)");
  });

  it("pauses ambient animation and lets visitors resume it", () => {
    const { container } = render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /Pause motion/ }));
    expect(
      container.firstElementChild?.classList.contains("motion-paused"),
    ).toBe(true);
    const resume = screen.getByRole("button", { name: /Resume motion/ });
    expect(resume.getAttribute("aria-pressed")).toBe("true");
    fireEvent.click(resume);
    expect(
      container.firstElementChild?.classList.contains("motion-paused"),
    ).toBe(false);
  });

  it("hydrates the prerendered document without replacing content or reporting mismatches", async () => {
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
    fireEvent.click(screen.getByRole("button", { name: "Persimmon palette" }));
    expect(
      screen
        .getByRole("button", { name: "Persimmon palette" })
        .getAttribute("aria-pressed"),
    ).toBe("true");
    await act(async () => root.unmount());
    container.remove();
  });
});
