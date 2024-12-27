import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default {
  input: 'dist/esm/index.js',       // Usa a saída ESM como entrada
  output: {
    file: 'dist/index.js',          // Arquivo Vanilla JS para navegadores
    format: 'iife',                 // Formato para navegadores
    name: 'YbaOyra',                // Nome do objeto global
    sourcemap: true                 // Sourcemap para depuração
  },
  plugins: [
    resolve(),                      // Resolve dependências
    terser()                        // Minifica o código
  ]
};
