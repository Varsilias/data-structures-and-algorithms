import SLL from "../DataStructures/LinkedLists/SinglyLinkedList.js"


// Solution using a stack
// add the content of the linkedlist to a stack
// Using a loop keep popping from the stack and compare it against
// the original list. If at any point the value of the popped item from
// the stack and the value at each node are not the same, the list is 
// not a PALINDROME
// Complexity: Time O(n), Space O(n)
function isPalindrome(head) {
	let list = head;
	let stack = [];

	while(head !== null) {
		stack.push(head.value)
		head = head.next
	}

	while (stack.length !== 0) {
		let item = stack.pop();
		if (item !== list.value) {
			return false
		}
		list = list.next
	}

	return true
}


// Solution using TWO POINTERS
// Use the two pointer(fast & slow) technique to walk through the list
// while the fast & fast.next is not NULL. reverse the list that the slow 
// pointer points to now **but making sure to break that link it has with the previous nodes**
// E.G 1->3->6->3->1 if fast is at NULL or the fast.next is NULL, slow 
// would be at node => 6, reversing the list that the slow pointer points
// to would give 1->3->6<-3<-1. Overall to account for breaking the link we would all together have a list that has the following structure
// 1->3->6->3->1
// slow before reversal 6->3->1
// slow after reversal null<-6<-3<-1: we

function isPalindrome(head) {
	let fast = head;
	let slow = head;
	let prev;
	let temp;

	while (fast && fast.next) {
		fast = fast.next.next;
		slow = slow.next;
	}

	prev = slow;
	slow = slow.next;
	prev.next = null;

	while (slow) {
		temp = slow.next;
		slow.next = prev;
		prev = slow
		slow = temp
	}

	fast = head
	slow = prev

	while (slow) {
		if (slow.value !== fast.value) {
			return false;
		}

		slow = slow.next
		fast = fast.next
	}

	return true
	
}


let list = new SLL();
let list1 = new SLL()

let data = [1, 2, 2, 1];
let head = [1,2]

for (let i = 0; i < data.length; i++) {
	list.addAtTail(data[i]);
}

for (let i = 0; i < head.length; i++) {
	list1.addAtTail(head[i]);
}

// console.log(isPalindrome(list.head))
console.log(isPalindrome(list1.head))