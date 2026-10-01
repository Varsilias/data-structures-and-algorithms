# Trie Checklist

Implement these in all three languages:

- `size`
- `isEmpty`
- `insert`
- `contains`
- `startsWith`
- `remove`
- `wordsWithPrefix`
- `clear`

Core invariants to preserve:

- size counts complete words, not nodes
- shared prefixes are stored once
- inserting an existing word does not increase size
- removing a word does not remove another word's prefix path
- prefix lookup distinguishes complete words from prefixes
- words with prefix are returned in deterministic order

Test tiers:

- simple: insert, exact search, prefix search, and duplicate insert
- mildly absurd: removing words that share prefixes
- absurd: prefix queries checked against a sorted string reference
