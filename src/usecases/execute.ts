import { singleton } from 'tsyringe';
import { ConnectionService } from '@/domains/connection-service';


@singleton()
export class Execute {

  constructor(
    private readonly connectionService: ConnectionService,
  ) {
  }


  async handle(query: string): Promise<any> {
    return await this.connectionService.execute(query);
  }

}
