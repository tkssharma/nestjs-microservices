// Package.
import { Injectable } from "@nestjs/common";

// Code.
@Injectable()
export class TracingService {
  constructor() {}

  public sayHello() {
    console.log(`Say Hi`);
  }
}
