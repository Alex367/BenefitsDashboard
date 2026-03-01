import { test, expect } from "@playwright/test";

const BASE_URL = "https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api";

const AUTH_HEADERS = {
    Authorization: "Basic VGVzdFVzZXI4OTk6I3paWDtRfGlxRjh6",
};

const JSON_HEADERS = {
    ...AUTH_HEADERS,
    "Content-Type": "application/json",
};

async function createEmployee(request: any) {
    const response = await request.post(`${BASE_URL}/employees`, {
        headers: JSON_HEADERS,
        data: {
            username: "string",
            firstName: "TestDelete",
            lastName: "TestLastDelete",
            dependants: 10,
            expiration: new Date().toISOString(),
            salary: 100,
        },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    return body.id;
}

async function deleteEmployee(request: any, id: string) {
    return request.delete(`${BASE_URL}/employees/${id}`, {
        headers: AUTH_HEADERS,
    });
}

test.describe("DELETE /employees/{id} API", () => {
    test.describe("Positive scenarios", () => {
        test("should delete existing employee", async ({ request }) => {
            const id = await createEmployee(request);

            const response = await deleteEmployee(request, id);

            expect(response.status()).toBe(200);
        });
    });

    test.describe("Authorization", () => {
        test("should return 401 when unauthorized", async ({ request }) => {
            const id = await createEmployee(request);

            const response = await request.delete(`${BASE_URL}/employees/${id}`);

            expect(response.status()).toBe(401);

            // cleanup
            await deleteEmployee(request, id);
        });
    });

    test.describe("Negative scenarios", () => {
        test.skip("should return 404 for non-existing employee", async ({ request }) => {
            const response = await deleteEmployee(request, "00000000-0000-0000-0000-000000000000");

            expect(response.status()).toBe(404);
        });

        test.skip("should return 400 for invalid UUID format", async ({ request }) => {
            const response = await deleteEmployee(request, "invalid");

            expect(response.status()).toBe(400);
        });
    });
});
