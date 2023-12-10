const fs = require('fs');

function main() {
    const data = fs.readFileSync('data.txt').toString();
    const values = data.split('\n').map((l) => l.trim().split(' ').map((n) => parseInt(n)));
    let total = 0;
    for (const value of values)
        total += prediction(value);
    console.log('total:', total);
}

main();

