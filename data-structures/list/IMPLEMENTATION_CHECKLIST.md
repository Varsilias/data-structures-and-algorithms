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
Beautiful setup you have here. I have not implemented the list datastructure across all languages by myself, No AI used. It took a while as I expected. I will solve questions on it tomorrow.

    Add the setup for the next 2 data structures. I believe it should be stacks and queues, right? add their test suites too, it should follow the same structure as lists. The questions you choose for
    list, are you sure of them and what is the premise behind why you choose them?