import MockDate from 'mockdate';

interface AccountService {
    deposit: (amount: number) => void
    withdraw: (amount: number) => void
    printStatement: () => void
}

class Transaction {
    public amount: number;
    public date: string;
    public balanceAfterTransaction: number;

    constructor(date: string, amount: number, balanceAfterTransaction: number) {
        this.amount = amount;
        this.date = date;
        this.balanceAfterTransaction = balanceAfterTransaction;
    }
}

class Account implements AccountService {
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
        this.transactions.forEach(transaction => {
            transactionString += this.printer.formatTransaction(transaction);
        });

        this.printer.printStatement(`${this.header} + ${transactionString}`);
    }

    deposit(amount: number) {
        const depositDate = new Date().toLocaleDateString();
        const newBalance = this.currentBalance + amount;
        this.currentBalance = newBalance;
        this.transactions.push(new Transaction(depositDate, amount, newBalance));
    }

    withdraw(amount: number) {

    }
}

class Printer {
    printStatement(str: string) {
        console.log(str);
    }

    formatTransaction(transaction: Transaction): string {
        return `${transaction.date} || ${transaction.amount} || ${transaction.balanceAfterTransaction}`;
    }
}

describe('Account', () => {
    let mockPrinter: Printer;
    let account: Account;
    beforeEach(() => {
        mockPrinter = {
            printStatement: jest.fn(),
            formatTransaction: jest.fn()
        }
        account = new Account(mockPrinter);
    })

    it('should print a client bank statement', () => {
        MockDate.set('01/10/2012');
        account.deposit(1000);
        MockDate.set('01/13/2012');
        account.deposit(2000);
        MockDate.set('01/14/2012');
        account.withdraw(500);
        account.printStatement()
        expect(mockPrinter.printStatement).toHaveBeenCalledWith('Date       || Amount || Balance\n' +
            '14/01/2012 || -500   || 2500\n' +
            '13/01/2012 || 2000   || 3000\n' +
            '10/01/2012 || 1000   || 1000')
    })

    it('should print just a header if no transactions have been performed', () => {
        account.printStatement();
        expect(mockPrinter.printStatement).toHaveBeenCalledWith('Date       || Amount || Balance');
    })

    describe('single actions', () => {
        it('should print a single deposit correctly', () => {
            MockDate.set('01/14/2012');
            account.deposit(1000);
            account.printStatement();
            expect(mockPrinter.printStatement).toHaveBeenCalledWith('Date       || Amount || Balance\n' +
                '14/01/2012 || 1000   || 1000');
        })

    })
})
