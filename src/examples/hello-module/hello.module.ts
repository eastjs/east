import { EastModule } from "../../core/module/east.module";
import { HelloController } from "./controllers/hello.controller";

export class HelloModule extends EastModule {
  constructor() {
    super();
    this.controller(HelloController);
  }
}
