// const loginFunctions = require('../routes/login.js');
// const registerFunctions = require('../routes/register.js');

// var loginRouter = require('./routes/login');
// var registerRouter = require('./routes/register');
// this.use('/login', loginRouter);
// this.use('/register', registerRouter);

const request = require("supertest");
const baseURL = "http://localhost:7123"
// const application = require('../app.js');
// jest.useFakeTimers();
// const app = application();
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

    // it("Login without credentials", async () => {
    //     const bodyData = [ {email: "user@test.com", password: "pass123", password_confirm: "pass456"} ]
    //     const res = await req.post("/login/auth/").send({bodyData});
    //     expect(res.body.errormessage).toBe("Please enter email address and password.");
    // })

    // test("Register with mismatched passwords", async () => {
    //     const bodyData = [ {email: "user@test.com", password: "pass123", password_confirm: "pass456"} ]
    // })
});