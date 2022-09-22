import { Class } from "../definitions/class.definition";
import { Express } from "express";
import { EndpointDefinition } from "../definitions/endpoint.definition";

export class EastModule {
  private controllers = new Map<string, Class<any>>();
  private services = new Map<string, Class<any>>();
  private modules = new Map<string, Class<EastModule>>();

  protected controller<T>(ctor: Class<T>): void {
    this.controllers.set(ctor.name, ctor);
  }

  protected service<T>(ctor: Class<T>): void {
    this.services.set(ctor.name, ctor);
  }

  protected module<T extends EastModule>(ctor: Class<T>): void {
    this.modules.set(ctor.name, ctor);
  }

  public registerControllers(app: Express): void {
    this.controllers.forEach((v, k) => {
      const endpointDefs = Reflect.getMetadata(
        "meta:get",
        new v()
      ) as Array<EndpointDefinition>;

      console.log("endpointDef", endpointDefs);

      for (const endpointDef of endpointDefs) {
        app.get(endpointDef.path, async (req, res): Promise<void> => {
          console.log("handler", req.originalUrl);
          console.log("params", req.params);
          console.log("query", req.query);
          console.log("body", req.body);
          // console.log("headers", req.headers);
          const controller = new endpointDef.classCtor();
          const result = await controller[endpointDef.methodName](
            Number(req.query.id)
          );
          res.send(result);
        });
      }
    });
  }
}
