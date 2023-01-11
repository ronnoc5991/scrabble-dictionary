export default class TrieNode {
  public isWord: boolean;
  public children: Record<string, TrieNode>;

  constructor() {
    this.isWord = false;
    this.children = {};
  }
}
