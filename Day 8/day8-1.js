const fs = require('fs');

function main() {
    const data = fs.readFileSync('data.txt').toString();
    const instructions = data.split('\n')[0].trim();
    const nodes = [...data.matchAll(/([A-Z]+) = \(([A-Z]+), ([A-Z]+)\)/g)].map((m) => { return { name: m[1], L: m[2], R: m[3] } });
    console.log(instructions)
    let i = 0;
    let currentStep = 'AAA';
    while (currentStep != 'ZZZ')
        currentStep = nodes.find((n) => n.name == currentStep)[instructions[i++ % instructions.length]];
    console.log(i);
}

main();


