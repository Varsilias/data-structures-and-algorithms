import java.util.*;

class Solution {

	public String replaceWords(List<String> dictionary, String sentence) {
		String[] words = sentence.split(" ");
		Map<Integer, String> s = new HashMap<>();

		for (int i = 0; i < words.length; i++) { // O(n) n = length of sentence when splitted
			s.put(i, words[i]);
		}

		for (int i = 0; i < words.length; i++) { // O(n * m) m = length of dictionary
			for (int j = 0; j < dictionary.size(); j++) {
				if (s.get(i).startsWith(dictionary.get(j))) {
					s.replace(i, dictionary.get(j));
				}
			}
		}
		

		StringBuffer str = new StringBuffer();
		for (int i = 0; i < words.length; i++) { // O(n)
			words[i] = s.get(i);

			str.append(words[i]);

			 

			if(i != (words.length - 1)) {
				str.append(" ");
			}

		}


		return str.toString(); // O(n) + O(n * m) + O(n) = O(n * m)
	}

}

public class Main {

	public static void main(String args[]) {
		Solution soln = new Solution();
		List<String> dictionary = new ArrayList<>(Arrays.asList("cat", "bat", "rat"));
		String sentence = "the cattle was rattled by the battery";
		System.out.println(soln.replaceWords(dictionary, sentence));
	}
}