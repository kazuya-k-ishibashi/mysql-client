import { singleton } from 'tsyringe';
import { ConnectOutputDto } from './connect-output-dto';
import { DisconnectOutputDto } from './disconnect-output-dto';
import { ExecuteOutputDto } from './execute-output-dto';
import { ExitOutputDto } from './exit-output-dto';
import { Connect } from '@/usecases/connect';
import { Disconnect } from '@/usecases/disconnect';
import { Execute } from '@/usecases/execute';
import { Exit } from '@/usecases/exit';


@singleton()
export class ConnectionController {

  constructor(
    private readonly connectUseCase: Connect,
    private readonly disconnectUseCase: Disconnect,
    private readonly executeUseCase: Execute,
    private readonly exitUseCase: Exit,
  ) {
  }


  async connect(databaseName: string): Promise<ConnectOutputDto> {
    try {
      await this.connectUseCase.handle(databaseName);
      return { data: { databaseName } };
    } catch (error) {
      return { error };
    }
  }


  async disconnect(): Promise<DisconnectOutputDto> {
    try {
      await this.disconnectUseCase.handle();
      return {};
    } catch (error) {
      return { error };
    }
  }


  async execute(query: string): Promise<ExecuteOutputDto> {
    try {
      const result = await this.executeUseCase.handle(query);
      return { data: { result } };
    } catch (error) {
      return { error };
    }
  }


  async exit(): Promise<ExitOutputDto> {
    try {
      await this.exitUseCase.handle();
      return {};
    } catch (error) {
      return { error };
    }
  }

}
