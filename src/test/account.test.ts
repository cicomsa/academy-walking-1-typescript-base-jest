import MockDate from 'mockdate';
import {Printer} from "../main/Printer";
import {Account} from "../main/account";

describe('Account', () => {
    let mockPrinter: Printer;
    let account: Account;
    beforeEach(() => {
        mockPrinter = {
            printStatement: jest.fn()
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

        it('should print a single withdraw correctly', () => {
            MockDate.set('01/14/2012');
            account.withdraw(1000);
            account.printStatement();
            expect(mockPrinter.printStatement).toHaveBeenCalledWith('Date       || Amount || Balance\n' +
                '14/01/2012 || -1000  || -1000');
        })

    })

    describe('two actions', () => {
        it('should print two deposits correctly', () => {
            MockDate.set('01/10/2012');
            account.deposit(1);
            MockDate.set('01/11/2012');
            account.deposit(1);
            account.printStatement();
            expect(mockPrinter.printStatement).toHaveBeenCalledWith('Date       || Amount || Balance\n' +
                '11/01/2012 || 1      || 2\n' +
                '10/01/2012 || 1      || 1');
        })

        it('should maintian the transactions when print is called twice', () => {
            MockDate.set('01/10/2012');
            account.deposit(1);
            account.printStatement();
            MockDate.set('01/11/2012');
            account.deposit(1);
            account.printStatement();
            expect(mockPrinter.printStatement).lastCalledWith('Date       || Amount || Balance\n' +
                '11/01/2012 || 1      || 2\n' +
                '10/01/2012 || 1      || 1');
        })

        it('should print two deposits that occur it chronological reverse order correctly', () => {
            MockDate.set('01/11/2012');
            account.deposit(1);
            MockDate.set('01/10/2012');
            account.deposit(1);
            account.printStatement();
            expect(mockPrinter.printStatement).toHaveBeenCalledWith('Date       || Amount || Balance\n' +
                '11/01/2012 || 1      || 2\n' +
                '10/01/2012 || 1      || 1');
        })
    })
})
