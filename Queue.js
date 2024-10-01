class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  enqueue(value) {
    const node = { value, next: null };

    if (!this.first) {
      this.first = node;
      this.last = node;
    } else {
      this.last.next = node;
      this.last = node;
    }

    this.size++;
  }

  dequeue() {
    if (!this.first) return null;

    const temp = this.first;
    this.first = this.first.next;

    if (!this.first) {
      this.last = null;
    }

    this.size--;
    return temp.value;
  }

  isEmpty() {
    return this.size === 0;
  }
}

Queue.fromValues = function (...values) {
  const queue = new Queue();

  for (let i = 0; i < values.length; i++) {
    queue.enqueue(values[i]);
  }

  return queue;
};

module.exports = Queue;
