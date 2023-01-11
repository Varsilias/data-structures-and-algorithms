import java.util.*;

class TrieNode {
	public static final int N = 26;
	public TrieNode[] children = new TrieNode[26];
	public boolean isEndOfWord = false;
	public int noOfVisits = 0;

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
			root.noOfVisits++;
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

	public int startsWithCount(String prefix) {
		return prefixWordCount(root, prefix);
	}

	private int prefixWordCount(TrieNode root, String prefix) {
		
		for(int i = 0; i < prefix.length(); i++) {
			char c = prefix.charAt(i);
			int index = c - 'a';

			TrieNode child = root.children[index];

			if(child == null) {
				return 0;
			}

			root = root.children[index];
			
		}

		return root.noOfVisits;
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

		
		System.out.println(trie.startsWithCount("be")); // 2
		System.out.println(trie.startsWithCount("ap")); // 2

		// System.out.println();
	}
}