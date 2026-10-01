public final class MyTrieTest {
    public static void main(String[] args) {
        MyTrie trie = new MyTrie();
        if (trie.size() != 0) throw new AssertionError("expected size 0");
        if (!trie.isEmpty()) throw new AssertionError("expected empty trie");
        trie.insert("cat");
    }
}
