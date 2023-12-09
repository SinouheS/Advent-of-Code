const fs = require('fs');


function main() {
    const cards = fs.readFileSync('data.txt').toString().split('\n').map((l) => { const line = l.split(' '); return { cards: line[0], bid: parseInt(line[1]) }; });
    const sortedCards = cards.sort((a, b) => cardCompare(a, b));
    const total = sortedCards.map((c, i) => c.bid * (i + 1)).reduce((a, b) => a + b);

    console.log('total:', total);
}

function cardCompare(a, b) {
    a.value = getValue(a.cards);
    b.value = getValue(b.cards);
    if (a.value == b.value)
        return cardsValueCompare(a.cards, b.cards);
    return a.value - b.value;
}

function getValue(c) {
    // return value between 0-6, highest is best;
    const frequencyMap = getFrequency(c.split(''));
    const joker = frequencyMap['J'] ?? 0;
    if (joker == 5) return 6;
    if (frequencyMap['J']) delete frequencyMap.J;

    switch (Object.keys(frequencyMap).length) {
        case 1: return 6; // five of a kind
        case 2:
            if (Object.values(frequencyMap).find((v) => v + joker == 4)) return 5; // four of a kind
            else return 4; // full house
        case 3:
            if (Object.values(frequencyMap).find((v) => v + joker == 3)) return 3; // three of a kind
            else return 2; // two pairs
        case 4: return 1; // one pair
        case 5: return 0; // high card
    }
}

function getFrequency(array) {
    const map = {};
    array.forEach(item => {
        if (map[item]) {
            map[item]++;
        } else {
            map[item] = 1;
        }
    });
    return map;
};

function cardsValueCompare(a, b) {
    const CARDS = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'];
    for (let i = 0; i < 5; i++)
        if (a[i] != b[i])
            return CARDS.indexOf(b[i]) - CARDS.indexOf(a[i]);
    return 0;
}

main();