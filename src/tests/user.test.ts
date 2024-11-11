import request from "supertest";
import { describe, it, expect } from "vitest";
import fs from "fs";
import { app } from "..";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import path from "path";


const tokenAdmin = jwt.sign(
  { email: "naty@mail.com", role: "admin" },
  config.secret.key,
  { expiresIn: "1h" }
);

const tokenUser = jwt.sign(
  { email: "garfield@gmail.com", role: "user" },
  config.secret.key,
  { expiresIn: "1h" }
);

describe("File upload validation", () => {
  it("should return error if file is not CSV", async () => {
    const filePath = path.join(__dirname, "user.txt"); // Ensure this file exists
    const res = await request(app)
      .post("/upload")
      .attach("file", await fs.promises.readFile(filePath), "user.txt") // Ensure the file path is correct
      .set("Authorization", `Bearer ${tokenAdmin}`);

    expect(res.status).toBe(400);
    expect(res.body.error.message).toBe("Only CSV files are allowed");
  });

  it("should return error if there is no token", async () => {
    const filePath = path.join(__dirname, "dato2.csv");
    const res = await request(app)
      .post("/upload")
      .attach("file", await fs.promises.readFile(filePath), "user.csv")
      .set("Authorization", "");

    expect(res.status).toBe(401);
    expect(res.body.error.message).toBe("Unuathorized: No token provided");
  });
});

describe("Authorization for upload file", () => {
  const filePath = path.join(__dirname, "dato2.csv");

  it("should return error if user is not ADMIN", async () => {
    const res = await request(app)
      .post("/upload")
      .attach("file", await fs.promises.readFile(filePath), "dato2.csv")
      .set("Authorization", `Bearer ${tokenUser}`);

    expect(res.status).toBe(403);
    expect(res.body.error.message).toBe("Access denegate");
  });
});

describe("Auth login", () => {
  it("should successfully login with correct credentials ", async () => {
    const loginData = {
      email: "naty@gmail.com",
      password: "codeable",
    };
    const res = await request(app).post("/login").send(loginData);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.ok).toBeTruthy();
  });

  it("should fail to login with incorrect password", async () => {
    const loginData = {
      email: "naty@gmail.com",
      password: "codeabl",
    };

    const res = await request(app).post("/login").send(loginData);
    expect(res.status).toBe(401);
    expect(res.body.ok).toBeFalsy();
    expect(res.body.error.message).toBe("Invalid credentials");
  });
});
