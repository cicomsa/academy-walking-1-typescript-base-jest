export interface Printer {
  printStatement: (value: string) => void;
}

export class Account {
  private printer: Printer;

  constructor(printer: Printer) {
    this.printer = printer;
  }

  deposit(number: number) {
    throw new Error("not implemented");
  }

  withdraw(number: number) {
    throw new Error("not implemented");
  }

  printStatement() {
    throw new Error("not implemented");
  }
}
