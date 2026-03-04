import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/spa-monitor-card.js',
  output: {
    file: 'dist/spa-monitor-card.js',
    format: 'es',
  },
  plugins: [
    resolve(),
    terser(),
  ],
};
