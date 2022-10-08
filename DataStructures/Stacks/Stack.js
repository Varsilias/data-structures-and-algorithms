class Node {
	constructor(value) {
		this.value = value;
		this.next = null
	}
}

class Stack {
	constructor() {
		this.length = 0
		this.head = null

	}

	push(value) {
		
		const node = new Node(value)
		this.length++
		
		if(!this.head) {
			node.next = this.head
			this.head = node
			return
		}

		// if there is a head and a tail we assign a node to the
		// tail
		node.next = this.head;
		this.head = node
		
	}

	pop() {
		let nodeToRemove = this.head
		this.length--
		if(!nodeToRemove) {
			return null
		}
		this.head = this.head.next
		return nodeToRemove.value
	}

	peek() {
		if(!this.head) {
			return null;
		}

		return this.head.value
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

const s = new Stack()
s.push(77)
s.push(50)
s.push(64)

console.log(s.pop())

let lastVal = s.peek()
// s.print()

console.log(lastVal)
console.log(s.length)