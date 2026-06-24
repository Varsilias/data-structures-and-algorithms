// function fibFastLastDigit(n) {
//     if (n <= 1) return n

//     let prev1 = 0
//     let prev2 = 1
   

//     for (let i = 2; i <= n; i++) {
//         current = (prev1 + prev2) % 10
//         prev1 = prev2
//         prev2 = current
//     }

//     return Number(prev2.toString().split('').slice(-1).join(''))
// }

// console.log(fibFastLastDigit(3))
// console.log(fibFastLastDigit(100))
// console.log(fibFastLastDigit(91239))

const readline = require('node:readline/promises');
const { stdin } = require('node:process');

const rl = readline.createInterface({ input: stdin, terminal: false });

rl.on('line', function(line) {
    const n = parseInt(line.trim(), 10);
    console.log(fibFastLastDigit(n));
    process.exit();
});

function fibFastLastDigit(n) {
    if (n <= 1) return n;

    let prev1 = 0;
    let prev2 = 1;

    for (let i = 2; i <= n; i++) {
        let current = (prev1 + prev2) % 10;
        prev1 = prev2;
        prev2 = current;
    }

    return prev2;
}