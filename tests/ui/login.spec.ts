import { test, expect } from "@playwright/test";
import { PASSWORD, USERNAME } from "../../utils/globalVariables";


test.describe("login test suite", () => {

    test.beforeEach(async ({page}) => {
        await page.goto("https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/Login");
        await expect(page.getByRole("link", { name: "Paylocity Benefits Dashboard" })).toBeVisible();
    })

    test("successfull login", async ({ page }) => {

        await page.getByRole('textbox', { name: 'Username' }).fill(USERNAME);
        await page.getByRole('textbox', { name: 'Password' }).fill(PASSWORD);
        await page.getByRole('button', { name: 'Log In' }).click();
        await expect(page.getByRole('link', { name: 'Log Out' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Add Employee' })).toBeVisible();

    });

    test("unsuccessfull login with empty field", async ({ page }) => {

        await page.getByRole('textbox', { name: 'Username' }).fill("");
        await page.getByRole('textbox', { name: 'Password' }).fill("");
        await page.getByRole('button', { name: 'Log In' }).click();

        await expect(page.locator('form')).toContainText('There were one or more problems that prevented you from logging in: The Username field is required. The Password field is required.');
        await expect(page).toHaveURL("https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/Login");
        await expect(page.getByRole('link', { name: 'Log Out' })).not.toBeVisible();

    });

    test.fixme("unsuccessfull login with invalid values", async ({ page }) => {

        await page.getByRole('textbox', { name: 'Username' }).fill("test11234");
        await page.getByRole('textbox', { name: 'Password' }).fill("test112324");
        await page.getByRole('button', { name: 'Log In' }).click();

        await expect(page).toHaveURL("https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/Login");
        await expect(page.getByRole('link', { name: 'Log Out' })).not.toBeVisible();

    });

});
