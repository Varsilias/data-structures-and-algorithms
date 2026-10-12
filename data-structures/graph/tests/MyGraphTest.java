import java.util.Arrays;
import java.util.Objects;

public final class MyGraphTest {
    public static void main(String[] args) {
        run("simple: new graph starts empty", MyGraphTest::testNewGraphStartsEmpty);
        run("simple: addVertex and addEdge build adjacency", MyGraphTest::testAddVertexAndAddEdgeBuildAdjacency);
        run("mildly absurd: bfs and dfs visit reachable vertices", MyGraphTest::testBfsAndDfsVisitReachableVertices);
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

    private static void testNewGraphStartsEmpty() {
        MyGraph<String> graph = new MyGraph<>();

        assertEquals(0, graph.vertexCount(), "vertexCount");
        assertEquals(0, graph.edgeCount(), "edgeCount");
        assertArrayEquals(new Object[] {}, graph.neighbors("missing"), "neighbors(missing)");
    }

    private static void testAddVertexAndAddEdgeBuildAdjacency() {
        MyGraph<String> graph = new MyGraph<>();

        graph.addVertex("A");
        graph.addVertex("B");
        graph.addEdge("A", "B");

        assertEquals(2, graph.vertexCount(), "vertexCount");
        assertEquals(1, graph.edgeCount(), "edgeCount");
        assertEquals(true, graph.hasVertex("A"), "hasVertex(A)");
        assertEquals(true, graph.hasEdge("A", "B"), "hasEdge(A, B)");
        assertArrayEquals(new Object[] { "B" }, graph.neighbors("A"), "neighbors(A)");
    }

    private static void testBfsAndDfsVisitReachableVertices() {
        MyGraph<String> graph = new MyGraph<>();
        String[][] edges = { { "A", "B" }, { "A", "C" }, { "B", "D" }, { "C", "E" } };

        for (String[] edge : edges) {
            graph.addEdge(edge[0], edge[1]);
        }

        assertArrayEquals(new Object[] { "A", "B", "C", "D", "E" }, graph.breadthFirstSearch("A"), "bfs");
        assertArrayEquals(new Object[] { "A", "B", "D", "C", "E" }, graph.depthFirstSearch("A"), "dfs");
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
