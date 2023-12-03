import * as fs from "fs";

function main() {
  const array = fs.readFileSync("data.txt").toString().split("\n");
//   const array = fs.readFileSync("test.txt").toString().split("\n");
  let total = 0;

  for (const line of array) {
    total+=getValue(line);
  }

  console.log('total:', total);
}

function getValue(text: string): number {
    return Object.values(getGameData(text)).reduce((a, b) => a*b);
}

function getGameData(text: string): GameData {
    const red: number = [...text.matchAll(/([0-9]*) red/g)].map((m) => parseInt(m[1])).reduce((a, b) => Math.max(a, b)) ?? 0;
    const green: number = [...text.matchAll(/([0-9]*) green/g)].map((m) => parseInt(m[1])).reduce((a, b) => Math.max(a, b)) ?? 0;
    const blue: number = [...text.matchAll(/([0-9]*) blue/g)].map((m) => parseInt(m[1])).reduce((a, b) => Math.max(a, b)) ?? 0;

    return {
        red,
        green,
        blue
    }
}

interface GameData {
    red: number;
    green: number;
    blue: number;
}

main();