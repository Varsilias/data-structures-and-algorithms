import java.util.*;

class TrieNode {
	public static final int N = 26;
	public TrieNode[] children = new TrieNode[26];
	public boolean isEndOfWord = false;
}

class Trie {
	private TrieNode root;

	public Trie() {
		this.root = new TrieNode();
	}

	public void insert(String word) {
		insertWord(root, word);
	}

	private void insertWord(TrieNode root, String word) {

		for (int i = 0; i < word.length(); i++) {
			char c = word.charAt(i);
			int index = c - 'a';
			TrieNode prefix = root.children[index];

			if (prefix == null) {
				root.children[index] = new TrieNode();
			}

			root = root.children[index];
		}

		root.isEndOfWord = true;
	}

	public boolean search(String word) {
		return searchWord(root, word);

	}

	private boolean searchWord(TrieNode root, String word) {
		
		for (int i = 0; i < word.length(); i++) {
			char c = word.charAt(i);
			int index = c - 'a';
			TrieNode prefix = root.children[index];

			if(prefix == null) {
				return false;
			}
			root = root.children[index];
		}

		return root.isEndOfWord;
	}

	public boolean startsWith(String prefix) {
		return startsWithPrefix(root, prefix);
	}

	private boolean startsWithPrefix(TrieNode root, String prefix) {
		for (int i = 0; i < prefix.length(); i++) {
			char c = prefix.charAt(i);
			int index = c - 'a';
			TrieNode charNode = root.children[index];

			if(charNode == null) {
				return false;
			}
			root = root.children[index];
		}

		return true;
	}
}

public class Main {
	public static void main(String args[]) {
		Trie trie = new Trie();

		trie.insert("apple");
		System.out.println(trie.search("apple")); // true
		System.out.println(trie.search("app")); // false
		System.out.println(trie.startsWith("app")); // true
		trie.insert("app");
		System.out.println(trie.search("app")); // true

		trie.insert("bed");
		trie.insert("bead");

		System.out.println(trie.startsWith("be")); // true


		// System.out.println();
	}
}