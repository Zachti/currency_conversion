import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";

describe("Currency Convertor", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it("/convert (POST) - Conversion with valid input", async () => {
    const inputData = {
      source: "USD",
      destinations: ["EUR", "GBP"],
      amount: 10,
      date: "2023-07-05",
    };

    const response = await request(app.getHttpServer())
      .post("/convert")
      .send(inputData)
      .expect(201);

    const { body } = response;

    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
    expect(body[0]).toHaveProperty("source", inputData.source);
    expect(body[0]).toHaveProperty("destination", inputData.destinations[0]);
    expect(body[0]).toHaveProperty("amount", inputData.amount);
  });

  it("/convert (POST) - Conversion with invalid date", async () => {
    const inputData = {
      source: "USD",
      destinations: ["EUR", "GBP"],
      amount: 10,
      date: "2023-10-05",
    };

    const response = await request(app.getHttpServer())
      .post("/convert")
      .send(inputData)
      .expect(400);

    const { body } = response;

    expect(body).toHaveProperty("statusCode", 400);
    expect(body).toHaveProperty("error", "Bad Request");

    expect(body).toHaveProperty("message", [
      "date must be between 1/1/2010 and present . input: 2023-10-05",
    ]);
  });

  it("/convert (POST) - Conversion without destinations", async () => {
    const inputData = {
      source: "USD",
      amount: 10,
      date: "2023-07-05",
    };

    const response = await request(app.getHttpServer())
      .post("/convert")
      .send(inputData)
      .expect(400);

    const { body } = response;

    expect(body).toHaveProperty("statusCode", 400);
    expect(body).toHaveProperty("error", "Bad Request");
  });

  it("/convert (POST) - Conversion with invalid destinations currency", async () => {
    const inputData = {
      source: "USD",
      destinations: ["ABC", "DEF"],
      amount: 10,
      date: "2023-07-05",
    };

    const response = await request(app.getHttpServer())
      .post("/convert")
      .send(inputData)
      .expect(400);

    const { body } = response;

    expect(body).toHaveProperty("statusCode", 400);
    expect(body).toHaveProperty("error", "Bad Request");
    expect(body).toHaveProperty("message", [
      "Invalid destination currency. Allowed values are: USD, ILS, EUR, GBP",
    ]);
  });

  it("/convert (POST) - Conversion with invalid source", async () => {
    const inputData = {
      source: 9,
      destinations: ["EUR", "GBP"],
      amount: 10,
      date: "2023-07-05",
    };

    const response = await request(app.getHttpServer())
      .post("/convert")
      .send(inputData)
      .expect(400);

    const { body } = response;

    expect(body).toHaveProperty("statusCode", 400);
    expect(body).toHaveProperty("error", "Bad Request");
    expect(body).toHaveProperty("message", ["source must be a string"]);
  });

  it("/convert (POST) - Conversion without amount", async () => {
    const inputData = {
      source: "USD",
      destinations: ["EUR", "GBP"],
      date: "2023-07-05",
    };

    const response = await request(app.getHttpServer())
      .post("/convert")
      .send(inputData)
      .expect(400);

    const { body } = response;

    expect(body).toHaveProperty("statusCode", 400);
    expect(body).toHaveProperty("error", "Bad Request");
    expect(body).toHaveProperty("message", [
      "amount should not be empty",
      "amount must be a number conforming to the specified constraints",
    ]);
  });
});
