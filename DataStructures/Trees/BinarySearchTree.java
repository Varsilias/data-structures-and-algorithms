import java.util.*;

class Node {
	int val;
	Node left;
	Node right;

	public Node(int val) {
		this.val = val;
	}

}

class BST {
	public Node root;

	public BST() {
	}

	public void insert(int val) {
		root = insertNode(root, val);
	}

	private Node insertNode(Node root, int val) {

		if (root == null) {
			root = new Node(val);
			return root;
		}

		if (root.val > val) {
			root.left = insertNode(root.left, val);
		} else if (root.val < val) {
			root.right = insertNode(root.right, val);
		}

		return root;
	}

	public boolean contains(int val) {

		Node result = find(root, val);

		return (result != null) && (result.val == val);
	}

	public Node find(Node root, int val) {

		if(root == null) {
			return null;
		}

		if(root.val == val) {
			return root;
		} else if(root.val > val) {
			return find(root.left, val);
		} else if(root.val < val) {
			return find(root.right, val);
		}

		return null;
	}
	
	public void delete(int val) {
		root = deleteNode(root, val);
	}

	private Node deleteNode(Node root, int val) {
		
		/**
			if node has no child, just remove
			if node has one child, replace it with child
			if node has two children. either:
				replace with the minimum on the right
					or
				replace with the maximum on the left
	 */

		if(root.val > val) {
			root.left = deleteNode(root.left, val);
		} else if(root.val < val) {
			root.right = deleteNode(root.right, val);
		} else {

			if(root.left == null && root.right == null) {
				return null;
			} else if(root.left != null && root.right == null) {
				return root.left;
			} else if (root.left == null && root.right != null) {
				return root.right;
			} else if (root.left != null && root.right != null) {
				
				// get the maximum on the left subtree
				Node maxLeft = root.left;

				while(maxLeft.right != null) {
					maxLeft = maxLeft.right;
				}

				root.val = maxLeft.val;

				root.left = deleteNode(root.left, maxLeft.val);

				return root;
			}
		}

		return root;
	}

	public int maxHeight() {
		return getHeight(root);
	}

	private int getHeight(Node root) {
		
		if(root == null) {
			return 0;
		}
		
		int rightSubtree = getHeight(root.right);
		int leftSubtree = getHeight(root.left);
	

		return 1 + Math.max(rightSubtree, leftSubtree);
	}

	public List<Integer> preOrder() {
		List<Integer> list = new ArrayList<>();

		return printPreOrder(root, list);
	}

	private List<Integer> printPreOrder(Node root, List<Integer> list) {
		list.add(root.val);

		if(root.left != null) {
			printPreOrder(root.left, list);
		}

		if(root.right != null) {
			printPreOrder(root.right, list);
		}

		return list;
	}

	public List<Integer> inOrder() {
		List<Integer> list = new ArrayList<>();
		return printInOrder(root, list);
	}

	private List<Integer> printInOrder(Node root, List<Integer> list) {
		if(root.left != null) {
			printInOrder(root.left, list);
		}
		list.add(root.val);

		if (root.right != null) {
			printInOrder(root.right, list);
		}

		return list;
	}

	public List<Integer> postOrder() {
		List<Integer> list = new ArrayList<>();

		return printPostOrder(root, list);
	}

	private List<Integer> printPostOrder(Node root, List<Integer> list) {
		
		if(root.left != null) {
			printPostOrder(root.left, list);
		}

		if(root.right != null) {
			printPostOrder(root.right, list);
		}

		list.add(root.val);

		return list;
	}
	public List<Integer> levelOrder() {
		Queue<Node> queue = new LinkedList<>();
		List<Integer> list = new ArrayList<>();

		if (this.root == null) {
			return list;
		}
		queue.add(this.root);

		while (queue.peek() != null) {
			Node item = queue.poll();

			if (item.left != null) {
				queue.add(item.left);
			}

			if (item.right != null) {
				queue.add(item.right);
			}

			list.add(item.val);
		}

		return list;
	}
}

class Main {
	public static void main(String[] args) {
		BST bst = new BST();

		bst.insert(20);
		bst.insert(10);
		bst.insert(30);
		bst.insert(25);
		bst.insert(5);
		bst.insert(40);
		bst.insert(15);
		bst.insert(35);
		bst.insert(27);
		

		System.out.println(bst.maxHeight());

		bst.delete(27);
		bst.delete(35);
		bst.delete(20);
		
		
		// System.out.println(bst.contains(40));
		// System.out.println(bst.contains(5));
		System.out.println(bst.root.val);

		System.out.println(bst.inOrder());

		// System.out.println(bst.levelOrder());
		// System.out.println(bst.preOrder());
		// System.out.println(bst.postOrder());


	}
}