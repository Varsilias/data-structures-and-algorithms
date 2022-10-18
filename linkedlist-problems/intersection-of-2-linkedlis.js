// Given the heads of two singly linked-lists headA and headB, return the node at which the two lists intersect. If the two linked lists have no intersection at all, return null.

var getIntersectionNode = function(headA, headB) {
	if (headA === null || headB == null) {
		return null;
	}
	let pA = headA;
	let pB = headB;


	while (pA !== pB) {
		pA = (pA === null) ? headB : pA.next;
		pB = (pB === null) ? headA : pB.next;
	}


	console.log(pA, pB)
	return pA;
};
