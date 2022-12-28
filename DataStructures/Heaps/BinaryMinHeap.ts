export default class MinHeap {
	public length: number;
	private index: number;
	private array: number[];



	constructor() {
		this.array = [];
		this.length = this.array.length;
		this.index = 0;
	}

	insert(value: number): void {
		this.array[this.index] = value;
		this.length++;
		this.index++;

		this.heapifyUp()
	}

	heapifyUp(): void {

		if (this.array.length <= 1) {
			return;
		}



		let parentIndex = Math.floor((this.index - 1) / 2);
		let lastAddedIndex = this.index - 1;


		let parent = this.array[parentIndex];
		let lastAdded = this.array[lastAddedIndex];



		while (parent > lastAdded) {
			this.swap(parentIndex, lastAddedIndex);
			lastAddedIndex = parentIndex
			parentIndex = Math.floor((lastAddedIndex - 1) / 2);

			parent = this.array[parentIndex];
			lastAdded = this.array[lastAddedIndex];
		}
	}

	private swap(index1: number, index2: number): void {
		let temp = this.array[index1];
		this.array[index1] = this.array[index2];
		this.array[index2] = temp;
	}

	delete(): number {
		if (this.array.length === 0) {
			return -1;
		}
		this.swap(0, (this.index - 1))
		let element = this.array.pop()!;
		this.index--;
		this.length--;

		this.heapifyDown();

		return element;
	}

	private heapifyDown(): void {
		if (this.array.length <= 1) {
			return;
		}

		let parentIndex = 0;
		let leftIndex = (2 * parentIndex) + 1;
		let rightIndex = leftIndex + 1;

		let parent = this.array[parentIndex];
		let left = this.array[leftIndex];

		if (this.array[rightIndex] === undefined) {
			if (parent > left) {
				this.swap(parentIndex, leftIndex)
			}
			return;
		}

		let right = this.array[rightIndex];

		let swapIndex = left < right ? leftIndex : rightIndex

		while (parent > this.array[swapIndex]) {
			this.swap(parentIndex, swapIndex);

			parentIndex = swapIndex;
			leftIndex = (2 * parentIndex) + 1
			rightIndex = leftIndex + 1;


			parent = this.array[parentIndex];
			left = this.array[leftIndex];
			right = this.array[rightIndex];

			if (parent === undefined || left === undefined) { // if parent or left child is undefined there is no need to swap
				break;
			}

			if (right === undefined) { // if right is undefined then we compare the left with its parent usimg the MinHeap rule
				swapIndex = left < parent ? leftIndex : parentIndex
			}

			swapIndex = left < right ? leftIndex : rightIndex

		}



	}

	peek(): number {
		if (this.length === 0) {
			return -1;
		}

		return this.array[0];
	}

	size(): number {
		return this.length;
	}
}

let heap = new MinHeap();

heap.insert(15);
heap.insert(12);
heap.insert(10);
heap.insert(19);
heap.insert(17);
heap.insert(23);
heap.insert(18);
heap.insert(26);

console.log(heap.delete());


// console.log(heap.peek())
console.log(heap.size())


// console.log(5 > undefined!);
