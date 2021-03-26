import MockDate from "mockdate";
import { Account, Printer } from "../../main/example3";

describe("given a bank account", () => {
  describe("when a customer makes changes to it", () => {
    it("should print a complete statement", () => {
      const mockPrinter: Printer = {
        printStatement: jest.fn(),
      };

      const account = new Account(mockPrinter);

      MockDate.set("01/10/2012");
      account.deposit(1000);
      MockDate.set("01/13/2012");
      account.deposit(2000);
      MockDate.set("01/14/2012");
      account.withdraw(500);
      account.printStatement();

      expect(mockPrinter.printStatement).toBe(
        "Date       || Amount || Balance\n" +
          "14/01/2012 || -500   || 2500\n" +
          "13/01/2012 || 2000   || 3000\n" +
          "10/01/2012 || 1000   || 1000"
      );
    });
  });
});
