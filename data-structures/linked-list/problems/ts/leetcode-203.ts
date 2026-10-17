/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */
class ListNode {
    val: number;
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next)
    }
}


function removeElements(head: ListNode | null, val: number): ListNode | null {
    const result = new ListNode();
    let current = result;

    while(head != null) {
        if(head.val != val) {
            current.next = head
            current = current.next;
        }
        head = head.next
    }

    if(current.next != null && current.next.val == val) {
        current.next = null
    }
    return result.next
};