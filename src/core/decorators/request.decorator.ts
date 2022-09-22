// export const request = () => {
//   return (target: Object, propertyKey: string, parameterIndex: number) => {
//     const getDefs = Reflect.getMetadata("meta:get", Context) ?? [];
//     getDefs.push({
//       classCtor: target.constructor,
//       path: path,
//       methodName: key,
//     } as EndpointDefinition);

//     const endpointDef = {
//       classCtor: target.constructor,
//       methodName: key,
//       path: path,
//     } as EndpointDefinition;

//     Reflect.defineMetadata("meta:get", endpointDef, target);
//     Reflect.defineMetadata("meta:get", getDefs, Context);
//     return descriptor;
//   };
// };
