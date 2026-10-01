# Linked List Checklist

Implement these in all three languages:

- `length`
- `isEmpty`
- `head`
- `tail`
- `get`
- `append`
- `prepend`
- `insert`
- `removeAt`
- `remove`
- `contains`
- `indexOf`
- `reverse`
- `clear`
- `toArray`

Core invariants to preserve:

- size is never negative
- head points at the first node or is empty
- tail points at the last node or is empty
- insertion preserves existing order around the new node
- removal reconnects neighboring nodes correctly
- reverse updates both head and tail

Test tiers:

- simple: empty list, append, prepend, get, and boundary inserts
- mildly absurd: repeated front and back operations with removals
- absurd: deterministic mixed operations checked against an array model
