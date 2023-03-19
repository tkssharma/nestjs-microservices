// Package.
// import { ConfigModule } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

// Internal.
import { SendgridModule } from "../sendgrid.module";
import { SendgridService } from "../sendgrid.service";

// Code.
describe("SendgridModule", () => {
  @Injectable()
  class TestService {
    constructor(public readonly client: SendgridService) {}
  }

  let moduleRef: TestingModule;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [SendgridModule],
      providers: [TestService],
    }).compile();
  });

  it("should be able to be imported", async () => {
    const module = moduleRef.get<SendgridService>(SendgridService);
    expect(module).toBeDefined();
    expect(module).toBeInstanceOf(SendgridService);

    const thirdParty = moduleRef.get<TestService>(TestService);
    expect(thirdParty).toBeDefined();
    expect(thirdParty).toBeInstanceOf(TestService);
  });

  it.skip("should inject the sendgrid client service", async () => {
    const service = moduleRef.get<TestService>(TestService);
    expect(service).toHaveProperty("client");
    expect(service.client).toBeInstanceOf(SendgridService);
  });
});
