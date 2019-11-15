import { singleton } from 'tsyringe';
import { ConnectionService } from '@/domains/connection-service';


@singleton()
export class Connect {

  constructor(
    private readonly connectionService: ConnectionService,
  ) {
  }


  async handle(databaseName: string): Promise<void> {
    await this.connectionService.connect(databaseName);
  }

}
