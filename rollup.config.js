import typescript from 'rollup-plugin-typescript2'
import { uglify } from 'rollup-plugin-uglify';

export default [
  {
    input: './src/index.ts',
    output: {
      file: './lib/index.esm.js',
      format: 'esm',
    },
    plugins: [typescript()],
  },
  {
    input: './src/index.ts',
    output: {
      file: './lib/index.js',
      format: 'cjs',
    },
    plugins: [typescript()],
  },
  {
    input: './src/index.ts',
    output: {
      file: './lib/index.min.js',
      format: 'iife',
      name: 'fwew'
    },
    plugins: [typescript(), uglify()]
  }
]