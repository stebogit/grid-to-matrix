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
        json: load.sync(directories.in + filename)
    };
});

test('grid-to-matrix', t => {
    for (const {filename, name, json}  of fixtures) {
        const {points, property, flip} = json;
        const matrix = gridToMatrix(points, property, flip);

        if (process.env.REGEN) write.sync(directories.out + name + '.json', matrix);
        t.deepEquals(matrix, load.sync(directories.out + name + '.json'), name);
    }
    t.end();
});

