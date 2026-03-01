import { test, expect, Locator } from "@playwright/test";
import { PASSWORD, USERNAME } from "../../utils/globalVariables";

async function extractIcon(icons: Locator, place: number) {
    const result = await icons.nth(place).evaluate((el) => {
        const style = window.getComputedStyle(el, "::before");
        let content = style.content;

        content = content.replace(/^"|"$/g, "");

        // Convert to CSS escape sequence \f044
        if (content.length === 1) {
            const code = content.charCodeAt(0).toString(16).toLowerCase().padStart(4, "0");
            content = "\\" + code;
        }

        return `"${content}"`;
    });

    return result;
}

test.describe("benefits test suite", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/Login");
        await expect(page.getByRole("link", { name: "Paylocity Benefits Dashboard" })).toBeVisible();

        await page.getByRole("textbox", { name: "Username" }).fill(USERNAME);
        await page.getByRole("textbox", { name: "Password" }).fill(PASSWORD);
        await page.getByRole("button", { name: "Log In" }).click();

        await expect(page.getByRole("link", { name: "Log Out" })).toBeVisible();
    });

    test.skip("add new employee", async ({ page }) => {
        let firstName = "TestName";
        let lastName = "TestLastName";
        let dependents = "10";
        let salary = "52000.00";
        let grossPay = "2000.00";
        let benefitsCost = "6000.00";
        let netPay = "1769.23";

        // Waiting for loading data

        const firstRow = page.locator("tbody tr").first();
        await firstRow.waitFor({ state: "visible" });

        // Add new employee

        await page.getByRole("button", { name: "Add Employee" }).click();
        await expect(page.getByRole("heading")).toContainText("Add Employee");
        await page.getByRole("textbox", { name: "First Name:" }).fill(firstName);
        await page.getByRole("textbox", { name: "Last Name:" }).fill(lastName);
        await page.getByRole("textbox", { name: "Dependents:" }).fill(dependents);

        const responsePromise = page.waitForResponse(
            (resp) => resp.url().includes("/api/employees") && resp.request().method() === "POST",
        );

        await page.getByRole("button", { name: "Add", exact: true }).click();

        const response = await responsePromise;
        const body = await response.json();

        const uuid = body.id;

        const row = page.locator("tr", {
            has: page.locator("td", { hasText: uuid }),
        });

        let dataToTest = [uuid, firstName, lastName, dependents, salary, grossPay, benefitsCost, netPay];

        // BUG

        for (let i = 0; i < 8; i++) {
            const cell = row.locator("td").nth(i);
            await expect(cell).toHaveText(dataToTest[i]);
        }

        // Two icons
        const actionCell = row.locator("td").last();
        const icons = actionCell.locator("i");
        await expect(icons).toHaveCount(2);

        const firstIcon = await extractIcon(icons, 0);
        expect(firstIcon).toBe('"\\f044"');

        const secondIcon = await extractIcon(icons, 1);
        expect(secondIcon).toBe('"\\f00d"');

        // Clear data

        await icons.nth(1).click();
        await expect(page.getByRole("heading")).toContainText("Delete Employee");
        await page.getByRole("button", { name: "Delete" }).click();

    });

    test.skip("edit employee", async ({ page, request }) => {
        let firstName = "TestNNew";
        let lastName = "TestLNew";
        let dependents = "11";
        let salary = "52000.00";
        let grossPay = "2000.00";
        let benefitsCost = "6500.00";
        let netPay = "1750.00";

        // Add new employee
        const payload = { firstName: "TestN", lastName: "TestL", dependants: 10 };
        const response = await request.post(
            "https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees",
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Basic VGVzdFVzZXI4OTk6I3paWDtRfGlxRjh6",
                },
                data: payload,
            },
        );
        const body = await response.json();
        const uuid = body.id;

        // Waiting for loading data
        await page.reload();
        const firstRow = page.locator("tbody tr").first();
        await firstRow.waitFor({ state: "visible" });

        const row = page.locator("tr", {
            has: page.locator("td", { hasText: uuid }),
        });

        const actionCell = row.locator("td").last();
        const icons = actionCell.locator("i");

        // Edit employee
        await icons.nth(0).click();
        await page.getByRole("textbox", { name: "First Name:" }).fill(firstName);
        await page.getByRole("textbox", { name: "Last Name:" }).fill(lastName);
        await page.getByRole("textbox", { name: "Dependents:" }).fill(dependents);

        const updatePromise = page.waitForResponse(
            (resp) => resp.url().includes("/api/employees") && resp.request().method() === "PUT",
        );
        await page.getByRole("button", { name: "Update" }).click();

        const updateResponse = await updatePromise;
        const updateBody = await updateResponse.json();

        const updateId = updateBody.id;

        const updateRow = page.locator("tr", {
            has: page.locator("td", { hasText: updateId }),
        });

        let dataToTest = [updateId, firstName, lastName, dependents, salary, grossPay, benefitsCost, netPay];

        // BUG

        for (let i = 0; i < 8; i++) {
            const cell = updateRow.locator("td").nth(i);
            await expect(cell).toHaveText(dataToTest[i]);
        }

        // Clear data

        const deleteUpdatedRow = row.locator("td").last();
        const deleteUpdatedIcon = deleteUpdatedRow.locator("i");
        await deleteUpdatedIcon.nth(1).click();

        await expect(page.getByRole("heading")).toContainText("Delete Employee");
        await page.getByRole("button", { name: "Delete" }).click();
    });

    test("delete employee", async ({ page, request }) => {

        // Add new employee
        const payload = { firstName: "TestDelete", lastName: "TestLastDelete", dependants: 10 };
        const response = await request.post(
            "https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees",
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Basic VGVzdFVzZXI4OTk6I3paWDtRfGlxRjh6",
                },
                data: payload,
            },
        );
        const body = await response.json();
        const uuid = body.id;

        // Waiting for loading data
        await page.reload();
        const firstRow = page.locator("tbody tr").first();
        await firstRow.waitFor({ state: "visible" });

        const row = page.locator("tr", {
            has: page.locator("td", { hasText: uuid }),
        });

        const actionCell = row.locator("td").last();
        const icons = actionCell.locator("i");

        await icons.nth(1).click();

        await expect(page.getByRole("heading")).toContainText("Delete Employee");
        await page.getByRole("button", { name: "Delete" }).click();

        await expect(row).toHaveCount(0);

    });

    test("close modal window, cancel button", async ({ page }) => {

        // Waiting for loading data
        const firstRow = page.locator("tbody tr").first();
        await firstRow.waitFor({ state: "visible" });

        await page.getByRole("button", { name: "Add Employee" }).click();
        await expect(page.getByRole('heading')).toContainText('Add Employee');

        await page.getByRole('button', { name: 'Cancel' }).click();

        const modal = page.locator("#employeeModal");
        await expect(modal).toBeHidden();

    });

    test("close modal window, close icon", async ({ page }) => {

        // Waiting for loading data
        const firstRow = page.locator("tbody tr").first();
        await firstRow.waitFor({ state: "visible" });

        await page.getByRole("button", { name: "Add Employee" }).click();
        await expect(page.getByRole('heading')).toContainText('Add Employee');

        await page.getByRole('button', { name: 'Close' }).click();

        const modal = page.locator("#employeeModal");
        await expect(modal).toBeHidden();

    });


    test.skip("add new employee with invalid values", async ({ page }) => {
        let firstName = "";
        let lastName = "";
        let dependents = "";

        // Waiting for loading data
        const firstRow = page.locator("tbody tr").first();
        await firstRow.waitFor({ state: "visible" });

        // Add new employee
        await page.getByRole("button", { name: "Add Employee" }).click();
        await expect(page.getByRole("heading")).toContainText("Add Employee");
        await page.getByRole("textbox", { name: "First Name:" }).fill(firstName);
        await page.getByRole("textbox", { name: "Last Name:" }).fill(lastName);
        await page.getByRole("textbox", { name: "Dependents:" }).fill(dependents);

        await page.getByRole("button", { name: "Add", exact: true }).click();

        // BUG, Here should be validation of errors

    });


});
