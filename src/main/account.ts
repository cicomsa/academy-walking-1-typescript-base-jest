import {Printer} from "./Printer";
import {Transaction} from "./Transaction";

interface AccountService {
    deposit: (amount: number) => void
    withdraw: (amount: number) => void
    printStatement: () => void
}

export class Account implements AccountService {
    private printer: Printer;
    private transactions: Transaction[];
    private header = 'Date       || Amount || Balance';
    private currentBalance: number;

    constructor(printer: Printer) {
        this.printer = printer;
        this.transactions = [];
        this.currentBalance = 0;
    }

    printStatement() {
        let transactionString = '';
        const reverseTransactions = [...this.transactions].reverse();
        for (let transaction of reverseTransactions) {
            const formatedTransaction = transaction.formatTransaction()
            transactionString += `\n${formatedTransaction}`;
        }

        this.printer.printStatement(`${this.header}${transactionString}`);
    }

    deposit(amount: number) {
        const depositDate = new Date().toLocaleDateString();
        const newBalance = this.currentBalance + amount;
        this.currentBalance = newBalance;
        this.transactions.push(new Transaction(depositDate, amount, newBalance));
    }

    withdraw(amount: number) {
        const withdrawDate = new Date().toLocaleDateString();
        const newBalance = this.currentBalance - amount;
        this.currentBalance = newBalance;
        this.transactions.push(new Transaction(withdrawDate, -amount, newBalance));
    }
}