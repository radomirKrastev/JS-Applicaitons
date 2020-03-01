const { assert } = require("chai");
const Console = require("./Console");

describe("Tests …", function() {
  describe("Test writeLine function …", function() {
    it("One string as parameter(message) should return the message", function() {
      assert.equal(Console.writeLine("message"), "message");
    });
    it("One object as parameter(message) should return the message stringified", function() {
      let message = { content: "message" };
      assert.equal(Console.writeLine(message), '{"content":"message"}');
    });
    it("Multiple args passed - first is not a string - should throw TypeError", function() {
      let message = { content: "message" };
      assert.throw(() => Console.writeLine(message, "test"), "No string format given!");
    });
    it("Multiple args passed - parameters count does not equal values count - should throw RangeError", function() {
      assert.throws(
        () => Console.writeLine("This {0} should throw {1} {2}", "message", "RangeError"),
        "Incorrect amount of parameters given!"
      );
    });
    it("Multiple args passed - values {i} out of parameters range- should throw RangeError", function() {
      assert.throw(
        () =>
          Console.writeLine("This {0} should throw {1} {3}", "message", "RangeError", "exception"),
        "Incorrect placeholders given!"
      );
    });
    it("Multiple args passed - parameters successfully replace {i} values", function() {
      assert.equal(
        Console.writeLine("This {0} should throw {2} {1}", "message", "RangeError", "exception"),
        "This message should throw exception RangeError"
      );
    });
  });
});
