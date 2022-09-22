import {
  ApplicationConfig,
  EastApplication,
} from "../core/application/east.application";
import { SoloController } from "./controllers/solo.controller";
import { HelloController } from "./hello-module/controllers/hello.controller";
import { HelloModule } from "./hello-module/hello.module";

export class LedgerApplication extends EastApplication {
  constructor(config?: ApplicationConfig) {
    super(config);

    this.module(HelloModule);

    this.controller(SoloController);

    const getMeta = Reflect.getMetadata("meta:get", new HelloController());
    const controllerMeta = Reflect.getMetadata(
      "meta:controller",
      HelloController
    );

    console.log(getMeta);
    console.log(controllerMeta);
  }
}
