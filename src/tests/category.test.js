const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../../index");
const Category = require("../models/Category");

let mongoServer, token;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.disconnect();
  await mongoose.connect(mongoUri);

  const res = await request(app).post("/api/auth/register").send({
    name: "safvantest",
    email: "safvantest@gmail.com",
    password: "12345678",
  });

  token = res.body.token;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Category API", () => {
  test("should create a new category", async () => {
    const res = await request(app)
      .post("/api/category")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "MERN" });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.name).toBe("MERN");
  });

  test("should not create a duplicate category", async () => {
    const res = await request(app)
      .post("/api/category")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "MERN" });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Category already exists");
  });

  test("should fetch all categories", async () => {
    const res = await request(app)
      .get("/api/category")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("should update a category", async () => {
    const category = await Category.create({ name: "Books" });

    const res = await request(app)
      .put(`/api/category/${category._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Updated Books" });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Updated Books");
  });

  test("should delete a category", async () => {
    const category = await Category.create({ name: "Clothing" });

    const res = await request(app)
      .delete(`/api/category/${category._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Category deleted");
  });
});
