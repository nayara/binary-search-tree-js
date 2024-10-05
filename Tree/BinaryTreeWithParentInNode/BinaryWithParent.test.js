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
      it("it returns null if does not have parent", () => {
        const binaryTree = BinaryTree.fromValues(10, 14, 20);

        console.log(binaryTree.root.parent);

        const result = binaryTree.findPreOrderSuccessor(binaryTree.root);

        expect(result).toBeNull();
      });

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
    });
  });

  describe("#findInOrderSuccessor", () => {
    describe("when the current node does not exists", () => {
      it("it returns null", () => {
        const binaryTree = new BinaryTree();

        const result = binaryTree.findInOrderSuccessor(binaryTree.root);

        expect(result).toBeNull();
      });
    });

    describe("when the current node exists", () => {
      describe("and has right child node", () => {
        it("it returns the leftmost node on the right subtree", () => {
          const binaryTree = BinaryTree.fromValues(
            20,
            10,
            30,
            5,
            15,
            18,
            16,
            18
          );

          const result = binaryTree.findInOrderSuccessor(
            binaryTree.root.left.right
          );

          expect(result).toBe(16);
        });
      });

      describe("and is the last right child node", () => {
        it("it returns the first parent with subtree at right", () => {
          const binaryTree = BinaryTree.fromValues(20, 10, 30, 5, 15, 7, 6, 9);

          const lastLevelRightNode = binaryTree.root.left.left.right.right;

          const result = binaryTree.findInOrderSuccessor(lastLevelRightNode);

          expect(result).toBe(10);
        });
      });
    });
  });

  describe("#findPostOrderSuccessor", () => {
    describe("when current node does not exists", () => {
      it("it returns null", () => {
        const binaryTree = new BinaryTree();

        const result = binaryTree.findPostOrderSuccessor();

        expect(result).toBeNull();
      });
    });

    describe("when current node exists", () => {
      describe("if the node is the tree root", () => {
        it("it returns null", () => {
          const binaryTree = BinaryTree.fromValues(10, 14, 20);

          const result = binaryTree.findPostOrderSuccessor(binaryTree.root);

          expect(result).toBeNull();
        });
      });

      describe("if the node is the right child of parent", () => {
        it("it retuns the parent", () => {
          const binaryTree = BinaryTree.fromValues(
            20,
            10,
            30,
            5,
            15,
            18,
            16,
            19
          );

          const rightChildNode = binaryTree.root.left.left;

          const result = binaryTree.findPostOrderSuccessor(rightChildNode);

          expect(result).toBe(16);
        });
      });

      describe("when the node is the last child of tree", () => {
        describe("if was the last left child", () => {
          it("it returns the left most node in the right sibling subtree", () => {
            const binaryTree = BinaryTree.fromValues(30, 20, 40, 15, 25);

            const rightChildNode = binaryTree.root.left.right;

            const result = binaryTree.findPostOrderSuccessor(rightChildNode);

            expect(result).toBe(20);
          });

          it("it returns the parent when do not have right sibling", () => {
            const binaryTree = BinaryTree.fromValues(
              20,
              10,
              30,
              5,
              15,
              18,
              16,
              19
            );

            const lastLeftChildNode = binaryTree.root.left.right.right.left;

            const result = binaryTree.findPostOrderSuccessor(lastLeftChildNode);

            expect(result).toBe(19);
          });
        });
      });
    });
  });
});
