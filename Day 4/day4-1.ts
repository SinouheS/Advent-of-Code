import * as fs from "fs";

function main() {
    const data = fs.readFileSync('data.txt').toString().split('\n');
    let total = 0;

    for (const line of data) {
        total += getValue(line);
    }

    console.log('total:', total);
}

function getValue(line: string) {
    const winningNumbers = [...line.substring(9).split('|')[0].matchAll(/[0-9]+/g)].map((m) => parseInt(m[0]));
    const myNumbers = [...line.split('|')[1].matchAll(/[0-9]+/g)].map((m) => parseInt(m[0]));
    const myWinningNumbers = myNumbers.filter((n) => winningNumbers.includes(n)).length;

    return myWinningNumbers == 0 ? 0 : Math.pow(2, myWinningNumbers - 1);
}

main();