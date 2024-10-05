const { isSetIterator } = require("util/types");
const Trie = require("./Trie");

const jestConsole = console;

beforeEach(() => {
  global.console = require("console");
});

afterEach(() => {
  global.console = jestConsole;
});

describe("Trie", () => {
  describe("#insert", () => {
    it("it inserts world at trie", () => {
      const trie = new Trie();

      trie.insert("cat");

      const expectedResult = {
        root: {
          children: {
            c: {
              children: {
                a: {
                  children: {
                    t: {
                      children: {},
                      isEndOfWord: true,
                    },
                  },
                  isEndOfWord: false,
                },
              },
              isEndOfWord: false,
            },
          },
          isEndOfWord: false,
        },
      };

      expect(JSON.stringify(trie)).toEqual(JSON.stringify(expectedResult));
    });
  });

  describe("#search", () => {
    it("it return true when found word in tree", () => {
      const trie = Trie.fromWords("car", "cat", "bat");

      const result = trie.search("cat");

      expect(result).toBeTruthy();
    });

    it("it return false when do not found word in tree", () => {
      const trie = Trie.fromWords("car", "cat", "bat");

      const result = trie.search("cab");

      expect(result).toBeFalsy();
    });
  });
});
