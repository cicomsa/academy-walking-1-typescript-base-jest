import { Account, Printer } from "../../main/example3";

describe("given a bank account", () => {
  describe("when there were no operation", () => {
    it("should print the header and nothing else", () => {
      const mockPrinter: Printer = {
        printStatement: jest.fn(),
      };

      const account = new Account(mockPrinter);
      account.printStatement();

      expect(mockPrinter.printStatement).toBe(
        "Date       || Amount || Balance"
      );
    });
  });
});
