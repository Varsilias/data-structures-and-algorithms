/*
	@author - Daniel Okoronkwo
		This is an implementation of a Queue Data Structure both from
		Scratch and using a DoublyLinkedList
*/

import DoublyLinkedList from "../LinkedLists/DoublyLinkedList.js"

class Node {
	constructor(value) {
		this.value = value
		this.next= null
	}
}

// Queue Implementation from Scratch
class Queue {
	constructor() {

		// **this.head** keeps track of the last element that 
		// was added to the queue
		this.head = null

		// **this.tail** keeps track of the next element to be dequeued
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
		console.log(`Length of Queue is: ${this.length}`)
	}
	
 }


// Queue Implementation using a DoublyLinkedList
class DllQueue {
	constructor() {
		this.linkedlist = new DoublyLinkedList()
	}

	enqueue(value) {
		return this.linkedlist.addLast(value)
	}

	dequeue() {
		return this.linkedlist.removeFirst()
	}

	peek() {
		return this.linkedlist.peek()
	}

	length() {
		return this.linkedlist.length
	}

	print() {
		let head = this.linkedlist.head;
		for(let i = 0; i < this.linkedlist.length; i++) {
			
			console.log(head.value)
			console.log(`Node ${head.value}'s next value: ${head?.next?.value}`)
			head = head.next
		}
		console.log(`Length of Queue is: ${this.linkedlist.length}`)
	}
}
// let q = new Queue()
let q = new DllQueue()

q.enqueue(77)
q.enqueue(10)
q.enqueue(25)
q.enqueue(53)
q.enqueue(82)
q.enqueue(64)

for (let i = 0; i < 4; i++) {
	console.log(q.peek())
	console.log(q.dequeue())

}

// console.log(q.dequeue())
// console.log(q.dequeue())
// console.log(q.dequeue())
// console.log(q.head)
// console.log(q.tail)

// q.print()