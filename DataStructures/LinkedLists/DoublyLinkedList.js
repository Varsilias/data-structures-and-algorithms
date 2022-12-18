/*
	@author - Daniel Okoronkwo
		This is an implementation of 0-indexed based
	DoublyLinkedList Feel free to play around with the
		implementation as well as the code
*/

class Node {
	constructor(value) {
		this.value = value;
		this.next = null;
		this.prev = null;
	}
}

class DoublyLinkedList {
	constructor() {
		this.length = 0;
		this.head = null;
		this.tail = null;
	}

	addFirst(value) {
		this.addAtPositon(0, value)
	}

	addLast(value) {
		this.addAtPositon(this.length, value)
	}

	addAtPositon(index, value) {
		if (index > this.length || index < 0) {
			throw new Error("No such index")
		}

		let node = new Node(value);

		this.length++

		if (index === 0) {
			// If we are adding at head but there is no head at
			// the moment
			if (!this.head) {
				node.next = this.tail
				node.prev = this.head
				this.tail = node
				this.head = node;
			} else {

				this.head.prev = node
				node.next = this.head
				this.head = node
			}
			return
		}
		let head = this.head
		for (let i = 0; i < index - 1; i++) {
			head = head.next
		}


		let ref = head.next;
		// if ref is undefined or null we can assume that
		// we are at the end of the list
		if (!ref) {
			node.next = ref
			node.prev = head
			head.next = node
			this.tail = node
		} else {
			ref.prev = node
			node.next = ref
			node.prev = head

			head.next = node
		}

	}

	removeFirst() {

		let head = this.head;

		if (!head) {
			throw new Error("List is empty")
		}

		// if the head is the only element
		if (head.next === null) {
			this.head = null;
			this.tail = null;
			this.length--
			return head.value
		}

		let nextHead = head.next;
		nextHead.prev = head.prev;
		this.head = nextHead

		this.length--

		return head.value

	}

	removeLast() {
		let tail = this.tail;
		if (!tail) {
			throw new Error("List is empty")
		}

		// if the tail is the only element
		if (tail.prev === null) {
			this.head = null;
			this.tail = null;
			this.length--
			return tail.value
		}

		let nextTail = this.tail.prev;
		nextTail.next = this.tail.next
		this.tail = nextTail
		this.length--

		return tail.value
	}

	removeAtPostion(index) {
		if (index >= this.length || index < 0) {
			throw new Error("No such index")
		}

		if (index === 0) {
			return this.removeFirst()
		}

		if (index === this.length - 1) {
			return this.removeLast()
		}

		let head = this.head;

		for (let i = 0; i < index - 1; i++) {
			head = head.next
		}

		let ref = head.next;
		let nextRef = ref.next;
		nextRef.prev = head
		head.next = nextRef
		this.length--;
		return ref.value

	}

	peek() {
		if (!this.head) {
			return null
		}

		return this.head.value
	}

	printValues() {
		let head = this.head;
		for (let i = 0; i < this.length; i++) {
			console.log(head.prev?.value) // prints curr's value prev value
			console.log(head.value); // prints current Value
			console.log(head.next?.value) // prints curr's value next value
			head = head.next
		}

		console.log(`length of list: ${this.length}`)
	}
}

// let dll = new DoublyLinkedList();

// dll.addFirst(5)
// dll.addFirst(100)
// dll.addFirst(32)
// dll.addAtPositon(2, 456)
// dll.addLast(2000)

// console.log(dll.removeAtPostion(3))
// console.log(dll.removeAtPostion(3))


// console.log(dll.removeAtPostion(1))
// console.log(dll.removeFirst())

// console.log(dll.peek())
// console.log(dll.tail)
// console.log(dll.head)
// dll.printValues()

export default DoublyLinkedList