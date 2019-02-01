const path = require('path');
const glob = require('glob');

function getEntry() {
  const globPath = 'src/pages/*.js';
  const files = glob.sync(globPath);
  let filename;
  const entries = {};
  for (let i = 0; i < files.length; i++) {
    filename = path.basename(files[i], '.js');
    entries[filename] = path.resolve(__dirname, '../', files[i]);
  }
  return entries;
}

module.exports = {
  srcRoot: path.resolve(__dirname, '../src'),
  distRoot: path.resolve(__dirname, '../dist'),
  entry: getEntry(),
};
