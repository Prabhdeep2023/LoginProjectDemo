const request = require("supertest");
const baseURL = "http://localhost:7123"
const req = request(baseURL);

describe("Units tests", () => {

    it("Main page loading check", async () => {
        const res = await req.get("/");
        expect(res.statusCode).toBe(200);
    });

    it("Login form loading check", async () => {
        const res = await req.get("/login");
        expect(res.statusCode).toBe(200);
    });

    it("Register form loading check", async () => {
        const res = await req.get("/register");
        expect(res.statusCode).toBe(200);
    });
});