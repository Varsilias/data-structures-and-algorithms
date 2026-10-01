# Hash Map Checklist

Implement these in all three languages:

- constructor with configurable initial capacity
- `length`
- `capacity`
- `isEmpty`
- `set`
- `get`
- `has`
- `remove`
- `keys`
- `values`
- `entries`
- `clear`

Core invariants to preserve:

- size counts unique keys, not writes
- setting an existing key updates the value without increasing size
- collisions preserve every key-value pair in the bucket
- removal only deletes the requested key
- resizing rehashes every live entry
- load factor stays below the chosen threshold after growth

Test tiers:

- simple: insert, read, overwrite, remove, and missing keys
- mildly absurd: many collisions and resizes
- absurd: deterministic operations checked against the language map
