import {Transaction} from "../main/Transaction";

describe('Transaction', () => {
    it('should format a transaction with a 4 digit amount', () => {
        const transaction = new Transaction('10/01/2012', 1000, 1000);
        expect(transaction.formatTransaction()).toBe('10/01/2012 || 1000   || 1000');
    })

    it('should format a transaction with a 3 digit amount', () => {
        const transaction = new Transaction('10/01/2012', 100, 100);
        expect(transaction.formatTransaction()).toBe('10/01/2012 || 100    || 100');
    })

    it('should format a transaction with a -ve amount', () => {
        const transaction = new Transaction('10/01/2012', -100, -100);
        expect(transaction.formatTransaction()).toBe('10/01/2012 || -100   || -100');
    })
})
