const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../../index");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.disconnect();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Auth API", () => {
  test("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "safvantest",
      email: "safvantest@gmail.com",
      password: "12345678",
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("token");
  });

  test("should not register a user with existing email", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "safvantest",
      email: "safvantest@gmail.com",
      password: "12345678",
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("User already exists");
  });
});
