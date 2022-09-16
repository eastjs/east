import { Context } from "../context";
import { Class } from "../definitions/class.definition";
import { EndpointDefinition } from "../definitions/endpoint.definition";

export const get = (path: string) => {
  return (
    target: Object,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    console.log("key", key);

    const getDefs = Reflect.getMetadata("meta:get", Context) ?? [];
    getDefs.push({
      classCtor: target.constructor,
      path: path,
      methodName: key,
    } as EndpointDefinition);

    const endpointDef = {
      classCtor: target.constructor,
      methodName: key,
      path: path,
    } as EndpointDefinition;

    Reflect.defineMetadata("meta:get", endpointDef, target);
    Reflect.defineMetadata("meta:get", getDefs, Context);
    return descriptor;
  };
};
