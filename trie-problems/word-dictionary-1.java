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
			TrieNode curr = this.root;
			Set<Character> keys = curr.children.keySet();
			char[] charArray = word.toCharArray();
			int len = charArray.length;
			
			for(int i = 0; i < len; i++) {
				char c = charArray[i];
				if(c == '.') {
					// System.out.println(keys);

					if(keys.isEmpty()) {
						return false;
					}

					boolean keyPresent = false;
					for(char k : keys) {
						TrieNode el = curr.children.get(k); // t -> []
						Set<Character> keysOfKeys = el.children.keySet(); // []

						// System.out.println(keysOfKeys);
						// System.out.println(keysOfKeys.contains(charArray[i + 1]));

						if(i == (len - 1)) {
							curr = el; 
							keys = keysOfKeys;
							keyPresent = true;
							break;
						}

						if(keysOfKeys.contains(charArray[i + 1]) || (charArray[i + 1] == '.')) {
							curr = el; // a -> [t]
							keys = keysOfKeys; // [t]
							keyPresent = true;
							break;
						}
					}

					if(keyPresent) {
						continue;
					} else {
						return false;
					}
				}
				
				TrieNode child = curr.children.get(c);

				if(child == null) {
					return false;
				}

				curr = child; // b -> [a]
				keys = curr.children.keySet(); // [a]

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

	/*
		[
"WordDictionary",
"addWord","addWord","addWord","addWord",
"search","search","addWord","search","search","search","search","search","search"]
[[],["at"],["and"],["an"],["add"],["a"],[".at"],["bat"],[".at"],["an."],["a.d."],["b."],["a.d"],["."]]

[null,null,null,null,null,false,false,null,true,true,false,false,true,false]
	*/
}