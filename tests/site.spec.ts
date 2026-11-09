import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("static HTML contains the content and links without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173");
  await expect(
    page.getByRole("heading", { name: "Boyang Niu." }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Sora", exact: true }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Work", exact: true }).click();
  await expect(page).toHaveURL(/#work$/);
  await expect(page.locator("#work")).toBeInViewport();
  await context.close();
});

test("keyboard interaction and saved theme survive a reload without hydration errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/");
  const kumquat = page.getByRole("button", {
    name: "Give the kumquat branch a nudge",
  });
  await kumquat.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByText("A small dose of vitamin C.")).toBeVisible();
  await page
    .getByRole("button", { name: "Toggle light and dark appearance" })
    .click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  expect(errors).toEqual([]);
});

for (const width of [360, 768, 1440]) {
  test(`accessible layout at ${width}px, both themes`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() =>
      Promise.all(
        document.getAnimations().map((animation) => animation.finished),
      ),
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    for (const theme of ["light", "dark"]) {
      await page.locator("html").evaluate((element, value) => {
        element.dataset.theme = value;
      }, theme);
      await page.evaluate(() =>
        Promise.all(
          document.getAnimations().map((animation) => animation.finished),
        ),
      );
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(results.violations).toEqual([]);
      await page.screenshot({
        path: testInfo.outputPath(`${width}-${theme}.png`),
        fullPage: true,
      });
    }
  });
}

test("reduced motion keeps the branch still and preserves the response", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page
    .getByRole("button", { name: "Give the kumquat branch a nudge" })
    .click();
  await expect(page.getByText("A small dose of vitamin C.")).toBeVisible();
  expect(
    await page
      .locator(".citrus-branch")
      .evaluate((element) => element.getAnimations().length),
  ).toBe(0);
});
