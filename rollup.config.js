import nodeResolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'

export default [{
  input: 'index.js',
  output: {
      extend: true,
      file: 'grid-to-matrix.js',
      format: 'cjs'
  },
  plugins: [nodeResolve()]
}, {
  input: 'index.js',
  output: {
      extend: true,
      file: 'grid-to-matrix.min.js',
      format: 'umd',
      name: 'gridToMatrix'
  },
  plugins: [nodeResolve(), uglify()]
}]
