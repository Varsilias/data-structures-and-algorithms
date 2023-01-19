class ListNode {
  public key: number;
  public val: number;
  public prev: ListNode;
  public next: ListNode;

  constructor(key: number, val: number) {
    this.key = key;
    this.val = val;
  }
};

class LRUCache {
  private cache = {};
  private capacity: number;
  private head: ListNode;
  private tail: ListNode;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.head = new ListNode(0, 0);
    this.tail = new ListNode(0, 0);

    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  get(key: number): number {
    let node = this.cache[key] as ListNode;
    if (!node) return -1;

    // 0 <-> 4 <-> 3 <-> 0

    // remove the node that was accessed from the linkedlist
    let prev = node.prev; // 0->4->3
    let next = node.next; // 3<-0

    next.prev = prev;
    prev.next = next;

    // add the node that was accessed back to the linkedlist but this time in the front
    this.addMru(node);

    return node.val;
  }

  put(key: number, value: number): void {
    // 0 <-> 1 <-> 0

    let entry = this.cache[key] as ListNode;

    if(entry) {
      entry.val = value;

      // remove the node that was accessed from the linkedlist
      let prev = entry.prev; // 0->4->3
      let next = entry.next; // 3<-0

      next.prev = prev;
      prev.next = next;
      this.addMru(entry);
      return;
    }

      if (Object.keys(this.cache).length >= this.capacity) {
        this.removeLru();
      }

      let node = new ListNode(key, value);

      this.addMru(node);

      this.cache[key] = node;
    

    
  }

  private removeLru() {
    let lru = this.tail.prev;
    let nxtLru = lru.prev;

    this.tail.prev = nxtLru;
    nxtLru.next = this.tail;

    delete this.cache[lru.key];
  }

  private addMru(node: ListNode) {
    let next = this.head.next; // keep a ref of the head's next node ( this could be the TAIL at first or another VALUE in our CACHE)
    next.prev = node; // make the ref's prev value point to the new node
    this.head.next = node; // make the head's next value point to our new node

    node.next = next;
    node.prev = this.head;
  }

  printCache() {
    console.log(this.head);
    // console.log(this.cache);
  }
}

let lRUCache = new LRUCache(2);

lRUCache.put(2, 1); // cache is {1=1}
lRUCache.put(1, 1); // cache is {1=1, 2=2}
lRUCache.put(2, 3); // cache is {1=1, 2=2}
lRUCache.put(4, 1); // cache is {1=1, 2=2}

// lRUCache.printCache()

console.log(lRUCache.get(1));
console.log(lRUCache.get(2));
// console.log(lRUCache.get(2));

lRUCache.printCache();

