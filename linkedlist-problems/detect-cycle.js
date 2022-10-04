/*
Given the head of a linked list, return the node where the cycle begins. If there is no cycle, return null.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to (0-indexed). It is -1 if there is no cycle. Note that pos is not passed as a parameter.

Do not modify the linked list.
*/

/---------------------------------------------------/
/*
	SOLUTION
 - First verify that the linkedlist is a cycle by looping using
 	 the two pointer technique from the head of the list till the
	 two pointers meet, if they never meet return *NULL* since
	 the list is not cycle in the first place
	
 - If it is true that it is a cycle the slow pointer would be at
 	 at the back of the node that starts the cycle, we would then 
	 declare a new variable pointing to the head again and loop
	 through using while loop. 
	
	 provided that our new variable is 
	 not the same as the slow pointer(which should currently be at
	 a the back of the node that begins the cycle) we keep moving
	 until the while loop condition becomes true at this point the
	 we can return the new variable or the slow
*/

function detectCycle(head) {
	// Verify if List is a cycle
	let fast = head
	let slow = head
	let verified = false

	while (fast && fast.next) {
		fast = fast.next.next
		slow = slow.next

		if (fast === slow) {
			verified = true
			break
		}
	}
	// if Verified is still fasle then No Cycle is detected
	if (!verified) {
		return null
	}

	let start = head
	
	while (start !== slow) {
		start = start.next
		slow = slow.next
	}

	return slow
	
}

// Visual Representation of First Solution

// [3] -> [2] -> [0] -> [-4] -> points to node at position of index 1 to create a cycle

// - Step 1 => verify that list is a cycle
// fast(f) starts at head => [3]
// slow(s) starts at head => [3]

(loop)|	1							  | 2								 |			3
------|-----------------|------------------|------------------
(cpos)|	f = [0], s =[2] | f = [2], s = [0] | f = [-4], s = [-4]

// At this point slow is at [-4] which points directly to the node that begins that cycle if we could not verify this then the list is never a cycle and there is no need to proceed return **NULL**

// We then initialize another variable that points to the beginning of the list again and loop again, provided that the variable and the slow pointer are not the same yet we would keep walking the list until they both meet, wherever they meet is the beginning of the cycle

// start(st) starts at head = [3]
// slow(s) is currently at tail = [-4]

(loop)|	1							  | 2(condition fails)								 
------|-----------------|------------------|
(cpos)|	st = [2], s =[2] | return st or s 


function detectCycle(head) {
	let p1 = head; 
	let p2 = head;
	let lent = lenOfCycle(head)
	let node = isCycle(head)
	if (node === null) {
		return null
	}
	
	while (lent > 0) {
		p2 = p2.next
		lent--
	}

	while (p1 !== p2) {
		p1 = p1.next
		p2 = p2.next
	}

	return p1
}

function lenOfCycle(head) {
	let count = 0;
	let fast = head;
	let slow = head
	while (fast && fast.next) {
		fast = fast.next.next
		slow = slow.next
		count++
		
		if (fast === slow) {
			break
		}
	}
	

	return count
}
function isCycle(head) {
	let fast = head;
	let slow = head;

	
	while (fast && fast.next) {
		fast = fast.next.next
		slow = slow.next

		if(fast === slow) {
			return fast;
		}
	}

	return null
}