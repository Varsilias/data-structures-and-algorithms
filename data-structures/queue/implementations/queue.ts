import { Queue } from "../interfaces/queue";


export class MyQueue<T> implements Queue<T> {
  private readonly initialCapacity: number;
  private currentCapacity: number;
  private container: Array<T>
  private front: number;
  private back: number;
  private currentLength: number


  public constructor(initialCapacity = 4) {
    if (initialCapacity <= 0) {
      throw new Error("initialCapacity must be greater than zero");
    }

    this.initialCapacity = initialCapacity;
    this.currentCapacity = initialCapacity;
    this.container = new Array(initialCapacity)
    this.front = 0
    this.back = 0
    this.currentLength = 0;
  }

  public length(): number {
    return this.currentLength;
  }

  public capacity(): number {
    return this.currentCapacity
  }

  public isEmpty(): boolean {
    return this.length() <= 0;
  }

  public peek(): T | undefined {
   return this.container[this.front]
  }

  public enqueue(_value: T): void {
    this.ensureCapacity();
    this.container[this.back] = _value

    this.back++
    this.currentLength++
  }

  public dequeue(): T | undefined {
    if(this.isEmpty()) return undefined;
    const node = this.container[this.front];

    for(let i = 1; i < this.length(); i++) {
      this.container[i-1] = this.container[i];
    }
    delete this.container[this.currentLength-1];
    this.currentLength--
    this.back--
    return node
  }

  public clear(): void {
    this.container = new Array(this.initialCapacity);
    this.currentLength = 0
  }

  public toArray(): T[] {
    const result: T[] = []

    for(const v of this.container) {
      if(v && v !== undefined) {
        result.push(v)
      }
    }

    return result
  }


  private isFull() {
    return this.capacity() === this.length()
  }

  private ensureCapacity() {

    if(!this.isFull()) {
      return
    }

    const newCapacity = this.length() * 2;
    const newContainer = new Array(newCapacity);


    for(let i = 0; i < this.length(); i++) {
      newContainer[i] = this.container[i]
    }

    this.container = newContainer
    this.currentCapacity = newCapacity
  }

  protected getInitialCapacity(): number {
    return this.initialCapacity;
  }
}

const queue = new MyQueue<number>(2)
queue.enqueue(1);
queue.enqueue(2);
queue.dequeue();
queue.enqueue(3);
queue.enqueue(4);
queue.dequeue();
queue.enqueue(5);



console.log("queue", queue);
// console.log(queue.length() === 4)
