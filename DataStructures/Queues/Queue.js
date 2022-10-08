class Node {
	constructor(value) {
		this.value = value
		this.next= null
	}
}

class Queue {
	constructor() {
		this.head = null
		this.tail = null
		this.length = 0
	}

	enqueue(value) {
		const node = new Node(value)
		this.length++
		if (!this.head) {
			node.next = this.head
			this.head = node
			this.tail = node
			return;
		}

		node.next = this.head
		this.head = node
	}

	dequeue() {
		let head = this.head
		this.length--

		if (!this.head) {
			return null;
		}
		if (this.head === this.tail) {
			let nodeToRemove = this.head
			this.head = null
			this.tail = null
			return nodeToRemove.value
		}

		for (let i = 0; i < this.length - 1; i++) {
			head = head.next
		}

		let currTail = head.next;
		head.next = currTail.next
		this.tail = head
		// console.log(this.tail)
		return currTail.value
	}

	peek() {
		// if no head it also means no tail
		// we could as well specifcally check for the presence of tail
		// instead of head
		if (!this.head) {
			return null;
		}
		return this.tail.value
	}

	print() {
		let head = this.head;
		for(let i = 0; i < this.length; i++) {
			
			console.log(head.value)
			console.log(`Node ${head.value}'s next value: ${head?.next?.value}`)
			head = head.next
		}
		console.log(`Length of Stack is: ${this.length}`)
	}
	
 }


let q = new Queue()

q.enqueue(77)
q.enqueue(10)
q.enqueue(25)
q.enqueue(53)
q.enqueue(82)
q.enqueue(64)

// for (let i = 0; i < 4; i++) {
// 	console.log(q.peek())
// 	console.log(q.dequeue())

// }

// console.log(q.dequeue())
// console.log(q.dequeue())
// console.log(q.dequeue())
// console.log(q.head)
// console.log(q.tail)

q.print()