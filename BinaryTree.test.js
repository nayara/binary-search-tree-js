const BinarySearchTree = require("./BinaryTree");

describe("BinaryTree", () => {
  describe("#insert", () => {
    describe("with root value null", () => {
      it("it insert value at root", () => {
        const binaryTree = BinarySearchTree.fromValues(9);

        expect(binaryTree.root.value).toBe(9);
      });
    });

    describe("when tree has the value to insert", () => {
      it("it returns null", () => {
        const binaryTree = BinarySearchTree.fromValues(5, 3, 6);

        const result = binaryTree.insert(3);

        expect(result).toBeNull();
      });
    });

    describe("with value to insert is grather than root", () => {
      describe("when does not have node at right", () => {
        it("it insert node to the right", () => {
          const binaryTree = BinarySearchTree.fromValues(4);

          binaryTree.insert(7);

          expect(binaryTree.root.value).toBe(4);
          expect(binaryTree.root.right.value).toBe(7);
        });
      });

      describe("when has node at right", () => {
        it("it insert value to the right if the value is greater than parent node", () => {
          const binaryTree = BinarySearchTree.fromValues(4, 7);

          binaryTree.insert(8);

          expect(binaryTree.root.value).toBe(4);
          expect(binaryTree.root.right.right.value).toBe(8);
          expect(binaryTree.root.left).toBeNull();
        });

        it("it insert value to the left if the value is smaller than parent node", () => {
          const binaryTree = BinarySearchTree.fromValues(4, 7);

          binaryTree.insert(6);

          expect(binaryTree.root.value).toBe(4);
          expect(binaryTree.root.right.left.value).toBe(6);
          expect(binaryTree.root.left).toBeNull();
        });
      });
    });

    describe("with value to insert is smaller than root", () => {
      describe("when does not have node at left", () => {
        it("it insert node to the left", () => {
          const binaryTree = BinarySearchTree.fromValues(5);

          binaryTree.insert(3);

          expect(binaryTree.root.left.value).toBe(3);
          expect(binaryTree.root.right).toBeNull();
        });
      });

      describe("when has node at left", () => {
        it("it insert value to the right if the value is greater than parent node", () => {
          const binaryTree = BinarySearchTree.fromValues(5, 3);

          binaryTree.insert(4);

          expect(binaryTree.root.left.right.value).toBe(4);
          expect(binaryTree.root.left.left).toBe(null);
        });

        it("it insert value to the left if the value is smaller than parent node", () => {
          const binaryTree = BinarySearchTree.fromValues(5, 3);

          binaryTree.insert(2);

          expect(binaryTree.root.left.right).toBeNull();
          expect(binaryTree.root.left.left.value).toBe(2);
        });
      });
    });
  });

  describe("#find", () => {
    describe("when tree do not have root", () => {
      it("it retuns null", () => {
        const binaryTree = new BinarySearchTree();

        const result = binaryTree.find(4);

        expect(result).toBe("Value not found - empty tree");
      });
    });

    describe("when tree does not have the searched value", () => {
      it("it returns a message", () => {
        const binaryTree = BinarySearchTree.fromValues(4, 6, 8, 10);

        const result = binaryTree.find(42);

        expect(result).toBe("Value 42 not found");
      });
    });

    describe("when the searched value is greater than current vertice", () => {
      it("it returns the right value", () => {
        const binaryTree = BinarySearchTree.fromValues(2, 9);

        const result = binaryTree.find(9);

        expect(result).toBe(binaryTree.root.right);
      });
    });

    describe("when the searched value is smaller than current vertice", () => {
      it("it returns the left value", () => {
        const binaryTree = BinarySearchTree.fromValues(2, 1);

        const result = binaryTree.find(1);

        expect(result).toBe(binaryTree.root.left);
      });
    });
  });

  describe("#remove", () => {
    describe("when the tree is empty", () => {
      it("it return null", () => {
        const binaryTree = new BinarySearchTree();

        const result = binaryTree.remove(4);

        expect(result).toBe(undefined);
      });
    });

    describe("when the vertice is a leaf", () => {
      it("it remove the vertice", () => {
        const binaryTree = BinarySearchTree.fromValues(10, 5, 15, 20, 14, 7, 4);

        binaryTree.remove(4);

        const expectedResult = binaryTree.find(4);

        expect(expectedResult).toBe("Value 4 not found");
      });
    });

    describe("when vertice to be removed has one child", () => {
      describe("located at left", () => {
        it("it remove the node and copy the child to the vertice", () => {});
        const binaryTree = BinarySearchTree.fromValues(10, 5, 15, 14, 7, 4);

        binaryTree.remove(15);

        const deletedElement = binaryTree.find(15);

        expect(deletedElement).toBe("Value 15 not found");
        expect(binaryTree.root.right.value).toBe(14);
      });

      describe("located at right", () => {
        it("it remove the node and copy the child to the vertice", () => {});
        const binaryTree = BinarySearchTree.fromValues(10, 5, 15, 20, 7, 4);

        binaryTree.remove(15);

        const deletedElement = binaryTree.find(15);

        expect(deletedElement).toBe("Value 15 not found");
        expect(binaryTree.root.right.value).toBe(20);
      });
    });

    describe("when vertice to be removed has two childs", () => {
      it("it remove the node and replace with the vertice that has the nearest value", () => {});
      const binaryTree = BinarySearchTree.fromValues(10, 5, 15, 14, 7, 4);

      binaryTree.remove(10);

      const deletedElement = binaryTree.find(10);

      expect(deletedElement).toBe("Value 10 not found");
      expect(binaryTree.root.value).toBe(14);
    });
  });

  describe("#breadthFirstSearch", () => {
    describe("when root is null", () => {
      it("it returns empty array", () => {
        const binaryTree = new BinarySearchTree();
        const result = binaryTree.breadthFirstSearch();

        expect(result).toEqual([]);
      });
    });

    describe("when tree has only the root element", () => {
      it("it return the root value", () => {
        const binaryTree = BinarySearchTree.fromValues(4);

        const result = binaryTree.breadthFirstSearch();

        expect(result).toEqual([4]);
        expect(binaryTree.root.left).toBeNull();
        expect(binaryTree.root.right).toBeNull();
      });
    });

    describe("when tree has many elements", () => {
      it("it returns the values in an array passing by each level", () => {
        const binaryTree = BinarySearchTree.fromValues(10, 5, 15, 14, 17, 7, 4);

        const result = binaryTree.breadthFirstSearch();

        expect(result).toEqual([10, 5, 15, 4, 7, 14, 17]);
      });
    });
  });

  describe("#BFSGroupedByLevel", () => {
    describe("when root is null", () => {
      it("it returns empty array", () => {
        const binaryTree = new BinarySearchTree();
        const result = binaryTree.BFSGroupedByLevel();

        expect(result).toEqual([]);
      });
    });

    describe("when tree has only the root element", () => {
      it("it return the root value", () => {
        const binaryTree = BinarySearchTree.fromValues(4);

        const result = binaryTree.BFSGroupedByLevel();

        expect(result).toEqual([[4]]);
        expect(binaryTree.root.left).toBeNull();
        expect(binaryTree.root.right).toBeNull();
      });
    });

    describe("when tree has many elements", () => {
      it("it returns the values in an array passing by each level", () => {
        const binaryTree = BinarySearchTree.fromValues(10, 5, 15, 14, 17, 7, 4);

        const result = binaryTree.BFSGroupedByLevel();

        console.log(JSON.stringify(result));

        expect(result).toEqual([[10], [5, 15], [4, 7, 14, 17]]);
      });
    });
  });
});
