import { defineConfig } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import { terser } from 'rollup-plugin-terser'

const packageJson = require('./package.json')

export default defineConfig([
  {
    input: 'src/index.ts',
    output: [{ file: packageJson.main, format: 'esm', sourcemap: true }],
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      // terser(),
    ],
    external: [
      'React',
      // 'dexie',
      // 'dexie-export-import',
      'fsa-browser',
      // 'uuid',
      'react',
      // 'react-dom',
      // 'jsxRuntime',
    ],
  },
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
  },
])

//  pnpm i -D rollup @rollup/plugin-node-resolve @rollup/plugin-commonjs rollup-plugin-dts rollup-plugin-terser
