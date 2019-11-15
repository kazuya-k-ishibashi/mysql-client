import { singleton } from 'tsyringe';
import { Connection, createConnection } from 'typeorm';
import { AppError } from '@/domains/errors/app-error';


@singleton()
export class ConnectionService {

  private connection?: Connection = undefined;


  constructor() {
  }


  async connect(databaseName: string): Promise<void> {
    this.connection = await createConnection(databaseName);
  }


  async disconnect(): Promise<void> {
    if (this.connection === undefined) {
      return;
    }
    await this.connection.close();
    this.connection = undefined;
  }


  async execute(query: string): Promise<any> {
    if (this.connection === undefined) {
      throw new AppError(`no connection`);
    }
    return await this.connection.query(query);
  }

}
