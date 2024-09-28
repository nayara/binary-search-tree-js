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
