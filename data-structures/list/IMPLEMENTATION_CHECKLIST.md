# ArrayList Checklist

Implement these in all three languages:

- constructor with configurable initial capacity
- `length`
- `capacity`
- `isEmpty`
- `get`
- `set`
- `append`
- `prepend`
- `insert`
- `removeAt`
- `remove`
- `contains`
- `indexOf`
- `clear`
- `toArray`

Core invariants to preserve:

- size is never negative
- valid indexes are enforced
- insertion preserves order
- removal shifts trailing elements left
- growth happens before writing past capacity
- `toArray` returns only live elements

Test tiers:

- simple: correctness and edge cases
- mildly absurd: repeated growth, front inserts, alternating removals
- absurd: long deterministic operation sequences checked against a reference model