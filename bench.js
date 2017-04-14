const Benchmark = require('benchmark');
const path = require('path');
const fs = require('fs');
const load = require('load-json-file');
const gridToMatrix = require('./');

const directory = path.join(__dirname, 'test', 'in') + path.sep;
const fixtures = fs.readdirSync(directory).map(filename => {
  return {
    name: path.parse(filename).name,
    geojson: load.sync(directory + filename)
  };
});

/**
 * Benchmark Results
 *
 * 3x4 x 35,603 ops/sec ±2.20% (76 runs sampled)
 * 8x8 x 10,960 ops/sec ±2.43% (75 runs sampled)
 */
const suite = new Benchmark.Suite('grid-to-matrix');
for (const {name, geojson} of fixtures) {
  suite.add(name, () => gridToMatrix(geojson));
}

suite
  .on('cycle', e => console.log(String(e.target)))
  .on('complete', () => {})
  .run();

