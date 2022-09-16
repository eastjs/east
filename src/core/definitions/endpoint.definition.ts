import { Class } from "./class.definition";

export interface EndpointDefinition {
  path: string;
  classCtor: Class<any>;
  methodName: string;
}
