// Given the head of a singly linked list, reverse the list, and return the reversed list.

import SLL from "../DataStructures/LinkedLists/SinglyLinkedList.js"

let curr = head;
	let prev = null;
	
	while (curr) {		
		// keep a reference to our current node's next node
        // you should know that this variable does not just store a reference to the next node
        // it also store a reference to the remaining part of the list that is yet to be reversed
        // this information would help if you try to visualize this solution using an illustration
        // or on paper
		let nextNode = curr.next;		
		
		// update our current node's next pointer to be the prev
		curr.next = prev

		// set prev to our current node
		prev = curr
		
		//set current node to be our initial current node's next node
		curr = nextNode



		
	}
	return prev
}

let list = new SLL()

let head = [1,2,3,4,5]
for (let i = 0; i < head.length; i++) {
	list.addAtTail(head[i])
}
reverseLinkedList(list.head)
// console.log(reverseLinkedList(list.head))
// console.log(list)