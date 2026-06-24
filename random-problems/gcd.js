const readline = require('node:readline/promises');
const { stdin } = require('node:process');
 
const rl = readline.createInterface({ input: stdin, terminal: false });
 
rl.on('line', function(line) {
    const parts = line.trim().split(' ');
    const a = parseInt(parts[0], 10);
    const b = parseInt(parts[1], 10);
    console.log(fastGcd(a, b));
    process.exit();
});
 
function fastGcd(a, b) {
    if (b === 0) return a;
    return fastGcd(b, a % b);
}
 