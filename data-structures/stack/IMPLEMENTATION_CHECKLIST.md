# Stack Checklist

Implement these in all three languages:

- constructor with configurable initial capacity
- `length`
- `capacity`
- `isEmpty`
- `peek`
- `push`
- `pop`
- `clear`
- `toArray`

Core invariants to preserve:

- size is never negative
- `peek` and `pop` read from the current top only
- push preserves LIFO order
- growth happens before writing past capacity
- `toArray` returns items from bottom to top

Test tiers:

- simple: correctness and edge cases
- mildly absurd: repeated growth and long push-pop waves
- absurd: deterministic mixed operation sequence against a reference model
