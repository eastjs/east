import "reflect-metadata";
import { BindingScope } from "../context";
import { ClassDefinition, ClassType } from "../definitions/class.definition";

export const controller = () => {
  return (target: Function) => {
    const classDef = {
      bindingScope: BindingScope.REQUEST,
      classType: ClassType.CONTROLLER,
    } as ClassDefinition;

    Reflect.defineMetadata("meta:controller", classDef, target);
  };
};
