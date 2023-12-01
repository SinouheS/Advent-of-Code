import * as fs from "fs";

function main() {
  const array = fs.readFileSync("coordinates.txt").toString().split("\n");
  let total = 0;

  for (const line of array) {
    total+=getCoordinates(line);
  }

  console.log('total:', total);
}

function getCoordinates(line: string): number {
  const left = findLeftCoordinate(line);
  const right = findRightCoordinate(line);
  return parseInt(left + right);
}

function findLeftCoordinate(line: string): string {
  for(let i = 0; i < line.length; i++)
    if(line.charAt(i).match(/[0-9]/))
      return line.charAt(i);
  return '';
}

function findRightCoordinate(line: string): string {
  for(let i = line.length-1; i >= 0; i--)
    if(line.charAt(i).match(/[0-9]/))
      return line.charAt(i);
  return '';
}

main();