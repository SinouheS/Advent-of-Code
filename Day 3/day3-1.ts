import * as fs from "fs";

function main() {
  const array = fs.readFileSync("data.txt").toString().split("\n");
//   const array = fs.readFileSync("test.txt").toString().split("\n");
  let total = 0;

  for(const [index, val] of array.entries()) {
    const epns = getEnginePartNumbers(val, index);

    for(const epn of epns)
        if(isValid(epn, array)) total+= epn.value;
  }

  console.log('total:', total);
}

function getEnginePartNumbers(text: string, index: number): EnginePartNumber[] {
    return [...text.matchAll(/[0-9]+/g)].map((m) => { return { 
        value: parseInt(m[0]), 
        startPoint: { x: m.index, y: index },
        endPoint: { x: m.index + m[0].length - 1, y: index } 
    }} );
}

function isValid(epn: EnginePartNumber, array: string[]): boolean {
    const startXIndex = Math.max(epn.startPoint.x - 1, 0); 
    const startYIndex = Math.max(epn.startPoint.y - 1, 0); 
    const endXIndex = Math.min(epn.endPoint.x + 1, array[0].length - 1); 
    const endYIndex = Math.min(epn.endPoint.y + 1, array.length - 1); 

    for(let x = startXIndex; x < endXIndex + 1; x++ )
        for(let y = startYIndex; y < endYIndex + 1; y++ ) 
            if(isSymbol(array[y].charAt(x)))
                return true;
    return false;
}

function isSymbol(char: string) {
    return char.match(/[0-9.\s]/) === null;
}

main();

interface EnginePartNumber {
    value: number;
    startPoint: Point;
    endPoint: Point;
}

interface Point {
    x: number;
    y: number;
}