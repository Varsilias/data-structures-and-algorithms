# Ring Buffer Checklist

Implement these in all three languages:

- constructor with a fixed initial capacity
- `length`
- `capacity`
- `isEmpty`
- `isFull`
- `front`
- `rear`
- `enqueue`
- `dequeue`
- `clear`
- `toArray`

Core invariants to preserve:

- capacity is fixed for the lifetime of the buffer; it never grows
- `enqueue` on a full buffer fails (returns `false`) and leaves existing contents untouched
- `dequeue` on an empty buffer returns nothing without touching indices
- `front` and `rear` read the logical ends of the buffer, not raw backing-array slots
- index math wraps using modulo arithmetic against capacity — no shifting elements on dequeue
- `toArray` returns items in logical front-to-rear order regardless of where the backing array wraps

Test tiers:

- simple: correctness and edge cases, including rejection when full
- mildly absurd: long enqueue/dequeue waves that wrap the backing array many times over
- absurd: deterministic mixed operation sequence against a reference model (a capacity-capped array)

This is the shape LeetCode 622 (Design Circular Queue) asks for — `enqueue`/`dequeue` returning
success/failure maps to `enQueue`/`deQueue`, `front`/`rear` map directly, and `isFull`/`isEmpty`
are named the same.
