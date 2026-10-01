# DSA Wake-Up Loop

Current tracks:
- `list` using an `ArrayList`
- `stack` using an array-backed `Stack`
- `queue` using an array-backed `Queue`
- `ring-buffer` using a fixed-capacity circular buffer (rejects `enqueue` when full — LeetCode 622's contract)
- `dynamic-ring-buffer` using a circular buffer that grows when full instead of rejecting
- `linked-list` using a singly linked list
- `hash-map` using separate chaining
- `tree` using a binary search tree
- `heap` using a binary min heap
- `graph` using an adjacency list
- `trie` using prefix nodes

Daily loop:
1. Run `make doctor`.
2. Open the same method in all three languages and implement it end-to-end.
3. Run `make <track>-test`.
4. When the suite passes, solve one problem from `make <track>-problems`.
5. Mark the win in your own notes before stopping.

Completion rule per track:
- finish the implementation in all three languages
- get that track's `make ...-test` command green
- solve 10 focused problems: 5 easy, 3 medium, 2 hard

Suggested order after `dynamic-ring-buffer`:
- `linked-list`
- `hash-map`
- `tree`
- `heap`
- `graph`
- `trie`

Momentum rules:
- Never end a session on a red test without writing down the next bug.
- If focus is bad, implement exactly one method and stop negotiating with yourself.
- Use the same commands every day so your brain only has one job: code.
