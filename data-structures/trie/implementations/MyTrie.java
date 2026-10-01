public class MyTrie implements MyTrieContract {
    public int size() { return 0; }
    public boolean isEmpty() { return size() == 0; }
    public void insert(String word) { throw new UnsupportedOperationException("TODO: implement insert"); }
    public boolean contains(String word) { return false; }
    public boolean startsWith(String prefix) { return false; }
    public boolean remove(String word) { throw new UnsupportedOperationException("TODO: implement remove"); }
    public Object[] wordsWithPrefix(String prefix) { return new Object[] {}; }
    public void clear() { throw new UnsupportedOperationException("TODO: implement clear"); }
}
