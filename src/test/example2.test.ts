class Account {
    private printer: Printer;

    constructor(printer: Printer) {
        this.printer = printer
    }

    printStatement() {
        this.printer.printStatement('hello')
    }
}

class Printer {
    printStatement(str: string) {
        console.log(str)
    }
}

describe('Account', () => {
    it('should print a client bank statement', () => {
        const mockPrinter = {
            printStatement: jest.fn()
        }
        const account = new Account(mockPrinter)
        console.log(account.printStatement())
        account.printStatement()
        expect(mockPrinter.printStatement()).toHaveBeenCalledWith('hello')
    })
})
