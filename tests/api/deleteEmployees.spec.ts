import { test, expect } from "@playwright/test";

test.describe("DELETE employees API test suite", () => {
    test("DELETE employees, positive flow", async ({ request }) => {

        // Make new employee
        const response = await request.post(
            "https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees",
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Basic VGVzdFVzZXI4OTk6I3paWDtRfGlxRjh6",
                },
                data: {
                    username: "string",
                    firstName: "TestDelete",
                    lastName: "TestLastDelete",
                    dependants: 10,
                    expiration: "2026-03-01T15:21:39.108Z",
                    salary: 100,
                },
            },
        );

        const body = await response.json();
        const uuid = body.id;

        const deleteResponse = await request.delete(`https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees/${uuid}`, {
            headers: {
                Authorization: "Basic VGVzdFVzZXI4OTk6I3paWDtRfGlxRjh6",
            },
        });

        expect(deleteResponse.status()).toBe(200);
    });

    test("DELETE employees, unauthorized", async ({ request }) => {

        // Make new employee
        const response = await request.post(
            "https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees",
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Basic VGVzdFVzZXI4OTk6I3paWDtRfGlxRjh6",
                },
                data: {
                    username: "string",
                    firstName: "TestDelete",
                    lastName: "TestLastDelete",
                    dependants: 10,
                    expiration: "2026-03-01T15:21:39.108Z",
                    salary: 100,
                },
            },
        );

        const body = await response.json();
        const uuid = body.id;

        const deleteResponse = await request.delete(`https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees/${uuid}`);

        expect(deleteResponse.status()).toBe(401);

        // Clear data
        await request.delete(`https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees/${uuid}`, {
            headers: {
                Authorization: "Basic VGVzdFVzZXI4OTk6I3paWDtRfGlxRjh6",
            },
        });
    });

    test.skip("DELETE employees, non-existing employee", async ({ request }) => {

        // Make new employee
        const response = await request.post(
            "https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees",
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Basic VGVzdFVzZXI4OTk6I3paWDtRfGlxRjh6",
                },
                data: {
                    username: "string",
                    firstName: "TestDelete",
                    lastName: "TestLastDelete",
                    dependants: 10,
                    expiration: "2026-03-01T15:21:39.108Z",
                    salary: 100,
                },
            },
        );

        const body = await response.json();
        const uuid = body.id;

        const deleteResponse = await request.delete(`https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees/00000000-0000-0000-0000-000000000000`, {
            headers: {
                Authorization: "Basic VGVzdFVzZXI4OTk6I3paWDtRfGlxRjh6",
            },
        });

        expect.soft(deleteResponse.status()).toBe(404);


        // Clear data
        await request.delete(`https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees/${uuid}`, {
            headers: {
                Authorization: "Basic VGVzdFVzZXI4OTk6I3paWDtRfGlxRjh6",
            },
        });
    });

    test.skip("DELETE employees, invalid UUID", async ({ request }) => {

        // Make new employee
        const response = await request.post(
            "https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees",
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Basic VGVzdFVzZXI4OTk6I3paWDtRfGlxRjh6",
                },
                data: {
                    username: "string",
                    firstName: "TestDelete",
                    lastName: "TestLastDelete",
                    dependants: 10,
                    expiration: "2026-03-01T15:21:39.108Z",
                    salary: 100,
                },
            },
        );

        const body = await response.json();
        const uuid = body.id;

        const deleteResponse = await request.delete(`https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees/invalid`, {
            headers: {
                Authorization: "Basic VGVzdFVzZXI4OTk6I3paWDtRfGlxRjh6",
            },
        });

        expect.soft(deleteResponse.status()).toBe(400);

        // Clear data
        await request.delete(`https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees/${uuid}`, {
            headers: {
                Authorization: "Basic VGVzdFVzZXI4OTk6I3paWDtRfGlxRjh6",
            },
        });
    });

});
