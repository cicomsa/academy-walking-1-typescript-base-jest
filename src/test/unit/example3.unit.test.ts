import { Account, Printer } from "../../main/example3";
import MockDate from "mockdate";

describe("given a bank account", () => {
  describe("when there were no operation", () => {
    it("should print the header and nothing else", () => {
      const mockPrinter: Printer = {
        printStatement: jest.fn(),
      };

      const account = new Account(mockPrinter);
      account.printStatement();

      expect(mockPrinter.printStatement).toHaveBeenCalledWith(
        "Date       || Amount || Balance"
      );
    });
  });

  describe("when I may a single operation", () => {
    it("should print a statement with a single deposit", () => {
      const mockPrinter: Printer = {
        printStatement: jest.fn(),
      };

      const account = new Account(mockPrinter);
      MockDate.set("2012-01-25");
      account.deposit(1);
      account.printStatement();

      expect(mockPrinter.printStatement).toHaveBeenCalledWith(
        "Date       || Amount || Balance\n" + "25/01/2012 || 1 || 1"
      );
    });

    it("should print a statement with a single withdrawal", () => {
      const mockPrinter: Printer = {
        printStatement: jest.fn(),
      };

      const account = new Account(mockPrinter);
      MockDate.set("2012-01-25");
      account.withdraw(1);
      account.printStatement();

      expect(mockPrinter.printStatement).toHaveBeenCalledWith(
        "Date       || Amount || Balance\n" + "25/01/2012 || -1 || -1"
      );
    });
  });

  describe("when I have two deposits", () => {
    it("should print a correct statement", () => {
      const mockPrinter: Printer = {
        printStatement: jest.fn(),
      };

      const account = new Account(mockPrinter);
      MockDate.set("2012-01-25");
      account.deposit(1);
      MockDate.set("2012-01-26");
      account.deposit(1);
      account.printStatement();

      expect(mockPrinter.printStatement).toHaveBeenCalledWith(
        "Date       || Amount || Balance" +
          "\n26/01/2012 || 1 || 2" +
          "\n25/01/2012 || 1 || 1"
      );
    });
  });
});
