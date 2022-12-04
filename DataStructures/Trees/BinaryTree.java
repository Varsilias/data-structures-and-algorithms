import java.util.*;

class TreeNode {
	int val;
	TreeNode left;
	TreeNode right;

	public TreeNode(int val) {;
		this.val = val;
		this.left = null;
		this.right = null;
	}

	public void insertLeft(int data) {
		TreeNode node = new TreeNode(data);

		if(left == null) {
			left = node;
		} else {
			insertLeft(data);
		}
	}

	public void insertRight(int data) {
		TreeNode node = new TreeNode(data);
		
		if(right == null) {
			right = node;
		} else {
			insertRight(data);
		}
	}
	
}

class BinaryTree {
	TreeNode root;

	public void inOrderTraversal(TreeNode root) {
		if(root.left != null) {
			inOrderTraversal(root.left);
		}

		System.out.println(root.val);

		if(root.right != null) {
			inOrderTraversal(root.right);
		}

	}

	public void preOrderTraversal(TreeNode root) {
		
		System.out.println(root.val);

		if(root.left != null) {
			preOrderTraversal(root.left);
		}

		if(root.right != null) {
			preOrderTraversal(root.right);
		}

	}

	public void postOrderTraversal(TreeNode root) {
		if(root.left != null) {
			postOrderTraversal(root.left);
		}

		if(root.right != null) {
			postOrderTraversal(root.right);
		}

		System.out.println(root.val);

	}

	public void levelOrderTraversal(TreeNode root) {
		Queue<TreeNode> queue = new LinkedList<>();
		queue.add(root);

		while(queue.peek() != null) {
			TreeNode item = queue.poll();

			if(item.left != null) {
				queue.add(item.left);
			}

			if (item.right != null) {
				queue.add(item.right);
			}

			System.out.println(item.val);
		}
	}
}

class Main {
  public static void main(String[] args) {

		TreeNode leftSubtree = new TreeNode(9);
		leftSubtree.insertLeft(7);
		leftSubtree.insertRight(3);

		
		TreeNode rightSubtree = new TreeNode(5);
		rightSubtree.insertLeft(8);
		rightSubtree.insertRight(4);

		
    BinaryTree tree = new BinaryTree();
		tree.root = new TreeNode(2);
		tree.root.left = leftSubtree;
		tree.root.right = rightSubtree;

		// System.out.println(tree.root.val); // 2
		// System.out.println(tree.root.left.val); // 9
		// System.out.println(tree.root.right.val); // 5
		// System.out.println("----------------------");
		// System.out.println(tree.root.right.right.val); // 4
		// System.out.println(tree.root.right.left.val); // 8
		// System.out.println("----------------------");

  //   System.out.println(tree.root.left.left.val); // 7
		// System.out.println(tree.root.left.right.val); // 3

		// tree.inOrderTraversal(tree.root);
		// tree.preOrderTraversal(tree.root);
		// tree.postOrderTraversal(tree.root);
		tree.levelOrderTraversal(tree.root);
  }

	
}