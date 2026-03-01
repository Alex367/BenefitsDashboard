import { test, expect } from "@playwright/test";

test.describe("GET employees API test suite", () => {
    test("GET employees, positive flow", async ({ request }) => {
        // Send GET request
        const response = await request.get(
            "https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/Employees",
            {
                headers: {
                    Authorization: "Basic VGVzdFVzZXI4OTk6I3paWDtRfGlxRjh6",
                },
            },
        );

        expect(response.status()).toBe(200);
    });

    test("GET employees, unauthorized", async ({ request }) => {
        // Send GET request
        const response = await request.get("https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/Employees");

        expect(response.status()).toBe(401);
    });

    test("GET employees, invalid URL", async ({ request }) => {
        const resNotFound = await request.get("https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/EmployeesXYZ", {
            headers: { Authorization: "Basic VGVzdFVzZXI4OTk6I3paWDtRfGlxRjh6" },
        });
        expect(resNotFound.status()).toBe(404);
    });
});
