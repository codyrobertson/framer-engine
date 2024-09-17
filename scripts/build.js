const esbuild = require('esbuild');
const { importToConfig } = require('./importToConfig');
const { postProcess } = require('./postProcess');

async function build() {
  // Run importToConfig
  await importToConfig();

  // Build core and components
  await Promise.all([
    esbuild.build({
      entryPoints: ['packages/core/src/index.ts'],
      outfile: 'packages/core/dist/index.js',
      bundle: true,
      format: 'esm',
      external: ['react', 'react-dom', 'framer', 'framer-motion'],
      plugins: [/* Add your plugins here */],
    }),
    esbuild.build({
      entryPoints: ['packages/components/src/index.ts'],
      outfile: 'packages/components/dist/index.js',
      bundle: true,
      format: 'esm',
      external: ['react', 'react-dom', 'framer', 'framer-motion'],
      plugins: [/* Add your plugins here */],
    }),
  ]);

  // Run post-processing
  await postProcess();
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});