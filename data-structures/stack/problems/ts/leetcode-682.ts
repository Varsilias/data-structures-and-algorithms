function calPoints(operations: string[]): number {
    const s: number[] = []

    for(const op of operations) {
        switch(op) {
            case "+":
                const last = s.pop() as number
                const secondToLast = s.pop() as number
                const tmp = last + secondToLast
                s.push(...[secondToLast, last, tmp])
                break
            case "C":
                s.pop()
                break
            case "D":
                const end = s.pop() as number
                const tmpp = 2 * end
                s.push(...[end, tmpp])
                break
            default:
                s.push(Number(op))
                break
        }
    }

    return s.reduce((acc, curr) => (acc + curr), 0)
};

console.log(calPoints(["5","2","C","D","+"]))
console.log(calPoints(["5","-2","4","C","D","9","+","+"]))
console.log(calPoints(["1","C"]))