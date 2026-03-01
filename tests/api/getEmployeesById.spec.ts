import { test, expect } from "@playwright/test";

test.describe("GET employees by id API test suite", () => {
    test("GET employees by id, positive flow", async ({ request }) => {
        // Add new employee
        const newEmplPayload = { firstName: "TestN", lastName: "TestL", dependants: 10 };
        const newEmplResponse = await request.post(
            "https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees",
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Basic VGVzdFVzZXI4OTk6I3paWDtRfGlxRjh6",
                },
                data: newEmplPayload,
            },
        );
        const body = await newEmplResponse.json();
        const uuid = body.id;

        // Send GET request
        const response = await request.get(
            `https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees/${uuid}`,
            {
                headers: {
                    Authorization: "Basic VGVzdFVzZXI4OTk6I3paWDtRfGlxRjh6",
                },
            },
        );

        expect(response.status()).toBe(200);

        // Clear data
        await request.delete(`https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees/${uuid}`, {
            headers: {
                Authorization: "Basic VGVzdFVzZXI4OTk6I3paWDtRfGlxRjh6",
            },
        });
    });

    test.skip("GET employees by id, non-existed id", async ({ request }) => {
        // Send GET request
        const response = await request.get(
            `https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees/00000000-0000-0000-0000-000000000000`,
            {
                headers: {
                    Authorization: "Basic VGVzdFVzZXI4OTk6I3paWDtRfGlxRjh6",
                },
            },
        );

        expect(response.status()).toBe(404);
    });

    test("GET employees by id, unauthorized", async ({ request }) => {
        // Send GET request
        const response = await request.get(
            `https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees/f1d1615d-3133-40f2-b281-e8b119e79db2`,
        );

        expect(response.status()).toBe(401);
    });

    test.skip("GET employees by id, incorrect format of uuid", async ({ request }) => {
        // Send GET request
        const response = await request.get(
            `https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees/fdd`,
            {
                headers: {
                    Authorization: "Basic VGVzdFVzZXI4OTk6I3paWDtRfGlxRjh6",
                },
            },
        );

        expect(response.status()).toBe(400);
    });
});
