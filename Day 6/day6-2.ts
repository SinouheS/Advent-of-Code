import * as fs from "fs";

function main() {
    const data: string = fs.readFileSync('data.txt').toString();
}

main();