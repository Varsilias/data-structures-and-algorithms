class Entry {
	constructor(value) {
		this.value = value;		
		this.next = null
	}
}

class Set {
	
	#PRIME = 31

	#length = 29

	#entries = new Array(this.#length)

	add(value) {
		
		let hash = this.getHashForKey(value);
		let newEntry = new Entry(value);
		
		// if there is no initial value at the beginning of the
		// bucket we just insert one
		if (!this.#entries[hash]) {
				this.#entries[hash] = newEntry;
				return;        
		}
		
		let head = this.#entries[hash];
		let prev;

		while (head) {
			prev = head;
			if (prev.value === value) {
					throw new Error("Duplicate value detected");
			}
			head = head.next;
		}

		prev.next = newEntry;

  }
	
	contains(value) {
		
		let hash = this.getHashForKey(value);

		let head = this.#entries[hash];

		while (head) {
				if (head.value === value) {
					return true;
				}

				head = head.next;
		}

		return false;    
	}
	
	remove(value) {
		let hash = this.getHashForKey(value);
	
		let head = this.#entries[hash];
		
		if (head?.value === value) {
				this.#entries[hash] = head.next;				
				return head.value;
		}
	
		let prev;
	
		while (head?.value !== value) {
				prev = head;
				head = head?.next;
		}
	
		prev.next = head?.next;
	
		return head.value;
	}

	list() {
		  let entries = [];
        for (let i = 0; i < this.#entries.length; i++) {
            let head = this.#entries[i];

            while (head) {
                entries.push(head.value)
                head = head.next;
            }
        }

        return entries;
	}

	getHashForKey(key) {
		let stringifiedKey = key.toString();
		let sum = 0;

		for (let i = 0; i < stringifiedKey.length; i++) {
				sum += stringifiedKey.charCodeAt(i);
		}

		return (sum * this.#PRIME) % this.#entries.length;
	}
}



let m = new Set()

m.add(2)
m.add(4)
m.add(8)
m.add(10)
m.add(12)

console.log(m.remove(2))
console.log(m.remove(12))
console.log(m.list())
console.log(m.contains(2))
console.log(m.contains(4))
console.log(m.contains(12))
