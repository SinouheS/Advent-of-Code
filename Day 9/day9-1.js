const fs = require('fs');

function main() {
    const data = fs.readFileSync('data.txt').toString();
    const values = data.split('\n').map((l) => l.trim().split(' ').map((n) => parseInt(n)));
    let total = 0;
    for (const value of values)
        total += prediction(value);
    console.log('total:', total);
}

function prediction(values) {
    const differences = [];
    for (let i = 0; i < values.length - 1; ++i)
        differences.push(values[i + 1] - values[i]);
    if (differences.filter((v) => v == 0).length == differences.length) return values[0];
    else return values[0] - prediction(differences);
}

main();

