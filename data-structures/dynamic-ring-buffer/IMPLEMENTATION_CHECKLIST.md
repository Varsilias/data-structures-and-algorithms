# Dynamic Ring Buffer Checklist

Implement these in all three languages:

- constructor with a configurable initial capacity
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

- `enqueue` always succeeds — growth happens before writing past capacity instead of rejecting
- index math wraps using modulo arithmetic against capacity — no shifting elements on dequeue
- growth must re-linearize the logical order starting from the current front, not just copy the
  raw backing array — a buffer that was already wrapped when it grows is the case that breaks a
  naive resize
- `front` and `rear` read the logical ends of the buffer, not raw backing-array slots
- `toArray` returns items in logical front-to-rear order regardless of where the backing array
  wraps or how many times it has grown

Test tiers:

- simple: correctness and edge cases
- mildly absurd: growth triggered while the buffer is mid-wraparound (the case a naive resize gets wrong)
- absurd: deterministic mixed operation sequence against a reference model

Contrast with `ring-buffer`: same circular-index technique, opposite capacity-management strategy
(reject when full vs. grow when full).
