const fs = require('fs');

const PIPES = {
    '|': ['N', 'S'],
    '-': ['E', 'W'],
    'L': ['N', 'E'],
    'J': ['N', 'W'],
    '7': ['S', 'W'],
    'F': ['E', 'S']
}

const DIRECTIONS = {
    'N': [-1, 0],
    'E': [0, 1],
    'S': [1, 0],
    'W': [0, -1]
}

const OPPOSITE_DIRECTIONS = {
    'N': 'S',
    'S': 'N',
    'E': 'W',
    'W': 'E'
}

const CORNER_PIPES = ['L', 'J', '7', 'F'];

function main() {
    const data = fs.readFileSync('data.txt').toString().split('\n').map((l) => l.trim());
    const loopCoordinates = [];
    const startPositionCoordinates = getStartPosition(data);
    loopCoordinates.push(startPositionCoordinates);
    let nextPosition = findFirstPipe(startPositionCoordinates, data);
    loopCoordinates.push(nextPosition.coordinates);
    do {
        nextPosition = findNextPosition(nextPosition, data);
        loopCoordinates.push(nextPosition.coordinates);
    } while (data[nextPosition.coordinates[0]].charAt(nextPosition.coordinates[1]) != 'S')

    // Pick's theorem:
    // area = number of points inside the polygon   + (boundary points / 2) - 1
    // A    = i                                     + b/2                   - 1
    // <=> 2A = 2i + b - 2
    // <=> i = (2A - b + 2) / 2

    // i don't get why, but it only works if using '+ 3' instead of '+ 2', and it is really bugging me.

    // Shoelace theorem:
    // 2A = sum(y(i) (x(i-1) - x(i+1)))
    const total = (Math.abs(shoelace(loopCoordinates)) - loopCoordinates.length + 3) / 2

    console.log('total:', total);
}

const shoelace = (arr) => arr.map((v, i) => v[1] * (arr[(i - 1 + arr.length) % arr.length][0] - arr[(i + 1) % arr.length][0])).reduce((a, b) => a + b);

function getStartPosition(data) {
    for (let i = 0; i < data.length; i++)
        for (let j = 0; j < data[i].length; j++)
            if (data[i].charAt(j) === 'S') return [parseInt(i), j];
}

function findFirstPipe(coordinates, data) {
    // North
    if (coordinates[0] > 0 && Object.keys(PIPES).filter((p) => PIPES[p].includes('S')).includes(data[coordinates[0] - 1].charAt(coordinates[1])))
        return {
            coordinates: [coordinates[0] - 1, coordinates[1]],
            direction: 'N'
        }

    // East
    if (coordinates[1] < data[coordinates[0]].length - 1 && Object.keys(PIPES).filter((p) => PIPES[p].includes('W')).includes(data[coordinates[0]].charAt(coordinates[1] + 1)))
        return {
            coordinates: [coordinates[0], coordinates[1] + 1],
            direction: 'E'
        }

    // South
    if (coordinates[0] < data.length - 1 && Object.keys(PIPES).filter((p) => PIPES[p].includes('N')).includes(data[coordinates[0] + 1].charAt(coordinates[1])))
        return {
            coordinates: [coordinates[0] + 1, coordinates[1]],
            direction: 'S'
        }

    // West
    if (coordinates[1] > 0 && Object.keys(PIPES).filter((p) => PIPES[p].includes('E')).includes(data[coordinates[0]].charAt(coordinates[1] - 1)))
        return {
            coordinates: [coordinates[0], coordinates[1] - 1],
            direction: 'W'
        }
}

function findNextPosition(position, data) {
    const pipe = data[position.coordinates[0]].charAt(position.coordinates[1]);
    const direction = PIPES[pipe].filter((d) => d !== OPPOSITE_DIRECTIONS[position.direction])[0];
    return {
        coordinates: [position.coordinates[0] + DIRECTIONS[direction][0], position.coordinates[1] + DIRECTIONS[direction][1]],
        direction
    }
}

main();

