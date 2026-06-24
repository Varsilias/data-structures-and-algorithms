
// import java.io.BufferedReader;
import java.io.IOException;
// import java.io.InputStreamReader;
// import java.util.Scanner;
// import java.util.StringTokenizer;

public class APlusB {
    public static void main(String[] args) throws IOException {
        System.gc();
        // Scanner scanner = new Scanner(System.in);

        // int a = scanner.nextInt();
        // int b = scanner.nextInt();

        // System.out.println(a + b);

        // scanner.close();

        // BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        // String line = reader.readLine();
        // if (line == null) {
        // return;
        // }

        // StringTokenizer tokenizer = new StringTokenizer(line);

        // int a = Integer.parseInt(tokenizer.nextToken());
        // int b = Integer.parseInt(tokenizer.nextToken());

        // System.out.println(a + b);

        int a = readInt();
        int b = readInt();
        System.out.println(a + b);
    }

    private static int readInt() throws IOException {
        int c = System.in.read();
        while (c <= 32) { // Skip spaces, tabs, and line breaks
            if (c == -1)
                return 0;
            c = System.in.read();
        }
        int res = 0;
        while (c > 32) {
            if (c >= '0' && c <= '9') {
                res = res * 10 + c - '0';
            }
            c = System.in.read();
        }
        return res;
    }
}