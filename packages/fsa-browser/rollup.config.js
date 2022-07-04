import { defineConfig } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import { terser } from 'rollup-plugin-terser'
import filesize from 'rollup-plugin-filesize'
// import postcss from 'rollup-plugin-postcss'
// import peerDepsExternal from 'rollup-plugin-peer-deps-external'

const packageJson = require('./package.json')

export default defineConfig([
  {
    input: 'src/index.ts',
    output: [
      { file: packageJson.main, format: 'cjs', sourcemap: true },
      { file: packageJson.module, format: 'esm', sourcemap: true },
    ],
    plugins: [
      // peerDepsExternal(),
      nodeResolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      terser(),
      filesize(),
    ],
  },
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
    // external: [/\.css$/],
  },
])


//  pnpm i -D rollup @rollup/plugin-node-resolve @rollup/plugin-commonjs rollup-plugin-dts rollup-plugin-terser @rollup/plugin-typescript rollup-plugin-peer-deps-external rollup-plugin-filesize rollup-plugin-copy
