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

enum TransactionType {
  WITHDRAWAL,
  DEPOSIT,
}

interface Transaction {
  date: Date;
  amount: number;
  type: TransactionType;
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
      type: TransactionType.DEPOSIT,
    });
  }

  withdraw(amount: number) {
    this.transactions.push({
      date: new Date(),
      amount,
      type: TransactionType.WITHDRAWAL,
    });
  }

  printStatement() {
    const header = "Date       || Amount || Balance";
    const transaction = this.transactions.length
      ? Account.transactionToStatementLine(this.transactions[0])
      : "";
    this.printer.printStatement(header + transaction);
  }

  private static transactionToStatementLine(transaction: Transaction): string {
    const amount =
      transaction.type === TransactionType.DEPOSIT
        ? transaction.amount
        : transaction.amount * -1;

    return `\n${formatDate(transaction.date)} || ${amount} || ${amount}`;
  }
}
