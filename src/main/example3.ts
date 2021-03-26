function formatDate(date: Date) {
  var d = date,
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month, year].join("/");
}

export interface Printer {
  printStatement: (value: string) => void;
}

interface Transaction {
  date: Date;
  amount: number;
}

export class Account {
  private printer: Printer;
  private transactions: Transaction[] = [];

  constructor(printer: Printer) {
    this.printer = printer;
  }

  deposit(amount: number) {
    this.transactions.push({
      date: new Date(),
      amount,
    });
  }

  withdraw(number: number) {
    throw new Error("not implemented");
  }

  printStatement() {
    const header = "Date       || Amount || Balance";
    const transaction = this.transactions
      ? `\n${formatDate(this.transactions[0].date)} || ${
          this.transactions[0].amount
        } || ${this.transactions[0].amount}`
      : "";
    this.printer.printStatement(header + transaction);
  }
}
