import * as fs from 'fs';

jest.mock('fs');

const habitat = require('./habitat');

describe('habitat', () => {
  const mockConfig = {
    env: 'development',
    development: {
      TEST_API: 'www.example.com',
    },
  };
  const mockFileInfo = {
    '/mock/env/.env.json': mockConfig,
  };

  beforeEach(() => {
    fs.setMockFiles(mockFileInfo);
  });

  afterEach(() => {
    global.habitat = null;
  });

  it('should traverse a list of files to find specified env files', () => {
    expect(habitat.getJSONConfig('/mock/env')).toEqual(mockFileInfo['/mock/env/.env.json']);
  });

  it('should build the environment with .env file', () => {
    habitat.setupEnvironment(habitat.getJSONConfig('/mock/env'));

    expect(global.habitat.TEST_API).toEqual('www.example.com');
  });

  it('should place the env specification into the global namespace', () => {
    habitat.setupEnvironment(habitat.getJSONConfig('/mock/env'));
    expect(global.habitat.env).toEqual('development');
  });

  it('should allow us to call create and inject a config file', () => {
    habitat.create(mockConfig);

    expect(global.habitat.env).toEqual('development');
  });

  it('should allow habitat to work in non-node environments', () => {
    fs.readdirSync = null;
    fs.readFileSync = null;
    habitat.create(mockConfig);

    expect(global.habitat.env).toEqual('development');
  });
});
