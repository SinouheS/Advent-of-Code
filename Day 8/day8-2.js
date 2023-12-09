const fs = require('fs');

function main() {
    const data = fs.readFileSync('data.txt').toString();
    const instructions = data.split('\n')[0].trim();
    const nodes = [...data.matchAll(/([A-Z0-9]+) = \(([A-Z0-9]+), ([A-Z0-9]+)\)/g)].map((m) => { return { name: m[1], L: m[2], R: m[3] } });
    let res = 1;
    const startNodes = nodes.filter((n) => n.name.charAt(2) == 'A');

    for (const node of startNodes) {
        res = lcm(res, solve(node, nodes, instructions));
    }

    console.log(res);
}

function solve(node, nodes, instructions) {
    let i = 0;
    let currentStep = node.name;
    while (currentStep.charAt(2) !== 'Z')
        currentStep = nodes.find((n) => n.name == currentStep)[instructions[i++ % instructions.length]];
    return i;
}

function lcm(a, b) {
    let hcf;

    for (let i = 1; i <= a && i <= b; i++) {
        if (a % i == 0 && b % i == 0) {
            hcf = i;
        }
    }

    return (a * b) / hcf;
}

main();


