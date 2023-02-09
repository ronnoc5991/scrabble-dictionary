import TrieNode from "./TrieNode";

export default class Trie {
  private root: TrieNode;

  constructor(pathToWordList: string) {
    this.root = new TrieNode();
    this.loadWordList(pathToWordList);
  }

  private loadWordList(pathToWordList: string) {
    const lineReader = require("readline").createInterface({
      input: require("fs").createReadStream(pathToWordList),
    });

    lineReader.on("line", (line: string) => {
      this.insert(line.toLowerCase());
    });
  }

  public insert(word: string): void {
    let current = this.root;

    for (let i = 0; i < word.length; i++) {
      if (!(word[i] in current.children))
        current.children[word[i]] = new TrieNode();

      current = current.children[word[i]];
    }

    current.isWord = true;
  }

  public search(word: string): boolean {
    let current = this.root;

    for (let i = 0; i < word.length; i++) {
      if (!(word[i] in current.children)) return false;

      current = current.children[word[i]];
    }

    return current.isWord;
  }
}
