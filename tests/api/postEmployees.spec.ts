import { test, expect } from "@playwright/test";

test.describe("POST employees API test suite", () => {
    test("POST employees, positive flow", async ({ request }) => {
        const response = await request.post(
            "https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees",
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Basic VGVzdFVzZXI4OTk6I3paWDtRfGlxRjh6",
                },
                data: {
                    username: "string",
                    firstName: "TestPost",
                    lastName: "TestLastPost",
                    dependants: 10,
                    expiration: "2026-03-01T15:21:39.108Z",
                    salary: 100,
                },
            },
        );

        expect(response.status()).toBe(200);

        const body = await response.json();
        const uuid = body.id;

        // Clear data
        await request.delete(`https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees/${uuid}`, {
            headers: {
                Authorization: "Basic VGVzdFVzZXI4OTk6I3paWDtRfGlxRjh6",
            },
        });
    });

    test("POST employees, missing mandatory fields", async ({ request }) => {
        const response = await request.post(
            "https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees",
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Basic VGVzdFVzZXI4OTk6I3paWDtRfGlxRjh6",
                },
                data: {
                    username: "string",
                    dependants: 10,
                    expiration: "2026-03-01T15:21:39.108Z",
                    salary: 100,
                },
            },
        );

        expect(response.status()).toBe(400);
    });

    test.skip("POST employees, invalid data types", async ({ request }) => {
        const response = await request.post(
            "https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees",
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Basic VGVzdFVzZXI4OTk6I3paWDtRfGlxRjh6",
                },
                data: {
                    username: "string",
                    firstName: "TestPost",
                    lastName: "TestLastPost",
                    dependants: "ten",
                    expiration: "2026-03-01T15:21:39.108Z",
                    salary: 100,
                },
            },
        );

        expect(response.status()).toBe(400);
    });

    test.skip("POST employees, invalid date format", async ({ request }) => {
        const response = await request.post(
            "https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees",
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Basic VGVzdFVzZXI4OTk6I3paWDtRfGlxRjh6",
                },
                data: {
                    username: "string",
                    firstName: "TestPost",
                    lastName: "TestLastPost",
                    dependants: 10,
                    expiration: "invalid",
                    salary: 100,
                },
            },
        );

        expect(response.status()).toBe(400);
    });

    test("POST employees, invalid range for dependants", async ({ request }) => {
        const response = await request.post(
            "https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees",
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Basic VGVzdFVzZXI4OTk6I3paWDtRfGlxRjh6",
                },
                data: {
                    username: "string",
                    firstName: "TestPost",
                    lastName: "TestLastPost",
                    dependants: 33,
                    expiration: "2026-03-01T15:21:39.108Z",
                    salary: 100,
                },
            },
        );

        expect(response.status()).toBe(400);

        const body = await response.json();

    });

    test("POST employees, empty body", async ({ request }) => {
        const response = await request.post(
            "https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees",
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Basic VGVzdFVzZXI4OTk6I3paWDtRfGlxRjh6",
                },
                data: {
                },
            },
        );

        expect(response.status()).toBe(400);

        const body = await response.json();

    });

    test("POST employees, unauthorized", async ({ request }) => {
        const response = await request.post(
            "https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees",
            {
                headers: {
                    "Content-Type": "application/json",
                },
                data: {
                    username: "string",
                    firstName: "TestPost",
                    lastName: "TestLastPost",
                    dependants: 10,
                    expiration: "2026-03-01T15:21:39.108Z",
                    salary: 100,
                },
            },
        );

        expect(response.status()).toBe(401);

    });

    test("POST employees, positive flow, only mandatory fields", async ({ request }) => {
        const response = await request.post(
            "https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees",
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Basic VGVzdFVzZXI4OTk6I3paWDtRfGlxRjh6",
                },
                data: {
                    username: "string",
                    firstName: "TestPost",
                    lastName: "TestLastPost",
                },
            },
        );

        expect(response.status()).toBe(200);

        const body = await response.json();
        const uuid = body.id;

        // Clear data
        await request.delete(`https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees/${uuid}`, {
            headers: {
                Authorization: "Basic VGVzdFVzZXI4OTk6I3paWDtRfGlxRjh6",
            },
        });
    });

});
