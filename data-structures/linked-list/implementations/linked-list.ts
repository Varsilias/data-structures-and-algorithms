import { LinkedList } from "../interfaces/linked-list";

type Node<T> = {
  value: T,
  next: Node<T> | undefined
  prev: Node<T> | undefined,
}

export class MyLinkedList<T> implements LinkedList<T> {
  private front: Node<T> | undefined
  private back: Node<T> | undefined
  private currentLength: number;

  constructor() {
    this.currentLength = 0
    this.front = undefined;
    this.back = undefined;
  }

  public length(): number {
    return this.currentLength;
  }

  public isEmpty(): boolean {
    return this.length() === 0;
  }

  public head(): T | undefined {
    return this.front?.value;
  }

  public tail(): T | undefined {
    return this.back?.value;
  }

  public get(_index: number): T | undefined {
    const n = this.length()
    if(n <= 0 || n < _index) return undefined;


    let head = this.front
    for(let i = 0; i < _index; i++) {
      head = head?.next
    }
    return head?.value;
  }

  public append(_value: T): void {
    const node = { value: _value } as Node<T>
    if(!this.front) {
      this.front = node;
      this.back = node;
      this.currentLength++
      return
    };

    node.prev = this.back
    if(this.back) {
      this.back.next = node;
      this.back = node
    }
    this.currentLength++
  }

  public prepend(_value: T): void {
    const n = this.length()
    const node = { value: _value } as Node<T>
    if(n <= 0) {
      this.front = this.back = node;
      this.back.prev = this.front;
    };

    node.next = this.front
    if(this.front) {
      this.front.prev = node
      this.front = node
    }
    
    this.currentLength++
  }

  public insert(_index: number, _value: T): void {
    const n = this.length()
    const node = { value: _value } as Node<T>

    if(n <= 0) return this.append(_value);
    if(_index === 0) return this.prepend(_value);

    let head = this.front
    for(let i = 0; i < _index - 1; i++) {
      head = head?.next
    }

    // early return, no need manipulating non-existing node pointers
    if(!head) return

    const nextNode = head.next // c
    head.next = node
    node.prev = head
    node.next = nextNode
    if (nextNode) {
      nextNode.prev = node
    }
    
    this.currentLength++
  }

  public removeAt(_index: number): T | undefined {
    const n = this.length()
    if(n <= 0 || n < _index) return undefined;
    
    let head = this.front
    for(let i = 0; i < _index; i++) {
      head = head?.next
    }

    // early return, no need manipulating non-existing node pointers
    if(!head) return

    const nextNode = head.next
    const prevNode = head.prev

    if(nextNode){
      nextNode.prev = prevNode
    }

    if(prevNode) {
      prevNode.next = nextNode
    }
    this.currentLength--
    return head.value
  }

  public remove(_value: T): boolean {
    const exists = this.contains(_value)
    if(!exists) return exists;

    let head = this.front
    while(head) {
      if(head.value === _value) break;
      head = head.next
    }


    // early return, no need manipulating non-existing node pointers
    if(!head) return false

    const nextNode = head.next
    const prevNode = head.prev

    if(nextNode) {
      nextNode.prev = prevNode
    }

    if(prevNode) {
      prevNode.next = nextNode
    }
    this.currentLength--
    return true
  }

  public contains(_value: T): boolean {
    const n = this.length()
    if(n <= 0) return false;

    let head = this.front
    while(head) {
      if(head.value === _value) break;
      head = head.next
    }

    if(!head) return false;

    return true
  }

  public indexOf(_value: T): number {
    let index = -1
    const n = this.length()
    if(n <= 0) return index;

    let head = this.front
    while(head) {
      index++
      if(head.value === _value) break;
      head = head.next
    }

    if(!head) return -1;

    return index;
  }

  public reverse(): void {
    if(!this.front || this.front === this.back) return;

    let current: Node<T> | undefined = this.front
    let temp: Node<T> | undefined = undefined

    while(current) {
      temp = current.prev
      current.prev = current.next
      current.next = temp

      current = current.prev
    }

    temp = this.front
    this.front = this.back
    this.back = temp
  }

  public clear(): void {
    this.currentLength = 0;
    this.front = undefined
    this.back = undefined
  }

  public toArray(): T[] {
    const arr: T[] = []
    
    let head = this.front
    while(head) {
      arr.push(head.value)
      head = head.next
    }

    return arr
  }
}

// const list = new MyLinkedList<string>();

// list.append("a");
// list.append("c");
// list.insert(1, "b");
// list.insert(3, "d");

// console.dir(list, { depth: null, color: true })
// console.dir(list.toArray())

// console.log(list.get(2), "c");
// console.log(list.removeAt(1), "b");
// console.log(list.toArray(), ["a", "c", "d"])

// const list = new MyLinkedList<number>();

//   for (let value = 1; value <= 6; value += 1) {
//     list.append(value);
//   }

//   console.log(list.toArray())
//   console.log(list.remove(3), true);
//   console.log(list.remove(42), false);
//     console.log(list.toArray())

//   list.reverse();


//   console.log(list.toArray(), [6, 5, 4, 2, 1]);
//   console.log(list.indexOf(4), 2);
//   console.log(list.contains(3), false);