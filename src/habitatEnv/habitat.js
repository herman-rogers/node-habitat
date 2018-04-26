let fs = Object.create(null);
try {
  // eslint-disable-next-line global-require
  fs = require('fs');
} catch (e) {
  // eslint-disable-next-line no-console
  console.log('could not detect fs, running outside node env.');
}

const fileName = '.env.json';

export function traversePath(path) {
  const files = fs.readdirSync(path);
  const envFile = [];

  files.forEach((file) => {
    if (file === fileName) {
      envFile.push(file);
    }
  });

  return envFile[0];
}

export function getJSONConfig(directory) {
  const isWindows = process.platform === 'win32';
  const lineEndings = isWindows ? '\\' : '/';
  const searchDir = directory || __dirname;
  const splitDir = searchDir.split(lineEndings);

  let file = null;

  for (let i = splitDir.length - 1; i > 0; i -= 1) {
    const path = splitDir.join(lineEndings);
    file = traversePath(path);

    if (file != null) break;
    splitDir.splice(i);
  }

  if (file) {
    const content = JSON.parse(fs.readFileSync(file, 'utf8'));
    return content;
  }
  return null;
}

// Expects a .json config
export function setupEnvironment(config) {
  global.habitat = {};

  switch (config.env) {
    case 'development':
      global.habitat = config.development;
      break;
    case 'staging':
      global.habitat = config.staging;
      break;
    case 'production':
      global.habitat = config.production;
      break;
    default:
      global.habitat = {};
  }
  global.habitat.env = config.env;
}

export function create(config) {
  if (!config && !fs) {
    // eslint-disable-next-line no-console
    console.warning('Detected non-nodejs env, please pass in .env.json manually');
    return;
  }
  const loadedEnv = config || getJSONConfig();
  setupEnvironment(loadedEnv);
}

