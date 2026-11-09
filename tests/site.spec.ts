import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("art and work links are available without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173");
  await expect(page.getByRole("heading", { name: "Boyang Niu" })).toBeVisible();
  expect(
    await page
      .locator(".world-poster img")
      .evaluate(
        (image: HTMLImageElement) => image.complete && image.naturalWidth > 0,
      ),
  ).toBe(true);
  await expect(page.getByRole("button", { name: "Enter 3D" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Let’s play" })).toHaveCount(0);
  await page.getByRole("link", { name: "Work", exact: true }).click();
  await expect(page).toHaveURL(/#work$/);
  await expect(
    page.getByRole("heading", { name: "Sora", exact: true }),
  ).toBeVisible();
  expect(await page.locator(".art-project").count()).toBe(3);
  await context.close();
});

for (const width of [360, 768, 1440]) {
  test(`art-led layout is accessible at ${width}px`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(async () => {
      const images = Array.from(document.images);
      images.forEach((image) => {
        image.loading = "eager";
      });
      await Promise.all(images.map((image) => image.decode()));
    });
    const overflowing = await page.evaluate(() =>
      Array.from(document.querySelectorAll("body *"))
        .filter(
          (element) => element.getBoundingClientRect().right > innerWidth + 1,
        )
        .map((element) => ({
          tag: element.tagName,
          className: element.className,
          right: element.getBoundingClientRect().right,
        })),
    );
    expect(overflowing).toEqual([]);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
    await page.screenshot({
      path: testInfo.outputPath(`${width}-world.png`),
      fullPage: true,
    });
  });
}

test("island loads on demand, responds, pauses and respects live reduced motion", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  const sceneRequests: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("request", (request) => {
    if (request.url().includes("/assets/world-scene-"))
      sceneRequests.push(request.url());
  });
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Enter 3D" })).toBeVisible();
  expect(sceneRequests).toEqual([]);
  await page.getByRole("button", { name: "Enter 3D" }).click();
  await expect(page.locator(".world-stage")).toHaveClass(/scene-playing/, {
    timeout: 30000,
  });
  expect(sceneRequests.length).toBeGreaterThan(0);
  const scene = page.locator(".world-canvas");
  await expect(scene).toHaveAttribute("data-motion", "running");
  await page.getByRole("button", { name: "Rotate island left" }).focus();
  await page.keyboard.press("Enter");
  await page.getByRole("button", { name: "Launch citrus" }).click();
  await expect(page.getByText("A tiny leap for citrus-kind.")).toBeVisible();
  await page.getByRole("button", { name: "Pause island animation" }).click();
  await expect(scene).toHaveAttribute("data-motion", "still");
  await page
    .locator(".world-stage")
    .screenshot({ path: testInfo.outputPath("interactive-island.png") });
  await page.getByRole("button", { name: "Resume island animation" }).click();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(scene).toHaveAttribute("data-motion", "still");
  const frames = await scene.getAttribute("data-frames");
  await page.waitForTimeout(180);
  expect(await scene.getAttribute("data-frames")).toBe(frames);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(scene).toHaveAttribute("data-motion", "running");
  await page.locator("#play").scrollIntoViewIfNeeded();
  await expect(scene).toHaveAttribute("data-motion", "still");
  expect(errors).toEqual([]);
});

test("initial reduced motion renders a still world with keyboard controls", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Enter 3D" }).focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".world-stage")).toHaveClass(/scene-playing/, {
    timeout: 30000,
  });
  await expect(page.locator(".world-canvas")).toHaveAttribute(
    "data-motion",
    "still",
  );
  await expect(
    page.getByRole("button", { name: "Rotate island left" }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("button", { name: "Launch citrus" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByText("A tiny leap for citrus-kind.")).toBeVisible();
  await page.getByRole("button", { name: "Return to the artwork" }).click();
  await expect(page.getByRole("button", { name: "Enter 3D" })).toBeFocused();
  await expect(page.locator(".world-canvas canvas")).toHaveCount(0);
});

test("phone visitors can tap scene controls and return to the artwork", async ({
  browser,
}, testInfo) => {
  const context = await browser.newContext({
    viewport: { width: 360, height: 820 },
    isMobile: true,
    hasTouch: true,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173");
  await page.getByRole("button", { name: "Enter 3D" }).tap();
  await expect(page.locator(".world-stage")).toHaveClass(/scene-playing/, {
    timeout: 30000,
  });
  await expect(page.locator(".world-canvas canvas")).toHaveCSS(
    "touch-action",
    "pan-y",
  );
  await page.getByRole("button", { name: "Rotate island right" }).tap();
  await page
    .locator(".world-stage")
    .screenshot({ path: testInfo.outputPath("phone-island.png") });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.getByRole("button", { name: "Return to the artwork" }).tap();
  await expect(page.locator(".world-stage")).toHaveClass(/scene-poster/);
  await context.close();
});

test("a blocked scene chunk preserves the artwork and navigation", async ({
  page,
}) => {
  await page.route("**/assets/world-scene-*.js", (route) => route.abort());
  await page.goto("/");
  await page.getByRole("button", { name: "Enter 3D" }).click();
  await expect(page.locator(".world-stage")).toHaveClass(/scene-failed/);
  await expect(page.locator(".world-poster")).toHaveCSS("opacity", "1");
  await page.getByRole("link", { name: "Work", exact: true }).click();
  await expect(page).toHaveURL(/#work$/);
});

test("lost WebGL context restores the poster", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Enter 3D" }).click();
  await expect(page.locator(".world-stage")).toHaveClass(/scene-playing/, {
    timeout: 30000,
  });
  await page
    .locator(".world-canvas canvas")
    .evaluate((canvas: HTMLCanvasElement) => {
      canvas
        .getContext("webgl2")!
        .getExtension("WEBGL_lose_context")!
        .loseContext();
    });
  await expect(page.locator(".world-stage")).toHaveClass(/scene-failed/);
  await expect(page.locator(".world-poster")).toHaveCSS("opacity", "1");
});

test("the mini arcade works with a keyboard and ends its round", async ({
  page,
}) => {
  await page.clock.install();
  await page.goto("/");
  await page.getByRole("button", { name: "Let’s play" }).focus();
  await page.keyboard.press("Enter");
  const fruit = page.getByRole("button", { name: "Catch the citrus" });
  await expect(fruit).toBeFocused();
  await page.keyboard.press("Enter");
  await page.keyboard.press("Enter");
  await expect(page.getByText("02 PTS")).toBeVisible();
  await page.clock.fastForward(15000);
  await expect(
    page.getByRole("heading", { name: "Nice side quest." }),
  ).toBeVisible();
  await expect(
    page.getByText("2 citrus caught. Not bad, human."),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "One more round?" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(fruit).toBeFocused();
  await page.keyboard.press("Tab");
  const nextExperiment = page.locator(".experiment").first();
  await expect(nextExperiment).toBeFocused();
  await page.clock.fastForward(15000);
  await expect(nextExperiment).toBeFocused();
});

test("scene readiness preserves focus when the visitor moves elsewhere", async ({
  page,
}) => {
  await page.route("**/assets/world-scene-*.js", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    await route.continue();
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Enter 3D" }).focus();
  await page.keyboard.press("Enter");
  const workLink = page.getByRole("link", { name: "Work", exact: true });
  await workLink.focus();
  await expect(page.locator(".world-stage")).toHaveClass(/scene-playing/, {
    timeout: 30000,
  });
  await expect(workLink).toBeFocused();
});
