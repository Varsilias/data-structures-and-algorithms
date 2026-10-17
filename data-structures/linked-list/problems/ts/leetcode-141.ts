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

function hasCycle(head: ListNode | null): boolean {
    let fast = head;
    let slow = head;
    let isCycle = false

    while(fast !== null && fast.next !== null) {
        fast = fast.next.next;
        slow = slow!.next;

        if(fast === slow) {
            isCycle = true
            break
        }
    }

    return isCycle;
};