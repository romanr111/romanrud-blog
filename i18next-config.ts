import * as fs from 'fs';
import * as path from 'path';

const localesFolderPath = path.join(__dirname, 'locales');
const defaultLanguage = 'en';

// Get all directories inside the locales folder
const locales = fs
  .readdirSync(localesFolderPath, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

// Generate the language list
const languages = locales.map((locale) => locale.split('-')[0]);

// Generate the namespaces list
const namespaces = fs
  .readdirSync(path.join(localesFolderPath, locales[0]))
  .filter((fileName) => fileName.endsWith('.json'))
  .map((fileName) => path.parse(fileName).name);

// Generate the configuration object
const config = {
  languages,
  defaultLanguage,
  ns: namespaces,
};

export default config;
