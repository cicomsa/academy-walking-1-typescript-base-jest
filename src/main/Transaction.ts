export class Transaction {
    public amount: number;
    public date: string;
    public balanceAfterTransaction: number;

    constructor(date: string, amount: number, balanceAfterTransaction: number) {
        this.amount = amount;
        this.date = date;
        this.balanceAfterTransaction = balanceAfterTransaction;
    }

    formatTransaction(): string {
        const formattedDate = `${this.date} `;
        const formattedAmount = `${this.amount}`.padEnd(7);
        const split = '|| ';
        return `${formattedDate}${split}${formattedAmount}${split}${this.balanceAfterTransaction}`;
    }
}