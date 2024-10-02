const Queue = require("../../Queue/Queue");
const Stack = require("../../Stack/Stack");

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(data) {
    const node = new Node(data);

    if (!this.root) {
      this.root = node;
      return;
    }

    let current = this.root;

    while (current) {
      if (data === current.value) return null;

      if (data < current.value) {
        if (current.left === null) {
          current.left = node;
          return;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = node;
          return;
        }
        current = current.right;
      }
    }
  }

  find(value) {
    if (!this.root) return `Value not found - empty tree`;

    let current = this.root;

    while (current) {
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        return current;
      }
    }

    return `Value ${value} not found`;
  }

  remove(value) {
    this.root = this.removeNode(this.root, value);
  }

  removeNode(current, value) {
    if (current === null) return current;

    if (value === current.value) {
      if (current.left === null && current.right === null) {
        return null;
      } else if (current.left === null) {
        return current.right;
      } else if (current.right === null) {
        return current.left;
      } else {
        let tempNode = this.kthSmallestNode(current.right);
        current.value = tempNode.value;

        current.right = this.removeNode(current.right, tempNode.value);
        return current;
      }
    } else if (value < current.value) {
      current.left = this.removeNode(current.left, value);
      return current;
    } else {
      current.right = this.removeNode(current.right, value);
      return current;
    }
  }

  kthSmallestNode(node) {
    while (node.left !== null) node = node.left;

    return node;
  }

  breadthFirstSearch() {
    const result = [];
    const queue = new Queue();

    if (!this.root) return result;

    queue.enqueue(this.root);

    while (!queue.isEmpty()) {
      const currentNode = queue.dequeue();

      result[result.length] = currentNode.value;

      if (currentNode.left !== null) {
        queue.enqueue(currentNode.left);
      }

      if (currentNode.right !== null) {
        queue.enqueue(currentNode.right);
      }
    }

    return result;
  }

  BFSGroupedByLevel() {
    if (this.root === null) return [];

    const queue = new Queue();
    queue.enqueue(this.root);

    const result = [];
    let resultLength = 0;

    while (!queue.isEmpty()) {
      const level = [];
      let levelLength = 0;

      // cannot let on the for because its updated on each interaction
      const len = queue.size;

      for (let i = 0; i < len; i++) {
        const item = queue.dequeue();
        level[levelLength++] = item.value;

        if (item.left) queue.enqueue(item.left);
        if (item.right) queue.enqueue(item.right);
      }

      result[resultLength++] = level;
    }

    return result;
  }

  depthFirstSearchPreOrderRecursevely(element, result = []) {
    if (!element) return result;

    result[result.length] = element.value;

    if (element.left)
      this.depthFirstSearchPreOrderRecursevely(element.left, result);
    if (element.right)
      this.depthFirstSearchPreOrderRecursevely(element.right, result);

    return result;
  }

  depthFirstSearchPreOrderStack(root) {
    const result = [];
    if (root === null) return result;

    const stack = new Stack();
    stack.push(root);

    while (!stack.isEmpty()) {
      const item = stack.pop();

      result[result.length] = item.value;

      if (item.right) stack.push(item.right);
      if (item.left) stack.push(item.left);
    }

    return result;
  }

  DFSInOrderRecursively(root, result = []) {
    if (root === null) return [];

    if (root.left) this.DFSInOrderRecursively(root.left, result);

    result[result.length] = root.value;

    if (root.right) this.DFSInOrderRecursively(root.right, result);

    return result;
  }

  DFSInOrderIterative(root) {
    if (root === null) return [];

    const stack = new Stack();
    const result = [];
    let current = root;

    while (stack.size || current) {
      while (current) {
        stack.push(current);

        current = current.left;
      }

      const last = stack.pop();

      result[result.length] = last.value;

      current = last.right;
    }

    return result;
  }

  DFSPostOrderRecursively(root, result = []) {
    if (root === null) return [];

    if (root.left) this.DFSPostOrderRecursively(root.left, result);
    if (root.right) this.DFSPostOrderRecursively(root.right, result);

    result[result.length] = root.value;

    return result;
  }

  // can use the preOrder algo adjusting the stack order (first left after right) and reverse the result
  DFSPostOrderInteractive(root, result = []) {
    if (root === null) return [];

    const stack = new Stack();

    stack.push(root);

    while (stack.size) {
      const node = stack.pop();

      // if wants to remove this array method needs to create an custom list with addAtStart method
      result.unshift(node.value);

      if (node.left) stack.push(node.left);
      if (node.right) stack.push(node.right);
    }

    return result;
  }
}

BinarySearchTree.fromValues = function (...values) {
  const binaryTree = new BinarySearchTree();

  for (let index = 0; index < values.length; index++) {
    binaryTree.insert(values[index]);
  }

  return binaryTree;
};

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
module.exports = BinarySearchTree;
