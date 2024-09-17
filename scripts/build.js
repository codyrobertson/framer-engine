const esbuild = require('esbuild');
const { importToConfig } = require('./importToConfig');
const { postProcess } = require('./postProcess');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');

async function build() {
  try {
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
        plugins: [
          {
            name: 'postcss',
            setup(build) {
              build.onLoad({ filter: /\.css$/ }, async (args) => {
                const { css } = await postcss([
                  tailwindcss(),
                  autoprefixer(),
                ]).process(await fs.readFile(args.path, 'utf8'), {
                  from: args.path,
                });
                return {
                  contents: css,
                  loader: 'css',
                };
              });
            },
          },
        ],
      }),
      esbuild.build({
        entryPoints: ['packages/components/src/index.ts'],
        outfile: 'packages/components/dist/index.js',
        bundle: true,
        format: 'esm',
        external: ['react', 'react-dom', 'framer', 'framer-motion'],
        plugins: [
          {
            name: 'postcss',
            setup(build) {
              build.onLoad({ filter: /\.css$/ }, async (args) => {
                const { css } = await postcss([
                  tailwindcss(),
                  autoprefixer(),
                ]).process(await fs.readFile(args.path, 'utf8'), {
                  from: args.path,
                });
                return {
                  contents: css,
                  loader: 'css',
                };
              });
            },
          },
        ],
      }),
    ]);

    // Run post-processing
    await postProcess();

    console.log('Build completed successfully.');
  } catch (err) {
    console.error('Build failed with error:', err);
    process.exit(1);
  }
}

build();