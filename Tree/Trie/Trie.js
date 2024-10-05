class Trie {
  constructor() {
    this.root = new Node();
  }

  insert(word) {
    let currentNode = this.root;

    for (let letter of word) {
      if (!currentNode.children[letter]) {
        currentNode.children[letter] = new Node();
      }
      currentNode = currentNode.children[letter];
    }
    currentNode.isEndOfWord = true;
  }

  search(word) {
    let currentNode = this.root;

    for (let letter of word) {
      if (!currentNode.children[letter]) {
        return false;
      }
      currentNode = currentNode.children[letter];
    }

    return currentNode.isEndOfWord;
  }

//   printTrie(node = this.root, level = 0) {
//     for (let letter in node.children) {
//       console.log("  ".repeat(level) + letter);
//       this.printTrie(node.children[letter], level + 1);
//     }
//     if (node.isEndOfWord) {
//       console.log("  ".repeat(level) + "(end of word)");
//     }
//   }
}

Trie.fromWords = (...words) => {
  const trie = new Trie();

  for (let i = 0; i < words.length; i++) {
    trie.insert(words[i]);
  }

  return trie;
};

class Node {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

module.exports = Trie;
