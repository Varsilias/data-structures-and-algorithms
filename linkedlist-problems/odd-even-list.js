// Given the head of a singly linked list, group all the nodes with odd indices together followed by the nodes with even indices, and return the reordered list.

// The first node is considered odd, and the second node is even, and so on.

// Note that the relative order inside both the even and odd groups should remain as it was in the input.

// You must solve the problem in O(1) extra space complexity and O(n) time complexity.

import SLL from "../DataStructures/LinkedLists/SinglyLinkedList.js"


class ListNode {
	constructor(value, next) {
		this.val = (value === undefined ? 0 : val)
 		this.next = (next === undefined ? null : next)
	}
}

// Approach One
function oddEvenList(head) {
	if(head === null) return head;

	let odd = head;
	let even = head.next

	let newNode = new ListNode();
	newNode.next = head

	let newNode1 = new ListNode();
	newNode.next = head.next

	let prevOdd = newNode;
	let prevEven = newNode1;

	let n = 0

	// count the number of nodes available (n)
	while (head) {
		n++
		head = head.next
	}

 	// walk through the list in n/2 Math.round() takes care of floating
	// point number
	for (let i = 0; i < Math.round(n/2); i++) {
		// console.log(odd.value, even?.value)
		prevOdd.next = odd;
		prevEven.next = even

		prevOdd = prevOdd.next;
		prevEven = prevEven.next
		odd = odd?.next?.next;
		even = even?.next?.next;

		if (!even?.value) {
			prevOdd.next = newNode1.next		
		}
	}

	// for visualization
	// while (newNode) {
	// 	console.log(newNode.value)
	// 	newNode = newNode.next
	// }
	
	return newNode.next
}

// Approach Two
function oddEvenList(head) {
	if(head === null) return head;

	let odd = head;
	let even = head.next

	let newNode = new ListNode();
	newNode.next = head

	let newNode1 = new ListNode();
	newNode.next = head.next

	let prevOdd = newNode;
	let prevEven = newNode1;
	

	while (odd) {
		
		prevOdd.next = odd;
		prevEven.next = even
		prevOdd = prevOdd.next;
		prevEven = prevEven.next
		odd = odd.next?.next;
		even = even?.next?.next;

		if (!even?.value) {
			prevOdd.next = newNode1.next		
		}
	}

	// for visualization
	// while (newNode) {
	// 	console.log(newNode.value)
	// 	newNode = newNode.next
	// }
	

	return newNode.next
}

let list = new SLL();
let list1 = new SLL()

let data = [2,1,3,5,6,4,7];
let head = [1,2,3,4,5]

for (let i = 0; i < data.length; i++) {
	list.addAtTail(data[i]);
}

for (let i = 0; i < head.length; i++) {
	list1.addAtTail(head[i]);
}

console.log(oddEvenList(list.head))
// console.log(oddEvenList(list1.head))