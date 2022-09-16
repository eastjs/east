import { Application, ApplicationConfig } from "../core/application";
import { HelloController } from "./hello.controller";

export class LedgerApplication extends Application {
  constructor(config?: ApplicationConfig) {
    super(config);

    this.controller(HelloController);
  }
}
