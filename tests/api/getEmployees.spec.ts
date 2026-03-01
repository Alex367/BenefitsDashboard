import { test, expect } from "@playwright/test";

const BASE_URL = "https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api";

const EMPLOYEES_ENDPOINT = `${BASE_URL}/Employees`;

const AUTH_HEADER = {
    Authorization: "Basic VGVzdFVzZXI4OTk6I3paWDtRfGlxRjh6",
};

test.describe("GET /Employees API", () => {
    test("should return 200 when authorized", async ({ request }) => {
        const response = await request.get(EMPLOYEES_ENDPOINT, {
            headers: AUTH_HEADER,
        });

        expect(response.status()).toBe(200);
    });

    test("should return 401 when authorization header is missing", async ({ request }) => {
        const response = await request.get(EMPLOYEES_ENDPOINT);

        expect(response.status()).toBe(401);
    });

    test("should return 404 for invalid endpoint", async ({ request }) => {
        const response = await request.get(`${BASE_URL}/EmployeesXYZ`, {
            headers: AUTH_HEADER,
        });

        expect(response.status()).toBe(404);
    });
});
