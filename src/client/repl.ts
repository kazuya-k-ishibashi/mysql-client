import readline from 'readline';
import { container, singleton } from 'tsyringe';
import { Command } from './command';
import { ConnectionController } from '@/controllers/connection-controller';
import { ConnectOutputDto } from '@/controllers/connect-output-dto';
import { DisconnectOutputDto } from '@/controllers/disconnect-output-dto';
import { ExecuteOutputDto } from '@/controllers/execute-output-dto';
import { ExitOutputDto } from '@/controllers/exit-output-dto';
import { AppError } from '@/domains/errors/app-error';


@singleton()
export class REPL {

  private readonly reader: readline.Interface;
  private readonly command = new Command();
  private readonly connectionController: ConnectionController;

  private doContinue: boolean = true;
  private databaseName?: string = undefined;


  constructor() {
    this.reader = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    this.connectionController = container.resolve(ConnectionController);
  }


  async run(): Promise<void> {
    while (this.doContinue) {
      const input: string = await this.ask();

      this.command.append(input);

      if (!this.command.isCompleted()) {
        continue;
      }

      await this.handle();
      this.command.clear();
    }
  }


  private async ask(): Promise<string> {
    const prompt = (this.databaseName === undefined)
      ? `$ no database> `
      : `$ database:${this.databaseName}> `
      ;
    return new Promise(resolve => this.reader.question(prompt, resolve));
  }


  private async handle(): Promise<void> {
    switch (this.command.get(0)) {
      case 'connect': {
        await this.connect();
        break;
      }
      case 'disconnect': {
        await this.disconnect();
        break;
      }
      case 'exit': {
        await this.exit();
        break;
      }
      default: {
        await this.execute();
        break;
      }
    }
  }


  private async connect(): Promise<void> {
    const databaseName: string = this.command.get(1);
    const response: ConnectOutputDto = await this.connectionController.connect(databaseName);

    if (response.error !== undefined) {
      if (response.error instanceof AppError) {
        console.log(response.error.message);
      } else {
        console.error(response.error);
      }
      return;
    }

    this.databaseName = databaseName;
  }


  private async disconnect(): Promise<void> {
    const response: DisconnectOutputDto = await this.connectionController.disconnect();

    if (response.error !== undefined) {
      if (response.error instanceof AppError) {
        console.log(response.error.message);
      } else {
        console.error(response.error);
      }
      return;
    }

    this.databaseName = undefined;
  }


  private async execute(): Promise<void> {
    const response: ExecuteOutputDto = await this.connectionController.execute(this.command.toString());

    if (response.error !== undefined) {
      if (response.error instanceof AppError) {
        console.log(response.error.message);
      } else {
        console.error(response.error);
      }
      return;
    }

    console.log(response.data?.result);
  }


  async exit(): Promise<void> {
    const response: ExitOutputDto = await this.connectionController.exit();

    if (response.error !== undefined) {
      if (response.error instanceof AppError) {
        console.log(response.error.message);
      } else {
        console.error(response.error);
      }
      return;
    }

    this.reader.close();

    this.doContinue = false;
  }

}
