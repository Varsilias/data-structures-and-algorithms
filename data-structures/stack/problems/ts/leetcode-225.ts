import { MyQueue } from "../../../queue/implementations/queue";

class MyStack {
    private container: MyQueue<number>;
    constructor() {
        this.container = new MyQueue<number>();
    }

    push(x: number): void {
        const n = this.container.size();
        this.container.enqueue(x);
        for(let i = 0; i < n; i++) {
            const item = this.container.dequeue() as number
            this.container.enqueue(item)
        }
       
    }

    pop(): number {
       return this.container.dequeue() as number
    }

    top(): number {
      return this.container.peek() as number
    }

    empty(): boolean {
        return this.container.isEmpty()
    }
}


const myStack = new MyStack();
console.log(myStack.empty())
myStack.push(1);
myStack.push(2);
console.log(myStack.top()); // return 2
console.log(myStack.pop()); // return 2
console.log(myStack.empty()); // return Fals