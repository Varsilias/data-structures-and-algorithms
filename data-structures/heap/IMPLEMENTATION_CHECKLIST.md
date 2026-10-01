# Binary Min Heap Checklist

Implement these in all three languages:

- `length`
- `isEmpty`
- `peek`
- `insert`
- `extract`
- `clear`
- `toArray`

Core invariants to preserve:

- parent value is less than or equal to child values
- root is always the minimum value
- insertion bubbles the new value upward when needed
- extraction replaces the root and bubbles downward
- array representation keeps the tree complete
- `toArray` exposes heap storage, not sorted order

Test tiers:

- simple: empty heap, insert, peek, and extract
- mildly absurd: repeated inserts and extracts
- absurd: deterministic workload checked against a sorted reference model
