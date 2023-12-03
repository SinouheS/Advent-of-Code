import * as fs from "fs";

function main() {
    const array = fs.readFileSync("data.txt").toString().split("\n");
    // const array = fs.readFileSync("test.txt").toString().split("\n");
    let total = 0;

    const epns: EnginePartNumber[] = getEnginePartNumbers(array);
    const gearCoordinates: Point[] = getGears(array);

    for(const gc of gearCoordinates)
        total += getGearRatio(gc, epns);

    console.log('total:', total);
}

function getEnginePartNumbers(array: string[]): EnginePartNumber[] {
    let epns: EnginePartNumber[] = [];
    for(const [index, val] of array.entries()) {
        epns = epns.concat([...val.matchAll(/[0-9]+/g)].map((m) => { return { 
                value: parseInt(m[0]), 
                startPoint: { x: m.index, y: index },
                endPoint: { x: m.index + m[0].length - 1, y: index } 
            }}));
    }
    return epns;
}

function getGears(array: string[]): Point[] {
    let gearCoordinates: Point[] = [];
    for(const [index, val] of array.entries()) 
        gearCoordinates = gearCoordinates.concat([...val.matchAll(/\*/g)].map((m) => { return { x: m.index, y: index }}));
    return gearCoordinates;
}

function getGearRatio(coord: Point, epns: EnginePartNumber[]) {
    const validEpns = epns.filter((epn) => isValidEpn(epn, coord));
    if(validEpns.length == 2) return validEpns[0].value * validEpns[1].value;
    else return 0;
}

function isValidEpn(epn: EnginePartNumber, coord: Point): boolean {
    return epn.startPoint.x - 1 <= coord.x && coord.x <= epn.endPoint.x + 1 && epn.startPoint.y - 1 <= coord.y && coord.y <= epn.endPoint.y + 1;
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