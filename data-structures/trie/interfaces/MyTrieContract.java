public interface MyTrieContract {
    int size();
    boolean isEmpty();
    void insert(String word);
    boolean contains(String word);
    boolean startsWith(String prefix);
    boolean remove(String word);
    Object[] wordsWithPrefix(String prefix);
    void clear();
}
