// Package.
import { Test } from "@nestjs/testing";
import {
  SendGridModule,
  SendGridModuleOptions,
  SendGridService,
} from "@ntegral/nestjs-sendgrid";

// Internal.
import { SendgridService } from "../sendgrid.service";

// Code.
describe("SendgridService", () => {
  let service: SendgridService;

  beforeEach(async () => {
    const config: SendGridModuleOptions = {
      apiKey:
        "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",
    };

    const moduleRef = await Test.createTestingModule({
      imports: [
        SendGridModule.forRootAsync({
          useFactory: () => config,
        }),
      ],
      providers: [SendgridService],
    }).compile();

    service = moduleRef.get<SendgridService>(SendgridService);
  });

  describe("sendBatchEmail", () => {
    it("should throw an Error in the case that the email body is not specified", async () => {
      await expect(
        service.sendBatchEmail({
          from: "test@example.com",
          subject: "test",
          to: ["test@example.com"],
        })
      ).rejects.toThrowError("Message body cannot be empty");
    });

    it("should throw an Error in the case that the email clients cannot deliver the message", async () => {
      jest
        .spyOn(SendGridService.prototype, "sendMultiple")
        .mockImplementation(() => Promise.reject(new Error("__FAIL__")));

      await expect(
        service.sendBatchEmail({
          from: "test@example.com",
          subject: "test",
          to: ["test@example.com"],
          text: "test",
        })
      ).rejects.toThrowError("__FAIL__");
    });

    it("should return the client Http response if any", async () => {
      jest
        .spyOn(SendGridService.prototype, "sendMultiple")
        // @ts-ignore
        .mockImplementation(() => Promise.resolve([{ foo: "bar" }]));

      await expect(
        service.sendBatchEmail({
          from: "test@example.com",
          subject: "test",
          to: ["test@example.com"],
          text: "test",
        })
      ).resolves.toEqual({ foo: "bar" });
    });
  });

  describe("sendEmail", () => {
    it("should throw an Error in the case that the email body is not specified", async () => {
      await expect(
        service.sendEmail({
          from: "test@example.com",
          subject: "test",
          to: "test@example.com",
        })
      ).rejects.toThrowError("Message body cannot be empty");
    });

    it("should throw an Error in the case that the email clients cannot deliver the message", async () => {
      jest
        .spyOn(SendGridService.prototype, "send")
        .mockImplementation(() => Promise.reject(new Error("__FAIL__")));

      await expect(
        service.sendEmail({
          from: "test@example.com",
          subject: "test",
          to: "test@example.com",
          text: "test",
        })
      ).rejects.toThrowError("__FAIL__");
    });

    it("should return the client Http response if any", async () => {
      jest
        .spyOn(SendGridService.prototype, "send")
        // @ts-ignore
        .mockImplementation(() => Promise.resolve([{ foo: "bar" }]));

      await expect(
        service.sendEmail({
          from: "test@example.com",
          subject: "test",
          to: "test@example.com",
          text: "test",
        })
      ).resolves.toEqual({ foo: "bar" });
    });
  });
});
