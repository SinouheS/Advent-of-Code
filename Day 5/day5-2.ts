import * as fs from "fs";

function main() {
    const data: string = fs.readFileSync('data.txt').toString();
    const seedLineValues: number[] = [...[...data.matchAll(/seeds: (?:[0-9]+\s)+/g)][0][0].matchAll(/[0-9]+/g)].map((m) => parseInt(m[0]));
    const seedRanges: SeedRange[] = getSeeds(seedLineValues);
    const mapLines: string[] = [...data.matchAll(/[a-z\-:]+ map:\r\n(?:[0-9 \s]+)/g)].map((m) => m[0]);
    const sources: string[] = mapLines.map((line) => getSourceName(line));
    const destinations: string[] = mapLines.map((line) => getDestinationName(line));
    const ranges: Range[][] = mapLines.map((line) => getRanges(line));
    const maps: Map[] = sources.map((s, i) => { return { sourceCategory: s, destinationCategory: destinations[i], ranges: ranges[i]} });
    const seedsToLocations: number[] = seedRanges.map((s) => seedRangeToLowestLocation(s, maps));
    const lowestLocation: number = seedsToLocations.reduce((a, b) => Math.min(a, b));

    console.log('lowest location', lowestLocation);
}

function getSeeds(seedValues: number[]) {
    const seeds: SeedRange[] = [];
    for(let i = 0; i < seedValues.length/2; i++)
        seeds.push({start: seedValues[i*2], range: seedValues[i*2+1]});
    return seeds;
}

function getSourceName(text: string): string {
    const match = text.match(/([a-z]+)-to/);
    return match && match[1] || '';
}

function getDestinationName(text: string): string {
    const match = text.match(/to-([a-z]+)/);
    return match && match[1] || '';
}

function getRanges(text: string): Range[] {
    const lineMatches = [...text.matchAll(/^[0-9]+ [0-9]+ [0-9]+$/gm)];
    const numberMatches = lineMatches.map((m) => [...m[0].matchAll(/[0-9]+/g)]);
    const ranges = numberMatches.map((m) => { return {   
        destinationStart: parseInt(m[0][0]),
        sourceStart: parseInt(m[1][0]),
        length: parseInt(m[2][0])
    }});
    return ranges;
}

function seedRangeToLowestLocation(seedRange: SeedRange, maps: Map[]): number {
    let lowestLocation = nextStep(seedRange.start, 'seed', maps);
        for(let i = seedRange.start; i < seedRange.start + seedRange.range; i++)
            lowestLocation = Math.min(lowestLocation, nextStep(i, 'seed', maps));
    return lowestLocation;
}

function nextStep(current: number, source: string, maps: Map[]): number {
    const map = maps.find((m) => m.sourceCategory === source)!;
    if(map.destinationCategory === 'location') return getDestination(current, map);
    else return nextStep(getDestination(current, map), map.destinationCategory, maps);
}

function getDestination(current: number, map: Map): number {
    const range = map.ranges.find((r) => r.sourceStart <= current && current < r.sourceStart + r.length);
    if(range) return range.destinationStart + (current - range.sourceStart);
    else return current;
}

main();

interface Map {
    sourceCategory: string;
    destinationCategory: string;
    ranges: Range[];
}

interface Range {
    destinationStart: number;
    sourceStart: number;
    length: number;
}

interface SeedRange {
    start: number;
    range: number;
}