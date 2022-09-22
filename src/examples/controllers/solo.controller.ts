import { get } from "../../core/decorators/get.decorator";
import { RestController } from "../../core/decorators/rest-controller.decorator";

@RestController()
export class SoloController {
  @get("/solo")
  async getHello(): Promise<string> {
    return "Solo Controller";
  }
}
