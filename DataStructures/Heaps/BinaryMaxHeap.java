import java.util.*;

class BinaryMaxHeap {

	/* Keeps track of the size of the Heap */
	private int size;

	/* Keeps track of the next available index in the underlying array */
	private int index;

	/* The underlying List */
	private List<Integer> entries;

	public BinaryMaxHeap() {
		this.entries = new ArrayList<>();
		this.size = 0;
		this.index = 0;
	}

	public void insert(int val) {
		// insert and heapifyUp
		entries.add(index, val);
		this.size++;
		heapifyUp();
		this.index++;
	}

	private void heapifyUp() {

		// get a reference to the last added index in the underlying array
		int refIndex = this.index;

		// get the parent of the last node/element added
		int parentIndex = (refIndex - 1) / 2;
		int parent = entries.get(parentIndex);

		// the actual last added node/element
		int recentlyAdded = entries.get(refIndex);

		if (this.size == 1) {
			return;
		} else {

			while (recentlyAdded > parent) {
				swap(parentIndex, refIndex);
				refIndex = parentIndex;
				recentlyAdded = entries.get(refIndex);
				parentIndex = (refIndex - 1) / 2;
				parent = entries.get(parentIndex);

			}
		}

	}

	private void swap(int index1, int index2) {
		int temp = entries.get(index1);
		entries.set(index1, entries.get(index2));
		entries.set(index2, temp);
	}

	public int remove() {
		int lastIndex = (size - 1);
		swap(0, lastIndex);
		int nodeValue = entries.remove(lastIndex);
		this.index--;
		this.size--;
		
		heapifyDown();
		return nodeValue;
	}

	private void heapifyDown() {
		
		int newMaxIndex = 0;
		if(newMaxIndex < 0 || newMaxIndex >= size) {
			return;
		}

		int leftIndex = (2 * newMaxIndex) + 1;
		int rightIndex = leftIndex + 1;

		if (leftIndex < 0 || leftIndex >= size){
			return;
		}

		int parent = entries.get(newMaxIndex);
		int left = entries.get(leftIndex);

		// if right index is out of bound, then there must be a left element
		// we can compare the left element to the parent element and swap
		// if need be
		if (rightIndex < 0 || rightIndex >= size){
			if(left > parent) {
				swap(leftIndex, newMaxIndex);
			}
			return;
		}

		int right = entries.get(rightIndex);

		int swapIndex = right > left ? rightIndex : leftIndex;

		while(entries.get(swapIndex) > parent) {
			swap(swapIndex, newMaxIndex);

			newMaxIndex = swapIndex;
			leftIndex = (2 * newMaxIndex) + 1;
			rightIndex = leftIndex + 1;

			if(leftIndex > size || rightIndex > size) {
				break;
			}
			
			parent = entries.get(newMaxIndex);
			left = entries.get(leftIndex);
			right = entries.get(rightIndex);

			swapIndex = right > left ? rightIndex : leftIndex;

			
		}
		

	}
	
	public int peek() {
		if(entries.size() <= 0 || this.size == 0) {
			return -1;
		}
		return entries.get(0);
	}

	public List<Integer> printHeap() {
		return entries;
	}
}

class Main {
	public static void main(String[] args) {
		BinaryMaxHeap maxHeap = new BinaryMaxHeap();

		maxHeap.insert(15);
		maxHeap.insert(40);
		maxHeap.insert(100);
		maxHeap.insert(200);
		maxHeap.insert(500);
		maxHeap.insert(50);
		maxHeap.insert(30);
		maxHeap.remove();
		maxHeap.remove();
		System.out.println(maxHeap.peek());
		System.out.println(maxHeap.printHeap());

	}
}