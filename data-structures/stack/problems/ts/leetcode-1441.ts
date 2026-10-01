function buildArray(target: number[], n: number): string[] {
    const stack: number[] = []
    const operations: string[] = []

    for(let i = 1; i <= n; i++) {
        if(stack.length === target.length && target.every((t) => stack.some((s) => t === s))) {
            return operations
        }
        stack.push(i)
        operations.push('Push')
        let isMember = target.includes(i)
        if(!isMember) {
            stack.pop()
            operations.push('Pop')
        }
    }

    return operations
};

console.log(buildArray([1,3], 3))
console.log(buildArray([1,2,3], 3))
console.log(buildArray([1,2], 4))