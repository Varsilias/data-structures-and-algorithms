const readline = require('readline');

process.stdin.setEncoding('utf-8')
const rl  = readline.createInterface({ input: process.stdin, terminal: false })

rl.on('line', read)

function read(line) {
    if (line !== '\n') {
        var a = parseInt(line.toString().split(' ')[0], 10);
        var b = parseInt(line.toString().split(' ')[1], 10);
        console.log(a + b);
        process.exit();
        
    }
}