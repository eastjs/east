import { EndpointDefinition } from "../definitions/endpoint.definition";

export const get = (path: string) => {
  return (
    target: Object,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    const getDefs = Reflect.getMetadata("meta:get", target) ?? [];
    getDefs.push({
      classCtor: target.constructor,
      path: path,
      methodName: key,
    } as EndpointDefinition);

    Reflect.defineMetadata("meta:get", getDefs, target);
    return descriptor;
  };
};
