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

function main() {
    const data = fs.readFileSync('data.txt').toString().split('\n').map((l) => l.trim());
    let loopLength = 1;
    let nextPosition = findFirstPipe(startPositionCoordinates, data);
    do {
        nextPosition = findNextPosition(nextPosition, data);
        loopLength++;
    } while (data[nextPosition.coordinates[0]].charAt(nextPosition.coordinates[1]) != 'S')
    console.log('total:', loopLength / 2);
}

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

