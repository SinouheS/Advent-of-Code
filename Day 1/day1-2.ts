import * as fs from "fs";

const NUMBERS = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

function main() {
  const array = fs.readFileSync("coordinates.txt").toString().split("\n");
  let total = 0;

  for (const line of array) {
    total+=getCoordinates(line);
  }

  console.log('total:', total);
}

function getCoordinates(line: string): number {
  const left = toNumber(line.match(/([0-9]|one|two|three|four|five|six|seven|eight|nine)/)[0]);
  const right = toNumber(reverse(reverse(line).match(/([0-9]|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin)/)[0]));
  return parseInt(left + right);
}

function toNumber(str: string): string {
  if(str.length == 1)
    return str;
  else
    return (NUMBERS.indexOf(str) + 1).toString();
}

function reverse(str: string): string {
  return str.split('').reduce((a, b) => b + a);
}

main();