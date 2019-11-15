

export class Command {

  private static readonly EOL = ';';

  private buf: string = "";
  private arr: string[] = [];


  constructor() {
  }

  append(input: string): void {
    this.appendToBuf(input);
    this.appendToArr(input);
  }

  private appendToBuf(input: string): void {
    if (this.buf.length === 0) {
      this.buf = input;
      return;
    }

    this.buf += (' ' + input);
  }

  private appendToArr(input: string): void {
    input.replace(/\s*;$/, '')
      .split(' ')
      .forEach(part => this.arr.push(part));
  }


  isCompleted(): boolean {
    return this.buf.endsWith(Command.EOL);
  }


  toString(): string {
    return this.buf;
  }


  get(index: number): string {
    return this.arr[index];
  }


  clear(): void {
    this.buf = '';
    this.arr = [];
  }

}
