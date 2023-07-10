import { CurrencyLayerClient } from "../currencyLayerClient";
import { Test, TestingModule } from "@nestjs/testing";
import { CurrencyLayerModule } from "../currencyLayerModule";
import { AppModule } from "../../app/app.module";

describe("CurrencyLayerClient", () => {
  let currencyLayerClient: CurrencyLayerClient;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CurrencyLayerModule, AppModule],
    }).compile();

    currencyLayerClient =
      moduleFixture.get<CurrencyLayerClient>(CurrencyLayerClient);
  });

  it("should fetch rates successfully and return exchange rates", async () => {
    const data = {
      source: "USD",
      destinations: ["EUR", "GBP"],
      date: "2023-07-05",
    };

    const result = await currencyLayerClient.getRates(data);

    expect(result.success).toBe(true);
  });

  it("should throw an error when fetching rates fails", async () => {
    const data = {
      source: "9",
      destinations: ["EUR", "GBP"],
      date: "2023-07-05",
    };

    await expect(currencyLayerClient.getRates(data)).rejects.toThrow(
      /You have supplied an invalid Source Currency. \[Example: source=EUR]/
    );
  });
});
