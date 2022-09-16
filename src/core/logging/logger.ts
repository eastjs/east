const LogTypeColors = {
  FATAL: `\x1b[1;31m`,
  ERROR: `\x1b[31m`,
  WARNING: `\x1b[33m`,
  INFO: `\x1b[32m`,
  DEBUG: `\x1b[34m`,
};

enum LogType {
  FATAL = "FATAL",
  ERROR = "ERROR",
  WARNING = "WARNING",
  INFO = "INFO",
  DEBUG = "DEBUG",
}

export class Logger {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public fatal(msg: string): void {
    this.log(msg, LogType.FATAL);
  }

  public error(msg: string): void {
    this.log(msg, LogType.ERROR);
  }

  public warning(msg: string): void {
    this.log(msg, LogType.WARNING);
  }

  public info(msg: string): void {
    this.log(msg, LogType.INFO);
  }

  public debug(msg: string): void {
    this.log(msg, LogType.DEBUG);
  }

  private log(msg: string, logType: LogType): void {
    console.log(
      `${this.datetime()} ${this.logType(logType)} ${this.pid()} [${
        this.name
      }] : ${this.message(msg, logType)}`
    );
  }

  private message(msg: string, logType: LogType): string {
    return `${LogTypeColors[logType]}${msg}\x1b[0m`;
  }

  private logType(logType: LogType): string {
    return `${LogTypeColors[logType]}${logType}\x1b[0m`;
  }

  private datetime(): string {
    const dateStr = new Date().toISOString();
    return `${dateStr.substring(0, 10)} ${dateStr.substring(11, 23)}`;
  }

  private pid(): string {
    return `\x1b[35m${process.pid}\x1b[0m`;
  }
}
