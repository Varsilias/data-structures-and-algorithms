import { List } from "../interfaces/list";

export class ArrayList<T> implements List<T> {
  private readonly initialCapacity: number;
  private currentIndex: number // tracks where we last inserted
  private container: Array<T>
  private thresholdPercentage = 80

  public constructor(initialCapacity = 4) {
    if (initialCapacity <= 0) {
      throw new Error('"initialCapacity" cannot be less than zero')
    }
    this.initialCapacity = initialCapacity;
    this.container = new Array<T>(initialCapacity)
    this.currentIndex = 0
  }

  public length(): number {
    return this.currentIndex
  }

  public capacity(): number {
    return this.container.length
  }

  public isEmpty(): boolean {
    return this.currentIndex <= 0
  }

  public get(_index: number): T | undefined {
    if(_index < 0 || _index > this.length()) {
      return undefined
    }

    return this.container[_index]
  }

  // To set a value, things to consider
  /**
   * 1. Internal Array could be at the last available capacity
   * 2. Index to insert could be out of bounds
   * @param _index 
   * @param _value 
   */
  public set(_index: number, _value: T): void {
    if (_index > this.length()) {
      throw new Error('"index" is out of bound')
    }
    this.container[_index] = _value
  }

  /**
   * To set a value, things to consider
   * 1. Internal Array could be at the last available capacity
   * 2. Index to insert could be out of bounds
   */
  public append(_value: T): void {
    this.ensureCapacity()
    this.container[this.currentIndex] = _value
    this.currentIndex += 1
  }

  public prepend(_value: T): void { // ["B", "C", "D"] - "A"
    this.ensureCapacity()

    for(let i = this.length(); i > 0; i--) { // i=3,
      this.container[i] = this.container[i-1]
    }
    this.container[0] = _value
    this.currentIndex+=1
  }

  public insert(_index: number, _value: T): void { // [ 'a', 'b' ] - "2", "d"
    if(_index < 0) {
      throw new Error('"index" is out of bound')
    }
    this.ensureCapacity()
    for(let i = this.length();  i > _index; i--) { // "A", "B", "C", "D"]
      this.container[i] = this.container[i-1]
      
    }
    this.container[_index] = _value
    this.currentIndex += 1
  }

  public removeAt(_index: number): T | undefined {
    const found = this.get(_index)
    if(found === undefined) {
      return undefined
    }

    // likely to not happen
    if(!this.remove(found)) {
      return undefined
    }

    return found
  }

  public remove(_value: T): boolean { // ["A", "B", "C", "D"] - B
    const idx = this.indexOf(_value) // 1
    if(idx < 0) {
      return false
    }

    for(let i = idx; i < this.length(); i++) { // 1,2,3
      this.container[i] = this.container[i+1]
    }
    this.currentIndex--
   return true
  }

  public contains(_value: T): boolean {
    return this.indexOf(_value) >= 0
  }

  public indexOf(_value: T): number {
    for(let i = 0; i < this.length(); i++) {
      if(_value === this.container[i]) {
        return i
      }
    }
    return -1
  }

  public clear(): void {
    this.currentIndex = 0
    this.container = new Array()
  }

  public toArray(): T[] {
    const array: T[] = []
    for(let i = 0; i < this.length(); i++) {
      array.push(this.container[i])
    }
    return array
  }

  protected getInitialCapacity(): number {
    return this.initialCapacity;
  }

  private ensureCapacity() {
    const percentage = (this.length()/this.capacity()) * 100

    if(percentage >= this.thresholdPercentage) {
      const newCapacity = this.capacity() * 2
      const newContainer = new Array<T>(newCapacity)
      for(let i = 0; i < this.length(); i++) {
        newContainer[i] = this.container[i]
      }
      this.container = newContainer
    }
  }
}
