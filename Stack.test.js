const Stack = require("./Stack");

describe("Stack", () => {
  describe("#push", () => {
    describe("when the stack is empty", () => {
      it("it adds an element on the top of stack and updates size", () => {
        const stack = new Stack();

        stack.push(8);

        expect(stack.top.value).toBe(8);
        expect(stack.top.next).toBeNull();
        expect(stack.size).toBe(1);
      });
    });

    describe("when stack has at least one element", () => {
      it("it adds the element to the top of stack, updates size and next", () => {
        const stack = Stack.fromValues(9, 5);

        stack.push(7);

        expect(stack.top.value).toBe(7);
        expect(stack.top.next.value).toBe(5);
        expect(stack.size).toBe(3);
      });
    });
  });

  describe("#pop", () => {
    describe("when the stack is empty", () => {
      it("it returns null", () => {
        const stack = new Stack();

        const result = stack.pop();

        expect(result).toBeNull();
      });
    });

    describe("when stack has only one element", () => {
      it("it removes the element on the top of stack and updates size", () => {
        const stack = new Stack();

        stack.pop(8);

        expect(stack.top).toBeNull();
        expect(stack.size).toBe(0);
      });
    });

    describe("when stack has more than one element", () => {
      it("it removes the top element, updates size and next", () => {
        const stack = Stack.fromValues(9, 5, 7);

        stack.pop(7);

        expect(stack.top.value).toBe(5);
        expect(stack.top.next.value).toBe(9);
        expect(stack.size).toBe(2);
      });
    });
  });

  describe("#isEmpty", () => {
    describe("when stack is empty", () => {
      it("it returns true", () => {
        const stack = new Stack();

        expect(stack.isEmpty()).toBeTruthy();
      });
    });

    describe("when stack has at least one element", () => {
      it("it returns false", () => {
        const stack = Stack.fromValues(9, 5, 7);

        expect(stack.isEmpty()).toBeFalsy();
      });
    });
  });
});
