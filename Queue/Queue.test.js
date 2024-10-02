const Queue = require("./Queue");

describe("Queue", () => {
  describe("#enqueue", () => {
    it("it adds first element when queue is empty and increase queue size by one", () => {
      const queue = new Queue();

      queue.enqueue(7);

      expect(queue.first.value).toBe(7);
      expect(queue.first.next).toBeNull();
      expect(queue.last.value).toBe(7);
      expect(queue.last.next).toBeNull();
      expect(queue.size).toBe(1);
    });

    it("it adds element when queue is not empty, reference next and increase queue size by one", () => {
      const queue = Queue.fromValues(7);

      queue.enqueue(4);
      queue.enqueue(6);
      queue.enqueue(5);

      expect(queue.first.value).toBe(7);
      expect(queue.first.next.value).toBe(4);
      expect(queue.last.value).toBe(5);
      expect(queue.last.next).toBeNull();
      expect(queue.size).toBe(4);
    });
  });

  describe("#dequeue", () => {
    it("it returns null when the queue is empty", () => {
      const queue = Queue.fromValues();

      const result = queue.dequeue();

      expect(result).toBeNull();
    });

    it("it removes the first element from queue when has one element", () => {
      const queue = Queue.fromValues(7);

      queue.dequeue();

      expect(queue.first).toBeNull();
      expect(queue.last).toBeNull();
      expect(queue.size).toBe(0);
    });

    it("it removes the first element from queue when has more than one element", () => {
      const queue = Queue.fromValues(7, 42, 24, 11);

      queue.dequeue();

      expect(queue.first.value).toBe(42);
      expect(queue.first.next.value).toBe(24);

      expect(queue.last.value).toBe(11);
      expect(queue.last.next).toBeNull();

      expect(queue.size).toBe(3);
    });
  });

  describe("#isEmpty", () => {
    it("it returns true when size is 0", () => {
      const queue = new Queue();

      const result = queue.isEmpty();

      expect(result).toBeTruthy();
    });
    it("it returns false when size is greater 0", () => {
      const queue = Queue.fromValues(5, 7, 8);

      const result = queue.isEmpty();

      expect(result).toBeFalsy();
    });
  });
});
