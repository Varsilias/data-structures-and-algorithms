// Given the head of a linked list, remove the nth node from the end of the list and return its head.

// Input: head = [1,2,3,4,5], n = 2
// Output: [1,2,3,5]


function removeNthNode(head, n) {
	let c = 0
    let h = head
    
    if(!h.next) {
        h = head.next
        return h
    }
    
    while(h) {
        c++
        h = h.next;
    }
    
    
    
    let indexToRemove = c - n
    
    if(indexToRemove === 0) {
        h = head.next
        return h
    }
    
    let curr = head
    let prev;
    
    for(let i = 0; i < indexToRemove; i++) {
        prev = curr;
        curr = curr.next;
    }
    
    prev.next = curr.next
    return head
    
}

function removeNthNodeFromList(head, n) {
	function removeNthNode(head, n) {
	let fast = head;
	let slow = head;

	for (let i = 0; i < n; i++) {
		fast = fast.next;
	}

	if (!fast) {
		return head.next
	}

	while (fast.next) {
		fast = fast.next;
		slow = slow.next;
	}

	slow = slow.next.next;
	return head
}