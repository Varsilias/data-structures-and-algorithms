// function fibFastHugeNumber(n, m) {
//     if (n == 0) return 0
//     if (n == 1) return 1%m

//     let prev1 = 0
//     let prev2 = 1
   

//     for (let i = 2; i <= n; i++) {
//         current = (prev1 + prev2) % m
//         prev1 = prev2
//         prev2 = current
//     }

//     return prev2
// }
// // console.log(fibFastHugeNumber(1, 239))
// // console.log(fibFastHugeNumber(115, 1000))
// // console.log(fibFastHugeNumber(2816213588, 239))

const readline = require('node:readline/promises');
const { stdin } = require('node:process');

const rl = readline.createInterface({ input: stdin, terminal: false });

rl.on('line', function(line) {
    const parts = line.trim().split(' ');
    const n = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10);
    console.log(fibFastHugeNumber(n, m));
    process.exit();
});

function fibFastHugeNumber(n, m) {
    if (n === 0) return 0;
    if (n === 1) return 1 % m;

    // Find the Pisano period for m so the loop never exceeds 6*m iterations
    // regardless of how large n is
    const period = pisanoPeriod(m);
    n = n % period;

    if (n === 0) return 0;
    if (n === 1) return 1 % m;

    let prev1 = 0;
    let prev2 = 1;

    for (let i = 2; i <= n; i++) {
        let current = (prev1 + prev2) % m;
        prev1 = prev2;
        prev2 = current;
    }

    return prev2;
}

function pisanoPeriod(m) {
    if (m === 1) return 1;

    let prev1 = 0;
    let prev2 = 1;

    // The Pisano period for m is at most 6*m
    for (let i = 2; i <= 6 * m; i++) {
        let current = (prev1 + prev2) % m;
        prev1 = prev2;
        prev2 = current;

        // The sequence always restarts with 0, 1
        if (prev1 === 0 && prev2 === 1) {
            return i - 1;
        }
    }

    return 6 * m;
}