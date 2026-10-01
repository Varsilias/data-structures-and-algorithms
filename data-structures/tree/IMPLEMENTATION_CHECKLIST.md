# Binary Search Tree Checklist

Implement these in all three languages:

- `length`
- `isEmpty`
- `insert`
- `contains`
- `min`
- `max`
- `remove`
- `inOrder`
- `preOrder`
- `postOrder`
- `levelOrder`
- `height`
- `clear`

Core invariants to preserve:

- left subtree values are less than the node
- right subtree values are greater than the node
- duplicates follow one documented rule
- `inOrder` returns sorted values
- removal handles leaf, one-child, and two-child nodes
- traversal methods do not mutate the tree

Test tiers:

- simple: inserts, contains, min, max, and traversals
- mildly absurd: removing leaf, one-child, two-child, and root nodes
- absurd: deterministic operation sequence checked against a sorted reference
