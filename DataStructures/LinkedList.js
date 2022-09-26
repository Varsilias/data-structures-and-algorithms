export class Node {
	constructor(value) {
		this.value = value
		this.next = null
	}
}


class MyLinkedList {
	constructor() {
		this.length = 0
		this.head = null
	}

	/** 
	 * @param {number} index
	 * @return {number}
	 */
	get(index) {
		if (index >= this.length || index < 0) {
			return -1;
		}

		let head = this.head
		for (let i = 0; i < index; i++) {
			head = head.next
		}

		return head?.value

	}
	/** 
	 * @param {number} val
	 * @return {void}
	 */
	addAtHead(value) {
		this.addAtIndex(0, value)
	}

	/** 
	 * @param {number} val
	 * @return {void}
	 */
	addAtTail(value) {
		this.addAtIndex(this.length, value)
	}
	/** 
	 * @param {number} index 
	 * @param {number} val
	 * @return {void}
	 */
	addAtIndex(index, value) {
		if (index > this.length || index < 0) {
			return;
		}
		const node = new Node(value)
		this.length++


		if (index === 0) {
			node.next = this.head
			this.head = node
		} else {
			let head = this.head
			for (let i = 0; i < index - 1; i++) {
				head = head.next
			}

			node.next = head.next
			head.next = node
		}

	}


	/** 
	 * @param {number} index
	 * @return {void}
	 */
	deleteAtIndex(index) {
		if (index >= this.length || index < 0) {
			return;
		}


		if (index === 0) {
			this.head = this.head.next
		} else {
			let item = this.head

			for (let i = 0; i < index - 1; i++) {
				item = item.next
			}
			item.next = item.next?.next ?? null
		}

		this.length--

	}

	print() {
			let head = this.head
			for (let i = 0; i < this.length; i++) {
				console.log(head.value)
				head = head.next
			}
	}
}



/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */

// var obj = new MyLinkedList();
// obj.addAtHead(3)
// obj.addAtHead(9)
// obj.addAtHead(5)
// obj.addAtHead(500)

// obj.addAtIndex(2, 1000)
// obj.addAtIndex(4, 20)
// // 500, 5, 1000, 9, 20, 3
// // 0    1    2   3  4   5

// obj.addAtTail(800)
// obj.addAtTail(732)
// obj.addAtTail(62)
// // obj.deleteAtIndex(0)
// // obj.deleteAtIndex(0)

// console.log(obj.get(0))
// console.log(obj.get(1))
// console.log(obj.get(2))
// console.log(obj.get(3))
// console.log(obj.get(4))
// console.log(obj.get(5))
// console.log(obj.get(6))
// console.log(obj.get(7))
// console.log(obj.get(8))

// obj.addAtHead(2)
// obj.deleteAtIndex(1)
// obj.addAtHead(2)
// obj.addAtHead(7)
// obj.addAtHead(3)
// obj.addAtHead(2)
// obj.addAtHead(5)


// obj.addAtTail(5)
// console.log(obj.get(0))
// console.log(obj.get(1))
// console.log(obj.get(2))
// console.log(obj.get(3))
// console.log(obj.get(4))
// console.log(obj.get(5))
// console.log(obj.get(6))


// console.log(obj.get(2))
// console.log(obj.get(3))
// console.log(obj.get(4))
// console.log(obj.get(5))
// console.log(obj.get(6))
// obj.deleteAtIndex(6)
// obj.deleteAtIndex(4)



// console.log(obj.get(0))
// console.log(obj.get(1))
// console.log(obj.get(2))

// obj.addAtHead(1)
// obj.addAtTail(3)
// obj.addAtIndex(1, 2)

// console.log(obj.get(0))
// console.log(obj.get(1))
// console.log(obj.get(2))


export default MyLinkedList