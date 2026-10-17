package problems

/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */

type ListNode struct {
	Val  int
	Next *ListNode
}

func newListNode() *ListNode {
	return &ListNode{}
}

func reverseList(head *ListNode) *ListNode {
	current := head
	var prev *ListNode = nil

	for current != nil {
		tmp := current.Next
		current.Next = prev

		prev = current
		current = tmp
	}

	return prev
}
