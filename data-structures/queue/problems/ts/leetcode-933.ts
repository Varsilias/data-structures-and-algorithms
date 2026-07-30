class RecentCounter {
    private queue: Array<number>
    private head: number
    private tail: number
    constructor() {
        this.queue = new Array(0)
        this.head = 0
        this.tail = 0
    }

    ping(t: number): number {
        this.queue.push(t)
        this.tail = this.queue.length - 1
        return this.calculateSum()
    }

    private calculateSum(): number {
        const last = this.queue[this.tail]
        const searchSpace = last - 3000

        // console.log(this.queue[this.head])
        while(this.queue[this.head] < searchSpace) {
            this.queue.shift()
            // console.log(this.queue)
        }

        return this.queue.length
    }
}

const rc = new RecentCounter()
console.log(rc.ping(1))
console.log(rc.ping(100))
console.log(rc.ping(3001))
console.log(rc.ping(3002))
