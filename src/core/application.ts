import "reflect-metadata";
import express, { Express } from "express";
import http from "http";
import { Context } from "./context";
import { Entity } from "./definitions/class.definition";
import { banner, Logger } from "./logging";
import { EndpointDefinition } from "./definitions/endpoint.definition";

export interface ApplicationConfig {
  host?: string;
  port?: number;
  ssl?: boolean;
  url?: string;
}

export class Application {
  protected app: Express;
  protected httpServer: http.Server;
  public configs: ApplicationConfig;

  private context: Context;

  public logger: Logger;

  constructor(config?: ApplicationConfig) {
    this.logger = new Logger("Application");
    console.log(banner);
    this.context = new Context();
    this.initConfig(config);
    this.initServer();
  }

  protected controller<T>(modelCtor: Entity<T>): void {}

  private initConfig(config?: ApplicationConfig): void {
    this.logger.debug(`Initialize configurations`);
    this.configs = {
      host: config?.host ?? "localhost",
      port: config?.port ?? 3000,
      ssl: config?.ssl ?? false,
    } as ApplicationConfig;

    this.configs.url = `http${this.configs.ssl ? "s" : ""}://${
      this.configs.host
    }:${this.configs.port}`;
  }

  private initServer(): void {
    this.app = express();
    this.initRouter();
    this.logger.debug(`Http Server initializing..`);
    this.httpServer = http.createServer(this.app);
  }

  private initRouter(): void {
    const endpointDefs = Reflect.getMetadata(
      "meta:get",
      Context
    ) as Array<EndpointDefinition>;
    console.log("endpointDef", endpointDefs);
    for (const endpointDef of endpointDefs) {
      this.app.get(endpointDef.path, async (req, res): Promise<void> => {
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
  }

  public async start(): Promise<void> {
    this.logger.debug(`Server starting..`);
    this.httpServer.listen(this.configs.port);
  }

  public async stop(): Promise<void> {
    this.httpServer.close();
  }
}
