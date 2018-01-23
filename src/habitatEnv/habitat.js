const fs = require('fs');

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

export function getJsonConfig() {
  const splitDir = __dirname.split('/');
  let file = null;

  for (let i = splitDir.length - 1; i > 0; i -= 1) {
    const path = splitDir.join('/');
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
}

const habitat = () => {
  const loadedEnv = getJsonConfig();
  setupEnvironment(loadedEnv);
};

export default habitat;
