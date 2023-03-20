// Package.
import { Injectable } from "@nestjs/common";

// Code.
@Injectable()
export class LoggerService {
  constructor() {}

  public sayHello() {
    console.log(`Say Hi`);
  }
}
