import { builtinModules } from 'module';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import svelte from 'rollup-plugin-svelte';
import { dependencies } from './package.json';

const extensions = ['.mjs', '.js', '.json', '.ts'];

export default [
  {
    input: [
      './src/index.ts',
    ],
    external: builtinModules.concat(Object.keys(dependencies)),
    plugins: [
      resolve({ extensions }),
      babel({ extensions, include: 'src/**/*' }),
    ],
    output: [
      {
        format: 'cjs',
        dir: 'out',
        sourcemap: true,
      },
      {
        format: 'es',
        dir: 'out/es',
        sourcemap: true,
      },
    ],
  },
  {
    input: [
      './__tests__/fixtures/templates/SimpleTemplate.svelte',
      './__tests__/fixtures/templates/WithStyles.svelte',
    ],
    plugins: [
      resolve({ extensions }),
      svelte({
        dev: true,
        generate: 'ssr',
      }),
    ],
    output: {
      format: 'es',
      dir: '__tests__/fixtures/templates',
      sourcemap: true,
    },
  },
];
