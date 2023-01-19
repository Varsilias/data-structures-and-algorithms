import java.util.*;

class TrieNode {
	Map<Character, TrieNode> children = new HashMap<>();
	boolean isEndOfWord = false;
}

class WordDictionary {
		TrieNode root;
	
    public WordDictionary() {
        this.root = new TrieNode();
    }
    
    public void addWord(String word) {
			TrieNode curr = this.root;
        for(char c : word.toCharArray()) {
					TrieNode child = curr.children.get(c);

					if(child == null) {
						curr.children.put(c, new TrieNode());
					}

					curr = curr.children.get(c);
				}

			curr.isEndOfWord = true;
    }
    
    public boolean search(String word) { // b..
			
			return searchString(root, word);
    }

		private boolean searchString(TrieNode root, String word) {// ".ad" stack = [d, m] b=1
			TrieNode curr = root; // node(b) -> [a] 
		
			char[] charArray = word.toCharArray(); // ["a"]
			int len = charArray.length; // 1

			for(int i = 0; i < len; i++) {
				char c = charArray[i]; // 'a'

				if(c == '.') {
					for(char ch : curr.children.keySet()) {
						if(searchString(curr.children.get(ch), word.substring(i + 1))) return true;
					}
					return false;
				}

				TrieNode child = curr.children.get(c);

				if(child == null) {
					return false;
				}

				curr = child; // a -> [d]
			}
      
			return curr.isEndOfWord;
		}
}

public class Main {

	public static void main(String args[]) {

		
		WordDictionary wordDictionary = new WordDictionary();

		
		wordDictionary.addWord("at");
		wordDictionary.addWord("and");
		wordDictionary.addWord("an");
		wordDictionary.addWord("add");
		System.out.println(wordDictionary.search("a")); // return False
		System.out.println(wordDictionary.search(".at")); // return False
		wordDictionary.addWord("bat");
		System.out.println(wordDictionary.search(".at")); // return True
		System.out.println(wordDictionary.search("an.")); // return True
		System.out.println(wordDictionary.search("a.d.")); // return False
		System.out.println(wordDictionary.search("b.")); // return False
		System.out.println(wordDictionary.search("a.d")); // return True
		System.out.println(wordDictionary.search(".")); // return false

		// wordDictionary.addWord("bad");
		// wordDictionary.addWord("dad");
		// wordDictionary.addWord("mad");
		// System.out.println(wordDictionary.search("pad")); // return False
		// System.out.println(wordDictionary.search("bad")); // return True
		// System.out.println(wordDictionary.search(".ad")); // return True
		// System.out.println(wordDictionary.search("b..")); // return True
	}

}