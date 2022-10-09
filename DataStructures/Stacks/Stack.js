/*
	@author - Daniel Okoronkwo
		This is an implementation of a Stack Data Structure both from
		Scratch and using a DoublyLinkedList
*/

import DoublyLinkedList from "../LinkedLists/DoublyLinkedList.js"


class Node {
	constructor(value) {
		this.value = value;
		this.next = null
	}
}

// Stack Implemented from Scratch
class Stack {
	constructor() {
		this.length = 0
		this.head = null

	}

	push(value) {
		
		const node = new Node(value)
		this.length++

		// If there is no head we set the new node to be the head
		if(!this.head) {
			node.next = this.head
			this.head = node
			return
		}

		// if there is a head we point the new node's next pointer
		// to the current head and reassign head
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

/*
Stack Implemented with DoublyLinkedList
*/
class DllStack {
	constructor() {
		this.linkedlist = new DoublyLinkedList()
	}

	push(value) {
		return this.linkedlist.addFirst(value)
	}

	pop() {
		return this.linkedlist.removeLast()
	}

	peek() {
		return this.linkedlist.tail

	}

	length() {
		return this.linkedlist.length
	}
}

const s = new Stack()
s.push(77)
s.push(50)
s.push(64)

for (let i = 0; i < 3; i++) {
	console.log(s.peek())
	console.log(s.pop())

}
// console.log(s.pop())

// let lastVal = s.peek()
// // s.print()

// console.log(lastVal)
// console.log(s.length)