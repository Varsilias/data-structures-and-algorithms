import java.util.Arrays;
import java.util.Objects;

public final class MyTrieTest {
    public static void main(String[] args) {
        run("simple: new trie starts empty", MyTrieTest::testNewTrieStartsEmpty);
        run("simple: insert contains and startsWith distinguish words from prefixes",
                MyTrieTest::testInsertContainsAndStartsWithDistinguishWordsFromPrefixes);
        run("mildly absurd: remove keeps shared prefixes intact", MyTrieTest::testRemoveKeepsSharedPrefixesIntact);
    }

    private static void run(String name, Runnable test) {
        try {
            test.run();
            System.out.println("PASS " + name);
        } catch (RuntimeException error) {
            System.out.println("FAIL " + name);
            throw error;
        }
    }

    private static void testNewTrieStartsEmpty() {
        MyTrie trie = new MyTrie();

        assertEquals(0, trie.size(), "size");
        assertEquals(true, trie.isEmpty(), "isEmpty");
        assertEquals(false, trie.contains("cat"), "contains(cat)");
        assertEquals(false, trie.startsWith("ca"), "startsWith(ca)");
    }

    private static void testInsertContainsAndStartsWithDistinguishWordsFromPrefixes() {
        MyTrie trie = new MyTrie();

        trie.insert("cat");
        trie.insert("car");
        trie.insert("cart");

        assertEquals(3, trie.size(), "size");
        assertEquals(true, trie.contains("car"), "contains(car)");
        assertEquals(false, trie.contains("ca"), "contains(ca)");
        assertEquals(true, trie.startsWith("ca"), "startsWith(ca)");
        assertArrayEquals(new Object[] { "car", "cart" }, trie.wordsWithPrefix("car"), "wordsWithPrefix(car)");
    }

    private static void testRemoveKeepsSharedPrefixesIntact() {
        MyTrie trie = new MyTrie();

        for (String word : new String[] { "app", "apple", "apply", "apt" }) {
            trie.insert(word);
        }

        assertEquals(true, trie.remove("apple"), "remove(apple)");
        assertEquals(false, trie.contains("apple"), "contains(apple)");
        assertEquals(true, trie.contains("app"), "contains(app)");
        assertArrayEquals(new Object[] { "app", "apply" }, trie.wordsWithPrefix("app"), "wordsWithPrefix(app)");
    }

    private static void assertEquals(Object expected, Object actual, String label) {
        if (!Objects.equals(expected, actual)) {
            throw new AssertionError(label + " expected " + expected + " but got " + actual);
        }
    }

    private static void assertArrayEquals(Object[] expected, Object[] actual, String label) {
        if (!Arrays.equals(expected, actual)) {
            throw new AssertionError(
                    label + " expected " + Arrays.toString(expected) + " but got " + Arrays.toString(actual));
        }
    }
}
