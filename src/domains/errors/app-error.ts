

export class AppError implements Error {

  readonly name: string = 'AppError';

  constructor(
    public readonly message: string,
  ) {
  }

}
