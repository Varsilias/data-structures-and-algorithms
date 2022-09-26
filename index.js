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
