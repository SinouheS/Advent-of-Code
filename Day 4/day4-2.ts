import * as fs from "fs";

function main() {
    const data = fs.readFileSync('data.txt').toString().split('\n');
    let total = 0;
    const winnings = data.map((l) => getValue(l));
    const appearances = Array(winnings.length).fill(1);

    for (const [index, value] of winnings.entries()) {
        total += appearances[index];
        for (let i = index + 1; i < index + value + 1 && i < appearances.length; i++)
            appearances[i] = appearances[i] + appearances[index];
    }

    console.log('total:', total);
}

function getValue(line: string) {
    const winningNumbers = [...line.substring(9).split('|')[0].matchAll(/[0-9]+/g)].map((m) => parseInt(m[0]));
    const myNumbers = [...line.split('|')[1].matchAll(/[0-9]+/g)].map((m) => parseInt(m[0]));
    return myNumbers.filter((n) => winningNumbers.includes(n)).length;
}

main();