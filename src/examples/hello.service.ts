import { BindingScope } from "../core/context";
import { service } from "../core/decorators/service.decorator";

@service(BindingScope.TRANSIENT)
export class HelloService {}
