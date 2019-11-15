import { singleton } from 'tsyringe';
import { ConnectionService } from '@/domains/connection-service';


@singleton()
export class Exit {

  constructor(
    private readonly connectionService: ConnectionService,
  ) {
  }


  async handle(): Promise<void> {
    await this.connectionService.disconnect();
  }

}
