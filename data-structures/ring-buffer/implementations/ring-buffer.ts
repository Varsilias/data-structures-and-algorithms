import { RingBuffer } from "../interfaces/ring-buffer";

export class MyRingBuffer<T> implements RingBuffer<T> {
  private readonly initialCapacity: number;
  private container: Array<T>
  private head: number;
  private tail: number;

  // bookeeping
  private currentLength: number


  public constructor(initialCapacity = 4) {
    if (initialCapacity <= 0) {
      throw new Error("initialCapacity must be greater than zero");
    }

    this.initialCapacity = initialCapacity;
    this.container = new Array(initialCapacity);
    this.head = 0;
    this.tail = 0
    this.currentLength = 0

  }

  public length(): number {
    return this.currentLength
  }

  public capacity(): number {
    return this.initialCapacity
  }

  public isEmpty(): boolean {
    return this.length() <= 0
  }

  public isFull(): boolean {
    return this.length() === this.capacity()
  }

  public front(): T | undefined {
    if(this.isEmpty()) return undefined
    return this.container[this.head]
  }

  public rear(): T | undefined {
    if(this.isEmpty()) return undefined;
    let rearIndex = (this.tail - 1 + this.capacity()) % this.capacity()
    return this.container[rearIndex]
  }

  public enqueue(_value: T): boolean {
    if(this.isFull()) return false
    
    this.container[this.tail] = _value
    this.currentLength++
    this.tail = (this.tail + 1) % this.getInitialCapacity()

    return true
  }

  public dequeue(): T | undefined {
    if(this.isEmpty()) return undefined
    const val = this.container[this.head]
    this.head = (this.head + 1) % this.getInitialCapacity()
    this.currentLength--
    return val
  }

  public clear(): void {
    this.container = new Array(this.initialCapacity)
    this.currentLength = 0
  }

  public toArray(): T[] {
   let result = [] as T[]

   for(let i = 0; i < this.length(); i++) {
    let idx = (this.head + i) % this.capacity()
    const v = this.container[idx]
    if(v && v !== undefined) {
      result.push(v)
    }
   }

   return result
  }

  protected getInitialCapacity(): number {
    return this.initialCapacity;
  }
}

