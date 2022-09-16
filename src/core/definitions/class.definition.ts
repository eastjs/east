import { BindingScope } from "../context";

export type Entity<T> = Function & {
  prototype: T;
};

export type Class<T> = new (...args: any[]) => T;

export interface ClassDefinition {
  bindingScope: BindingScope;
  classType: ClassType;
}

export enum ClassType {
  CONTROLLER,
  SERVICE,
}
