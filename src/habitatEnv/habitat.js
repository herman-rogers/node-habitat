export function setupEnvironment(config) {
  const { env } = config;

  global.habitat = config[env];
  global.habitat.env = config.env;
}

export function create(config) {
  if (!config) {
    const warning = 'Imported .env.json file is required to create habitat';
    // eslint-disable-next-line no-console
    throw new Error(warning);
  }
  setupEnvironment(config);
}

