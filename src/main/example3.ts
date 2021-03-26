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

function getTransactionAmount(transaction: Transaction) {
  return transaction.type == TransactionType.DEPOSIT ? transaction.amount : -transaction.amount;
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
    let balance = 0;
    const transactionStatementString = this.transactions.map((transaction) => {
      const transactionAmount = getTransactionAmount(transaction);
      balance += transactionAmount;
      return Account.transactionToStatementLine(transaction, balance);
    }).reverse().join('');
    this.printer.printStatement(header + transactionStatementString);
  }

  private static transactionToStatementLine(transaction: Transaction, balance: number): string {
    const amount = getTransactionAmount(transaction);

    return `\n${formatDate(transaction.date)} || ${amount} || ${balance}`;
  }
}
