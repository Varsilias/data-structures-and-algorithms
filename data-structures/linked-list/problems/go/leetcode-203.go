package problems

/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func removeElements(head *ListNode, val int) *ListNode {
	result := newListNode()
	current := result

	for head != nil {
		if head.Val != val {
			current.Next = head
			current = current.Next
		}

		head = head.Next
	}

	if current.Next != nil && current.Next.Val == val {
		current.Next = nil
	}

	return result.Next
}
