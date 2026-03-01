import { test, expect } from "@playwright/test";

test.describe("PUT employees API test suite", () => {
    test.skip("PUT employees, positive flow", async ({ request }) => {
        const responsePost = await request.post(
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

        const createdData = await responsePost.json();

        const response = await request.put(
            "https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/Employees",
            {
                headers: {
                    Authorization: "Basic VGVzdFVzZXI4OTk6I3paWDtRfGlxRjh6",
                },
                data: {
                    username: "string2",
                    id: createdData.id,
                    firstName: createdData.firstName,
                    lastName: createdData.lastName,
                    dependants: 32,
                    expiration: "2025-03-01T16:13:27.781Z",
                    salary: 1000,
                },
            },
        );

        expect.soft(response.status()).toBe(200);

        const body = await response.json();
        expect.soft(body.username).toBe("string2");
        expect.soft(body.id).toBe(createdData.id);
        expect.soft(body.firstName).toBe(createdData.firstName);
        expect.soft(body.lastName).toBe(createdData.lastName);
        expect.soft(body.dependants).toBe(32);

        // Clear data
        const uuid = body.id;
        await request.delete(`https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees/${uuid}`, {
            headers: {
                Authorization: "Basic VGVzdFVzZXI4OTk6I3paWDtRfGlxRjh6",
            },
        });
    });

    test("PUT employees, unauthorized", async ({ request }) => {
        const responsePost = await request.post(
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

        const createdData = await responsePost.json();

        const response = await request.put(
            "https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/Employees",
            {
                data: {
                    username: "string2",
                    id: createdData.id,
                    firstName: createdData.firstName,
                    lastName: createdData.lastName,
                    dependants: 32,
                    expiration: "2025-03-01T16:13:27.781Z",
                    salary: 1000,
                },
            },
        );

        expect.soft(response.status()).toBe(401);

        // Clear data
        const uuid = createdData.id;
        await request.delete(`https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees/${uuid}`, {
            headers: {
                Authorization: "Basic VGVzdFVzZXI4OTk6I3paWDtRfGlxRjh6",
            },
        });
    });

    test("PUT employees, no mandatory fields", async ({ request }) => {
        const responsePost = await request.post(
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

        const createdData = await responsePost.json();

        const response = await request.put(
            "https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/Employees",
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Basic VGVzdFVzZXI4OTk6I3paWDtRfGlxRjh6",
                },
                data: {
                    id: createdData.id,
                    dependants: 32,
                    expiration: "2025-03-01T16:13:27.781Z",
                    salary: 1000,
                },
            },
        );

        expect.soft(response.status()).toBe(400);

        // Clear data
        const uuid = createdData.id;
        await request.delete(`https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees/${uuid}`, {
            headers: {
                Authorization: "Basic VGVzdFVzZXI4OTk6I3paWDtRfGlxRjh6",
            },
        });
    });
    
    test("PUT employees, max length", async ({ request }) => {
        const responsePost = await request.post(
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

        const createdData = await responsePost.json();

        const response = await request.put(
            "https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/Employees",
            {
                headers: {
                    Authorization: "Basic VGVzdFVzZXI4OTk6I3paWDtRfGlxRjh6",
                },
                data: {
                    username: "string2",
                    id: createdData.id,
                    firstName: "ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
                    lastName: "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssd",
                    dependants: 32,
                    expiration: "2025-03-01T16:13:27.781Z",
                    salary: 1000,
                },
            },
        );

        expect.soft(response.status()).toBe(400);

        // Clear data
        const uuid = createdData.id;
        await request.delete(`https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees/${uuid}`, {
            headers: {
                Authorization: "Basic VGVzdFVzZXI4OTk6I3paWDtRfGlxRjh6",
            },
        });
    });

    test.skip("PUT employees, invalid data type", async ({ request }) => {
        const responsePost = await request.post(
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

        const createdData = await responsePost.json();

        const response = await request.put(
            "https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/Employees",
            {
                headers: {
                    Authorization: "Basic VGVzdFVzZXI4OTk6I3paWDtRfGlxRjh6",
                },
                data: {
                    username: "string2",
                    id: createdData.id,
                    firstName: createdData.firstName,
                    lastName: createdData.lastName,
                    dependants: "ten",
                    expiration: "2025-03-01T16:13:27.781Z",
                    salary: 1000,
                },
            },
        );

        expect.soft(response.status()).toBe(400);

        // Clear data
        const uuid = createdData.id;
        await request.delete(`https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees/${uuid}`, {
            headers: {
                Authorization: "Basic VGVzdFVzZXI4OTk6I3paWDtRfGlxRjh6",
            },
        });
    });
});
