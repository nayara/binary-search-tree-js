const BinaryTree = require("./BinaryWithParent");

const jestConsole = console;

beforeEach(() => {
  global.console = require("console");
});

afterEach(() => {
  global.console = jestConsole;
});

describe("BinaryTreeWithParent", () => {
  describe("#insert", () => {
    describe("when tree root is empty", () => {
      it("it inserts node at root", () => {
        const binaryTree = new BinaryTree();

        binaryTree.insert(4);

        expect(binaryTree.root.value).toBe(4);
        expect(binaryTree.root.right).toBeNull();
        expect(binaryTree.root.left).toBeNull();
        expect(binaryTree.root.parent).toBeNull();
      });
    });

    describe("when tree has root", () => {
      it("it insert child node at right when value is bigger then root", () => {
        const binaryTree = BinaryTree.fromValues(4);

        binaryTree.insert(10);

        expect(binaryTree.root.value).toBe(4);
        expect(binaryTree.root.right.value).toBe(10);
        expect(binaryTree.root.left).toBeNull();
        expect(binaryTree.root.right.parent).toBe(binaryTree.root);
      });

      it("it insert child node at left when value is smaller then root", () => {
        const binaryTree = BinaryTree.fromValues(4);

        binaryTree.insert(2);

        expect(binaryTree.root.value).toBe(4);
        expect(binaryTree.root.left.value).toBe(2);
        expect(binaryTree.root.left.parent).toBe(binaryTree.root);
        expect(binaryTree.root.right).toBeNull();
      });

      it("it insert child node correctly when has more than one level", () => {
        const binaryTree = BinaryTree.fromValues(10, 15, 7, 17, 14);

        binaryTree.insert(8);
        binaryTree.insert(6);

        expect(binaryTree.root.value).toBe(10);

        expect(binaryTree.root.right.value).toBe(15);
        expect(binaryTree.root.right.parent).toBe(binaryTree.root);

        expect(binaryTree.root.right.right.value).toBe(17);
        expect(binaryTree.root.right.right.parent.value).toBe(15);

        expect(binaryTree.root.right.left.value).toBe(14);
        expect(binaryTree.root.right.left.parent.value).toBe(15);

        expect(binaryTree.root.left.left.value).toBe(6);
        expect(binaryTree.root.left.left.parent.value).toBe(7);

        expect(binaryTree.root.left.right.value).toBe(8);
        expect(binaryTree.root.left.right.parent.value).toBe(7);
      });
    });
  });

  describe("#findPreOrderSuccessor", () => {
    describe("when current node does not exists", () => {
      it("it returns null", () => {
        const binaryTree = new BinaryTree();

        const result = binaryTree.findPreOrderSuccessor();

        expect(result).toBeNull();
      });
    });

    describe("when current node exists", () => {
      it("it retuns left node if exists", () => {
        const binaryTree = BinaryTree.fromValues(10, 7, 18, 8, 6, 19, 17);

        const result = binaryTree.findPreOrderSuccessor(binaryTree.root.left);

        expect(result.value).toBe(6);
      });

      it("it retuns right node if exists and do not have any left node", () => {
        const binaryTree = BinaryTree.fromValues(10, 18, 19);

        const result = binaryTree.findPreOrderSuccessor(binaryTree.root.right);

        expect(result.value).toBe(19);
      });

      it("it retuns parent right node if exists and do not have visited yet", () => {
        const binaryTree = BinaryTree.fromValues(10, 8, 11, 3, 9, 6, 5, 7);

        const lastRightElementOnTree = binaryTree.root.left.left.right.right;

        const result = binaryTree.findPreOrderSuccessor(lastRightElementOnTree);

        expect(result.value).toBe(9);
      });

      it("it retuns null when do not have a parent", () => {
        const binaryTree = BinaryTree.fromValues(10, 8, 3, 6, 5, 7);

        const lastRightElementOnTree = binaryTree.root.left.left.right.right;

        const result = binaryTree.findPreOrderSuccessor(lastRightElementOnTree);

        binaryTree.printTree();

        expect(result).toBeNull();
      });
    });
  });
});
