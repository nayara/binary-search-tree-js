const AVLTree = require("./AVLTree");

describe("AVLTree", () => {
  it("insert node when root is null", () => {
    const avlTree = new AVLTree();

    avlTree.insert(7);

    expect(avlTree.root.value).toBe(7);
    expect(avlTree.root.right).toBeNull();
    expect(avlTree.root.left).toBeNull();
    expect(avlTree.root.height).toBe(1);
  });

  it("insert node when value is smaller than root", () => {
    const avlTree = new AVLTree();

    avlTree.insert(7);
    avlTree.insert(6);

    expect(avlTree.root.value).toBe(7);
    expect(avlTree.root.right).toBeNull();
    expect(avlTree.root.height).toBe(2);

    expect(avlTree.root.left.value).toBe(6);
    expect(avlTree.root.left.height).toBe(1);
  });

  it("insert node when value is bigger than root", () => {
    const avlTree = new AVLTree();

    avlTree.insert(7);
    avlTree.insert(8);

    expect(avlTree.root.value).toBe(7);
    expect(avlTree.root.left).toBeNull();
    expect(avlTree.root.height).toBe(2);

    expect(avlTree.root.right.value).toBe(8);
    expect(avlTree.root.right.height).toBe(1);
  });

  it("do not insert node when value already exists in tree", () => {
    const avlTree = new AVLTree();

    avlTree.insert(7);
    avlTree.insert(7);

    expect(avlTree.root.value).toBe(7);
    expect(avlTree.root.left).toBeNull();
    expect(avlTree.root.height).toBe(1);

    expect(avlTree.root.right).toBeNull();
  });

  it("execute right rotation when is unbalanced at left", () => {
    const avlTree = new AVLTree();

    avlTree.insert(7);
    avlTree.insert(6);
    avlTree.insert(5);

    expect(avlTree.root.value).toBe(6);

    expect(avlTree.root.right.value).toBe(7);
    expect(avlTree.root.right.height).toBe(1);

    expect(avlTree.root.left.value).toBe(5);
    expect(avlTree.root.left.height).toBe(1);
  });

  it("execute left rotation when is unbalanced at right", () => {
    const avlTree = new AVLTree();

    avlTree.insert(7);
    avlTree.insert(8);
    avlTree.insert(9);

    expect(avlTree.root.value).toBe(8);

    expect(avlTree.root.right.value).toBe(9);
    expect(avlTree.root.right.height).toBe(1);

    expect(avlTree.root.left.value).toBe(7);
    expect(avlTree.root.left.height).toBe(1);
  });

  it("execute left-right rotation when child tree is unbalanced at right", () => {
    const avlTree = new AVLTree();

    avlTree.insert(5);
    avlTree.insert(3);
    avlTree.insert(4);

    expect(avlTree.root.value).toBe(4);

    expect(avlTree.root.right.value).toBe(5);
    expect(avlTree.root.right.height).toBe(1);

    expect(avlTree.root.left.value).toBe(3);
    expect(avlTree.root.left.height).toBe(1);
  });

  it("execute right-left rotation when child tree is unbalanced at left", () => {
    const avlTree = new AVLTree();

    avlTree.insert(5);
    avlTree.insert(7);
    avlTree.insert(6);

    expect(avlTree.root.value).toBe(6);

    expect(avlTree.root.right.value).toBe(7);
    expect(avlTree.root.right.height).toBe(1);

    expect(avlTree.root.left.value).toBe(5);
    expect(avlTree.root.left.height).toBe(1);
  });
});
