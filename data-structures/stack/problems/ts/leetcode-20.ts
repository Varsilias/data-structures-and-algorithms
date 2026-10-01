function isValid(s: string): boolean {
    const stack = []
    const opens = ["(", "[", "{"]
    const map: Record<string, string> = {
        ")": "(", 
        "]": "[", 
        "}": "{"
    }

    for(let i = 0; i < s.length; i++) {
        let char = s[i];

        if(opens.includes(char)) {
            stack.push(char)
            continue
        }

        let top = stack[stack.length-1]
        if (top !== map[char]) {
                return false
        } else {
            stack.pop()
        }
        
    }
    return stack.length <= 0
};

function isValid2(s: string): boolean {
    const stack = []
    for(let i=0; i< s.length; i++) {
        const c = s[i]
        if (c ==='(') {
            stack.push(')')
        } else if(c === '{') {
            stack.push('}')
        } else if(c === '[') {
            stack.push(']')
        } else if(stack.length < 0 || stack[stack.length - 1] !== c) {
            return false
        } else {
            stack.pop()
        }
    }

    return stack.length <= 0
}


console.log(isValid2("]"))
// console.log(isValid2("(("))
// console.log(isValid2("["))
// console.log(isValid2("([)]"))
// console.log(isValid2("()"))
// console.log(isValid2("()[]{}"))
// console.log(isValid2("(]"))
// console.log(isValid2("([])"))
// console.log(isValid2("([)]"))