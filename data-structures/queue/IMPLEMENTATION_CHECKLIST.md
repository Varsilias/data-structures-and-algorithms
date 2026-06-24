# Queue Checklist

Implement these in all three languages:

- constructor with configurable initial capacity
- `length`
- `capacity`
- `isEmpty`
- `peek`
- `enqueue`
- `dequeue`
- `clear`
- `toArray`

Core invariants to preserve:

- size is never negative
- `peek` and `dequeue` read from the current front only
- enqueue preserves FIFO order
- removal never reorders survivors
- growth happens before writing past capacity
- `toArray` returns items from front to back

Test tiers:

- simple: correctness and edge cases
- mildly absurd: wraparound-style workloads and long enqueue-dequeue waves
- absurd: deterministic mixed operation sequence against a reference model
