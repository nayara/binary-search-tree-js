class BinaryTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const node = new Node(value);

    if (!this.root) this.root = node;

    let current = this.root;

    while (current) {
      if (value === current.value) return null;

      if (node.value < current.value) {
        if (current.left === null) {
          current.left = node;
          current.left.parent = current;
          return;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = node;
          current.right.parent = current;
          return;
        }
        current = current.right;
      }
    }
  }

  findPreOrderSuccessor(node) {
    if (!node) return null;

    let parent = node.parent;
    if (!parent) return null;

    if (node.left) return node.left;
    if (node.right) return node.right;

    while (parent && parent.right === node) {
      node = node.parent;
      parent = parent.parent;
    }

    return parent.right;
  }

  findInOrderSuccessor(node) {
    if (!node) return null;

    if (node.right) {
      let current = node.right;

      while (current && current.left) current = current.left;
      return current.value;
    }

    let parent = node.parent;

    while (parent && parent.right === node) {
      node = parent;
      parent = parent.parent;
    }

    return parent.value;
  }

  findPostOrderSuccessor(node) {
    if (!node) return null;

    let parent = node.parent;
    if (!parent) return null;

    if (parent.right === node) return parent.value;

    let current = parent.right;
    while (current && (current.left || current.right)) {
      current = current.left || current.right;
    }

    return current.value;
  }

  // printTree(node = this.root, prefix = "", isLeft = true) {
  //   if (node === null) return;

  //   if (node.right !== null) {
  //     this.printTree(node.right, prefix + (isLeft ? "│   " : "    "), false);
  //   }

  //   console.log(prefix + (isLeft ? "└── " : "┌── ") + node.value);

  //   if (node.left !== null) {
  //     this.printTree(node.left, prefix + (isLeft ? "    " : "│   "), true);
  //   }
  // }
}

BinaryTree.fromValues = function (...values) {
  const binaryTree = new BinaryTree();

  for (let i = 0; i < values.length; i++) {
    binaryTree.insert(values[i]);
  }

  return binaryTree;
};

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.parent = null;
  }
}

module.exports = BinaryTree;
