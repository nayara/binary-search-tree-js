class AVLTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    this.root = this.insertNode(this.root, value);
  }

  insertNode(node, value) {
    if (node === null) {
      return new Node(value);
    }

    if (node.value > value) {
      node.left = this.insertNode(node.left, value);
    } else if (node.value < value) {
      node.right = this.insertNode(node.right, value);
    } else {
      return node;
    }

    node.height =
      1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));

    const balance = this.getBalanceFactor(node);

    if (balance > 1 && value < node.left.value) {
      return this.rightRotate(node);
    }

    if (balance < -1 && value > node.right.value) {
      return this.leftRotate(node);
    }

    if (balance > 1 && value > node.left.value) {
      node.left = this.leftRotate(node.left);
      return this.rightRotate(node);
    }

    if (balance < -1 && value < node.right.value) {
      node.right = this.rightRotate(node.right);
      return this.leftRotate(node);
    }

    return node;
  }

  rightRotate(unbalancedNode) {
    const x = unbalancedNode.left;
    const T2 = x.right;

    x.right = unbalancedNode;
    unbalancedNode.left = T2;

    unbalancedNode.height =
      Math.max(
        this.getHeight(unbalancedNode.left),
        this.getHeight(unbalancedNode.right)
      ) + 1;

    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;

    return x;
  }

  leftRotate(unbalancedNode) {
    const x = unbalancedNode.right;
    const T2 = x.left;

    x.left = unbalancedNode;
    unbalancedNode.right = T2;

    unbalancedNode.height =
      Math.max(
        this.getHeight(unbalancedNode.left),
        this.getHeight(unbalancedNode.right)
      ) + 1;

    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;

    return x;
  }

  getHeight(node) {
    return node ? node.height : 0;
  }

  getBalanceFactor(node) {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.right = null;
    this.left = null;
    this.height = 1;
  }
}

module.exports = AVLTree;
