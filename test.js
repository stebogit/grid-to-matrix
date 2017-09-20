const test = require('tape');
const fs = require('fs');
const path = require('path');
const load = require('load-json-file');
const write = require('write-json-file');
const gridToMatrix = require('./');

const directories = {
    in: path.join(__dirname, 'test', 'in') + path.sep,
    out: path.join(__dirname, 'test', 'out') + path.sep
};

const fixtures = fs.readdirSync(directories.in).map(filename => {
    return {
        filename,
        name: path.parse(filename).name,
        geojson: load.sync(directories.in + filename)
    };
});

test('grid-to-matrix', t => {
    for (const {filename, name, geojson}  of fixtures) {
        const {points, property, flip, flags} = geojson;
        let result = gridToMatrix(points, property, flip, flags);

        if (flags) {
            geojson.matrix = result;
            result = geojson;
        }

        if (process.env.REGEN) write.sync(directories.out + name + '.json', result);
        t.deepEquals(result, load.sync(directories.out + name + '.json'), name);
    }
    t.end();
});
