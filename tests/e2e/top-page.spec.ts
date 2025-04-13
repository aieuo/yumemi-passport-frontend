import { expect, test } from "@playwright/test";

test.describe("トップページ", () => {
  test("タイトルが正常に表示されているか", async ({ page }) => {
    await page.goto("http://localhost:3000");

    await expect(page).toHaveTitle("都道府県別の総人口推移グラフ");

    const title = page.getByText("都道府県別の総人口推移グラフ");
    await expect(title).toBeVisible();
  });

  test("都道府県リストが正常に表示されているか", async ({ page }) => {
    await page.goto("http://localhost:3000");

    const prefectureList = page.getByText("都道府県").locator("+ div");
    await expect(prefectureList).toBeVisible();

    const checked = prefectureList.locator("input[checked]");
    await expect(checked).toHaveCount(0);
  });

  test("グラフが正常に表示されているか", async ({ page }) => {
    await page.goto("http://localhost:3000");

    const graph = page.locator(".recharts-wrapper");
    await expect(graph).toBeVisible();

    const lines = graph.locator(".recharts-line-curve");
    await expect(lines).toHaveCount(0);
  });

  test("都道府県の選択が正常に動作しているか", async ({ page }) => {
    await page.goto("http://localhost:3000");

    const prefectureList = page.getByText("都道府県").locator("+ div");
    await expect(prefectureList).toBeVisible();

    const tokyo = prefectureList.getByText("東京都");
    await tokyo.click();

    const checkbox = tokyo.locator("xpath=preceding-sibling::input");
    await expect(checkbox).toBeChecked();

    const graph = page.locator(".recharts-wrapper");
    const line = graph.locator(".recharts-line-curve[name='東京都']");
    await expect(line).toBeVisible();

    await tokyo.click();

    await expect(checkbox).not.toBeChecked();
    await expect(line).not.toBeVisible();
  });

  test("表示するデータの種類を変更できるか", async ({ page }) => {
    await page.goto("http://localhost:3000");

    const prefectureList = page.getByText("都道府県").locator("+ div");
    await expect(prefectureList).toBeVisible();

    const tokyo = prefectureList.getByText("東京都");
    await tokyo.click();

    const graph = page.locator(".recharts-wrapper");
    const graphTitle = graph.locator("xpath=ancestor::*[4]").locator("h2");
    await expect(graphTitle).toContainText("総人口");

    const menuButton = page.locator(
      "div[role='button']:has(span.rounded-full)",
    );
    await menuButton.click();

    const menu = menuButton.locator("xpath=following-sibling::*");
    await menu.getByText("年少人口").click();

    await expect(graphTitle).toContainText("年少人口");
  });
});
