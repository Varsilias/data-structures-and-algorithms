function removeDuplicates(s: string): string {
    const stack: string[] = []
    for(let i = 0; i < s.length; i++) {
        const char = s[i]
        
        if(stack.length > 0 && stack[stack.length-1] === char) {
            stack.pop()
        } else {
            stack.push(char)
        }
    }

    return stack.join('')
};

console.log(removeDuplicates("abbaca"))
console.log(removeDuplicates("azxxzy"))