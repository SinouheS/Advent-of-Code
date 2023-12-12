const fs = require('fs');

function main() {
    const data = fs.readFileSync('data.txt').toString().split('\n').map(l => l.trim());
    const galaxies = [];
    for (let i = 0; i < data.length; ++i)
        for (let j = 0; j < data[i].length; ++j)
            if (data[i].charAt(j) === '#') galaxies.push([i, j]);

    const noGalaxyRows = Array.from(Array(data.length).keys()).filter((r) => ![... new Set(galaxies.map((g) => g[0]))].includes(r));
    const noGalaxyColumns = Array.from(Array(data[0].length).keys()).filter((c) => ![... new Set(galaxies.map((g) => g[1]))].includes(c));

    galaxies.forEach((g) => {
        g[0] += noGalaxyRows.filter((r) => r < g[0]).length;
        g[1] += noGalaxyColumns.filter((c) => c < g[1]).length;
    })

    const shortestPaths = galaxies.map((g, idx) => {
        const sp = [];
        for (let i = idx + 1; i < galaxies.length; ++i)
            sp.push(Math.abs(g[0] - galaxies[i][0]) + Math.abs(g[1] - galaxies[i][1]));
        return sp;
    })

    const total = shortestPaths.map((sp) => sp.length ? sp.reduce((a, b) => a + b) : 0).reduce((a, b) => a + b);
    console.log('total:', total);
}

main();