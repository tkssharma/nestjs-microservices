// Package.
import { Injectable } from "@nestjs/common";
import { InjectSendGrid, SendGridService } from "@ntegral/nestjs-sendgrid";



// Code.
@Injectable()
export class SendgridService {
  constructor(@InjectSendGrid() private readonly sendgrid: SendGridService) { }

  async sendBatchEmail(input: any): Promise<any> {
    if (!input.text && !input.html) {
      throw new Error("Message body cannot be empty");
    }

    const [res] = await this.sendgrid.sendMultiple({
      from: input.from,
      to: input.to,
      subject: input.subject,
      text: input.text,
      html: input.html,
    });

    return res;
  }

  async sendEmail(input: any): Promise<any> {
    if (!input.text && !input.html) {
      throw new Error("Message body cannot be empty");
    }

    const [res] = await this.sendgrid.send({
      from: input.from,
      to: input.to,
      subject: input.subject,
      text: input.text,
      html: input.html,
    });

    return res;
  }
}
