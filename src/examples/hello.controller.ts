import { controller } from "../core/decorators/controller.decorator";
import { get } from "../core/decorators/get.decorator";

@controller()
export class HelloController {
  @get("/hello")
  async getHello(id: number): Promise<string> {
    return "Hello Controller" + id;
  }

  @get("/merhaba")
  async getMerhaba(id: number): Promise<string> {
    return "Merhaba Controller";
  }
}
