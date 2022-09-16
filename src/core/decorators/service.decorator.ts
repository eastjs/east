import "reflect-metadata";
import { BindingScope } from "../context";
import { ClassDefinition, ClassType } from "../definitions/class.definition";

export const service = (
  bindingScope: BindingScope = BindingScope.TRANSIENT
) => {
  return (target: Function) => {
    const classDef = {
      bindingScope: bindingScope,
      classType: ClassType.SERVICE,
    } as ClassDefinition;

    Reflect.defineMetadata("meta:service", classDef, target);
  };
};
