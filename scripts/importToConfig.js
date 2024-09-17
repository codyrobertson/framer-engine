const fs = require('fs');
const path = require('path');

// Function to remove text after '@' in URLs
const removeVersionFromURL = (url) => {
  return url.split('@')[0];
};

// Function to update the unframer.config.json file
const updateUnframerConfig = async (componentUrls) => {
  const configPath = path.join(__dirname, '..', 'unframer.config.json');
  
  // Read the existing config file
  let config = {};
  try {
    const configData = await fs.promises.readFile(configPath, 'utf8');
    config = JSON.parse(configData);
  } catch (error) {
    console.error('Error reading config file:', error);
    config = {
      "$schema": "https://unframer-schema.vercel.app/schema.json",
      "outDir": "./framer-imported",
      "components": {}
    };
  }

  // Update the components in the config
  componentUrls.forEach(url => {
    const cleanUrl = removeVersionFromURL(url.trim());
    const componentName = path.basename(cleanUrl, '.js');
    config.components[componentName] = cleanUrl;
  });

  // Write the updated config back to the file
  await fs.promises.writeFile(configPath, JSON.stringify(config, null, 2));
  console.log('unframer.config.json has been updated successfully.');
};

async function importToConfig(componentUrls) {
  try {
    // Remove version information from component URLs
    const cleanedUrls = componentUrls.map(removeVersionFromURL);

    // Update the unframer.config.json file with the cleaned URLs
    await updateUnframerConfig(cleanedUrls);

    console.log('Import to config completed successfully.');
  } catch (error) {
    console.error('Error during import to config:', error);
  }
}

module.exports = {
  importToConfig,
};

// Allow running as a script
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error('Please provide a comma-separated list of Framer component URLs.');
    process.exit(1);
  }

  const componentUrls = args[0].split(',');
  importToConfig(componentUrls);
}