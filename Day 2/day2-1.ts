import * as fs from "fs";

const MAX: GameData = {
    red: 12,
    green: 13,
    blue: 14
}

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
    const id: number = getGameId(text);
    if(isPossible(getGameData(text)))
        return id;
    else return 0;
}

function getGameId(text: string) {
    return parseInt(text.match(/Game ([0-9]*)/)[1]);
}

function isPossible(data: GameData): boolean {
    for (const color of Object.keys(data))
        if(data[color] > MAX[color]) return false;
    return true;
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