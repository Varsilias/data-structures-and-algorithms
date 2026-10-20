import { HashMap } from "../interfaces/hash-map";

type MapEntry<K, V> = {
  key: K,
  value: V
  next: MapEntry<K, V> | null
}

function newMapEntry<K, V>(key:K, value: V) {
  return { key, value, next: null} as MapEntry<K, V>
}

export class MyHashMap<K, V> implements HashMap<K, V> {
  private readonly initialCapacity: number;
  private readonly PRIME = 31
  private currentCapacity: number
  private container: Array<MapEntry<K, V> | null>
  private currentLength: number

  public constructor(initialCapacity = 8) {
    if (initialCapacity <= 0) {
      throw new Error("initialCapacity must be greater than zero");
    }

    this.initialCapacity = initialCapacity;
    this.currentCapacity = initialCapacity
    this.container = Array.from({ length: this.currentCapacity }, () => null)
    this.currentLength = 0
  }

  public length(): number {
    return this.currentLength;
  }

  public capacity(): number {
    return this.currentCapacity;
  }

  public isEmpty(): boolean {
    return this.length() === 0;
  }

  public set(_key: K, _value: V): void {
    this.ensureCapacity()
    const hash = this.hash(_key)
    const bucket = this.container[hash]
    const entry = newMapEntry(_key, _value)
    

    // when the bucket is empty
    if(bucket === null || !bucket) {
      this.container[hash] = entry
      this.currentLength++
      return
    }

    let head: MapEntry<K, V> | null = bucket
    let prev: MapEntry<K, V> | null = null

    while(head !== null) {
      if(head.key === _key) {
        head.value = _value
        return
      }
      prev = head
      head = head.next
    }

    if(prev) {
      this.currentLength++
      prev.next = entry
    }

  }

  public get(_key: K): V | undefined {
    const hash = this.hash(_key)
    const bucket = this.container[hash]
    if(bucket === null || !bucket) return undefined

    let head: MapEntry<K, V> | null = bucket

    while(head !== null) {
      if(head.key === _key) {
        return head.value
      }
      head = head.next
    }
    return undefined;
  }

  public has(_key: K): boolean {
    const hash = this.hash(_key)
    const bucket = this.container[hash]
    if(bucket === null || !bucket) return false

    let head: MapEntry<K, V> | null = bucket
    while(head !== null) {
      if(head.key === _key) return true
      head = head.next
    }
    return false;
  }

  public remove(_key: K): boolean {
    const hash = this.hash(_key)
    const bucket = this.container[hash]
    if(bucket === null || !bucket) return false


    let head: MapEntry<K, V> | null = bucket
    let prev: MapEntry<K, V> | null = bucket

    // if the key is at the head of the bucket
    if(head.key === _key) {
      head = head.next
      this.container[hash] = head
      this.currentLength--
      return true
    }

    while(head !== null) {
      
      if(head.key === _key) break
      prev = head
      head = head.next
    }

    if(prev !== null && head !== null) {
      prev.next = head.next
      this.currentLength--
      return true
    }

    return false
  }

  public keys(): K[] {
    const kkeys: K[] = []
    const container = this.container

    container.forEach((bucket) => {
      let head = bucket
      while(head !== null) {
        kkeys.push(head.key)
        head = head.next
      }
    })
    return kkeys;
  }

  public values(): V[] {
    const vvalues: V[] = []
    const container = this.container

    container.forEach((bucket) => {
      let head = bucket
      while(head !== null) {
        vvalues.push(head.value)
        head = head.next
      }
    })
    return vvalues;
  }

  public entries(): Array<[K, V]> {
    const eentries: Array<[K, V]> = []
    const container = this.container

    container.forEach((bucket) => {
      let head = bucket
      while(head !== null) {
        eentries.push([head.key, head.value])
        head = head.next
      }
    })
    return eentries;
  }

  public clear(): void {
    this.currentCapacity = this.initialCapacity
    this.container = Array.from({ length: this.currentCapacity }, () => null)
    this.currentLength = 0
  }

  private ensureCapacity() {
    const threshold = (this.currentLength / this.currentCapacity) * 100

    if(threshold >= 80) {
      const newCapacity = this.currentCapacity * 2;
      const newContainer: Array<MapEntry<K, V> | null> = Array.from({ length: newCapacity }, () => null)
      // set this at this point so the hash 
      // function picks the new value of the
      // "currentCapacity" variable
      this.currentCapacity = newCapacity


      const currentContainer = this.container

      currentContainer.forEach((bucket) => {
        let head: MapEntry<K, V> | null = bucket
        while(head !== null) {
          const nextNode = head.next;
          const hash = this.hash(head.key)
          head.next = newContainer[hash]
          newContainer[hash] = head
          head = nextNode
        }
      })

      this.container = newContainer
    }
  }

  private hash(key: K): number {
    const stringKey = String(key)
    let sum = 0;

    for(let i = 0; i < stringKey.length; i++) {
      sum += stringKey.charCodeAt(i)
    }

    return (sum * this.PRIME) % this.currentCapacity
  }
}
