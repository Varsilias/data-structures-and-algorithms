class MyQueue {
    private stack: Array<number>
    private head: number
    private tail: number

    constructor() {
        this.stack = new Array<number>()
        this.head = 0
        this.tail = 0
    }

    push(x: number): void {
        this.stack.push(x)  
        this.tail++ 
    }

    pop(): number {
        if(this.empty()) {
            throw new Error("invalid operation")
        }
       const val = this.stack.shift() as number
        this.tail--
        return val
    }

    peek(): number {
        if(this.empty()) {
            throw new Error("invalid operation")
        }
        return this.stack[this.head]
    }

    empty(): boolean {
        return this.tail <= 0
    }
}

const myQueue = new MyQueue();
myQueue.push(1); // queue is: [1]
myQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)
myQueue.peek(); // return 1
myQueue.pop(); // return 1, queue is [2]
// myQueue.empty(); // return false
console.log(myQueue)
