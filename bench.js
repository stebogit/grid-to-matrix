import fs from 'fs';
import path from 'path';
import Benchmark from 'benchmark';
import load from 'load-json-file';
import gridToMatrix from './';

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
 * 3x4-flags: 1.034ms
 * 3x4-flipped: 0.267ms
 * 3x4: 0.117ms
 * 8x8: 0.924ms
 *
 * 3x4-flags x 85,772 ops/sec ±1.76% (82 runs sampled)
 * 3x4-flipped x 91,675 ops/sec ±1.80% (83 runs sampled)
 * 3x4 x 90,695 ops/sec ±1.89% (81 runs sampled)
 * 8x8 x 21,319 ops/sec ±2.84% (79 runs sampled)
 */
const suite = new Benchmark.Suite('grid-to-matrix');
for (const {name, geojson} of fixtures) {
  console.time(name);
  gridToMatrix(geojson.points);
  console.timeEnd(name);

  suite.add(name, () => gridToMatrix(geojson.points));
}

suite
  .on('cycle', e => console.log(String(e.target)))
  .on('complete', () => {})
  .run();
