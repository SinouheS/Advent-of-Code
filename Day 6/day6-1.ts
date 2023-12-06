import * as fs from "fs";

function main() {
    const data = fs.readFileSync('data.txt').toString();
    const times: number[] = [...[...data.matchAll(/Time:[0-9\s]+/g)][0][0].matchAll(/[0-9]+/g)].map((m) => parseInt(m[0]));
    const distances: number[] = [...[...data.matchAll(/Distance:[0-9\s]+/g)][0][0].matchAll(/[0-9]+/g)].map((m) => parseInt(m[0]));

    let total = 1;

    for(const index in times) {
        total*= getValue(times[index], distances[index]);
    }

    console.log('total:', total)
}

function getValue(time: number, distance: number): number {
    const sols: number[] = getQuadraticSolutions(time, distance);
    if(!sols.length) return 0;
    if(sols.length == 1) return 1;
    else return (Math.ceil(sols[1] - 1) - Math.floor(sols[0] + 1) + 1);
}

function getQuadraticSolutions(time: number, distance: number): number[] {
    // equation is t0² - t*t0 + d = 0
    // in general, solutions are (-b ± √b²-4ac)/2, in this case (t ± √t²-4d)/2
    const delta = (time * time ) - (4 * distance);
    if(delta < 0) return [];
    if(delta == 0) return [time/2];
    return [(time - Math.sqrt(delta))/2, (time + Math.sqrt(delta))/2];
}   

main();