/*
Given head, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.

Return true if there is a cycle in the linked list. Otherwise, return false.
*/

import MyLinkedList from "./DataStructures/LinkedList.js"

function hasCycle(head) {
	let fast = head
	let slow = head


	while(fast && fast.next) {
		fast = fast.next.next
		slow = slow.next

		if(fast === slow) {
			return true
		}
	}

	return false
}

const list = new MyLinkedList()
list.addAtHead(-4)
list.addAtHead(0)
list.addAtHead(2)
list.addAtHead(3)



// list.print()
console.log(hasCycle(list.head)) // pos = 1 return true
// console.log(hasCycle([1,2])) // pos = 0 return true
