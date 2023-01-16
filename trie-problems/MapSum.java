// https://leetcode.com/problems/map-sum-pairs

import java.util.*;

class TrieNode {
	Map<Character, TrieNode> children = new HashMap<>();
	public boolean isEndOfWord = false;
	public int value = 0;
}


class MapSum {
	
	

	TrieNode root;

	/** Initialize your data structure here. */
	public MapSum() {
		this.root = new TrieNode();
	}

	public void insert(String key, int value) {
		TrieNode curr = this.root;

		for (char c : key.toCharArray()) {

			TrieNode next = curr.children.get(c);
			if (next == null) {
				curr.children.put(c, new TrieNode());
			}

			curr = curr.children.get(c);
		}

		curr.isEndOfWord = true;
		curr.value = value;

	}

	public int sum(String prefix) {
		TrieNode curr = this.root;

		for (char c : prefix.toCharArray()) {
			int index = c;
			TrieNode next = curr.children.get(c);

			if (next == null) {
				return 0;
			}

			curr = next;

		}

		return getSum(curr);
		
	}

	private int getSum(TrieNode curr) {
		int sum = 0;
	
		for(char key : curr.children.keySet()) {
			sum += getSum(curr.children.get(key));
		}

		return sum + curr.value;
	}
	
}

public class Main {
	public static void main(String args[]) {
		MapSum mapSum = new MapSum();
		mapSum.insert("apple", 3);
		// mapSum.sum("ap");

		
		System.out.println(mapSum.sum("ap")); // return 3 (apple = 3)
		mapSum.insert("app", 2);
		System.out.println(mapSum.sum("ap")); // return 5
	}
}