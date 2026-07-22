import { DynamicRingBuffer } from "../interfaces/dynamic-ring-buffer";

export class MyDynamicRingBuffer<T> implements DynamicRingBuffer<T> {
  private readonly initialCapacity: number;
  private currentCapacity: number
  private head: number
  private tail: number
  private container: Array<T>

  // bookeeping
  private currentLength: number

  public constructor(initialCapacity = 4) {
    if (initialCapacity <= 0) {
      throw new Error("initialCapacity must be greater than zero");
    }

    this.initialCapacity = initialCapacity;
    this.currentCapacity = initialCapacity
    this.container = new Array(initialCapacity)
    this.head = 0;
    this.tail = 0
    this.currentLength = 0
  }

  public length(): number {
    return this.currentLength
  }

  public capacity(): number {
    return this.currentCapacity
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
    if(this.isEmpty()) return undefined
    const idx = (this.tail - 1 + this.capacity()) % this.capacity()
    return this.container[idx]
  }

  public enqueue(_value: T): boolean {
    this.ensureCapacity()
    this.container[this.tail] = _value
    this.currentLength++
    this.tail = (this.tail + 1) % this.capacity()
    return true
  }

  public dequeue(): T | undefined {
    if(this.isEmpty()) return undefined;
    const val = this.container[this.head]
    this.head = (this.head + 1) % this.capacity()
    this.currentLength--
    return val
  }

  public clear(): void {
    this.currentCapacity = this.getInitialCapacity()
    this.container = new Array(this.getInitialCapacity())
    this.head = 0;
    this.tail = 0
    this.currentLength = 0
  }

  public toArray(): T[] {
    const result = [] as T[]

    for(let i = 0; i < this.length(); i++) {
      const idx = (this.head + i) % this.capacity()
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

  private ensureCapacity() {
    if(!this.isFull()) return

    const newCapacity = this.currentCapacity * 2
    const newContainer = new Array<T>(newCapacity)

    // copy backing array
    for(let i = 0; i < this.length(); i++) {
      const currIdx = (this.head + i) % this.capacity()
      const v = this.container[currIdx]
      newContainer[i] = v
    }

    this.head = 0
    this.tail = this.currentCapacity
    this.currentCapacity = newCapacity
    this.container = newContainer
  }
}
