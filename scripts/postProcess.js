const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

async function postProcess() {
  // Run ts-migrate
  await execPromise('npx ts-migrate -p tsconfig.json');

  // Convert .js files to .tsx
  await convertJsToTsx();

  // Run Prettier
  await execPromise('yarn format');

  // Convert CSS to Tailwind
  await convertCssToTailwind();
}

async function convertJsToTsx() {
  const dirs = ['packages/core/src', 'packages/components/src'];
  for (const dir of dirs) {
    const files = await fs.readdir(dir);
    for (const file of files) {
      if (file.endsWith('.js')) {
        const oldPath = path.join(dir, file);
        const newPath = path.join(dir, file.replace('.js', '.tsx'));
        await fs.rename(oldPath, newPath);
      }
    }
  }
}
async function convertCssToTailwind() {
  const { execSync } = require('child_process');
  const { readdirSync, readFileSync, writeFileSync } = require('fs');
  const { join } = require('path');

  const cssFiles = readdirSync('src').filter(file => file.endsWith('.css'));

  cssFiles.forEach(file => {
    const cssFilePath = join('src', file);
    const cssContent = readFileSync(cssFilePath, 'utf-8');

    // Use css-to-tailwind to convert CSS to Tailwind classes
    const tailwindClasses = execSync(`npx css-to-tailwind "${cssContent}"`, { encoding: 'utf-8' });

    // Write the Tailwind classes to a new file with the same name but .tailwind extension
    const tailwindFilePath = cssFilePath.replace('.css', '.tailwind');
    writeFileSync(tailwindFilePath, tailwindClasses);

    console.log(`Converted ${file} to Tailwind classes in ${tailwindFilePath}`);
  });
}

module.exports = {
  postProcess,
};