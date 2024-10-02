class Stack {
  constructor() {
    this.top = null;
    this.size = 0;
  }

  push(value) {
    const node = { value, next: null };
    node.next = this.top;
    this.top = node;

    this.size++;
  }

  pop() {
    if (!this.top) return null;

    this.top = this.top.next;

    this.size--;
  }

  isEmpty() {
    return this.size === 0;
  }
}

Stack.fromValues = function (...values) {
  const stack = new Stack();

  for (let i = 0; i < values.length; i++) {
    stack.push(values[i]);
  }

  return stack;
};

module.exports = Stack;
