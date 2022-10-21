
// Given the head of a linked list and an integer val, remove all the nodes of the linked list that has Node.val == val, and return the new head.



import SLL from "../DataStructures/LinkedLists/SinglyLinkedList.js"

class ListNode {
	constructor(value, next) {
		this.val = (value === undefined ? 0 : val)
 		this.next = (next === undefined ? null : next)
	}
}
function removeElements(head, val) {

	// set a new dummy node that points to the head
	let newNode = new ListNode();
	newNode.next = head
	let start = head;
	let prev = newNode;	

	// start the traversal and removal using the condition stated in the problem
	while (start) {
		if (start.value === val) {					
			prev.next = start.next	
		} else {
			prev = start
		}

	}

	// by the end, we should be done remove the "unwanted" nodes in memory
	// the dummy node still points to the same list but a modified version
	// of the list. We then return the dummy node's next pointer
	return newNode.next}

let list = new SLL();
let list1 = new SLL()

let data = [1,2,6,3,4,5,6];
let head = [7,7,7,7]

for (let i = 0; i < data.length; i++) {
	list.addAtTail(data[i]);
}

for (let i = 0; i < head.length; i++) {
	list1.addAtTail(head[i]);
}

// console.log(list1.head, list)

console.log(removeElements(list.head, 6))
// console.log(removeElements(list1.head, 7))

