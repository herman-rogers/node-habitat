const path = require('path');

const fs = jest.genMockFromModule('fs');

let mockFiles = Object.create(null);
let cachedMockFiles = Object.create(null);

function setMockFiles(newMockFiles) {
  mockFiles = Object.create(null);
  cachedMockFiles = newMockFiles;

  Object.keys(newMockFiles).forEach((file) => {
    const dir = path.dirname(file);

    if (!mockFiles[dir]) {
      mockFiles[dir] = [];
    }
    mockFiles[dir].push(path.basename(file));
  });
}

function readdirSync(directoryPath) {
  return mockFiles[directoryPath] || [];
}

function readFileSync(fileName) {
  const readFile = Object.keys(cachedMockFiles)
    .filter(file => path.basename(file) === fileName)
    .map(file => JSON.stringify(cachedMockFiles[file]));

  return readFile[0];
}

fs.setMockFiles = setMockFiles;
fs.readdirSync = readdirSync;
fs.readFileSync = readFileSync;

module.exports = fs;
