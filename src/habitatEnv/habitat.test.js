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

  afterEach(() => {
    global.habitat = null;
  });

  it('should build the environment with .env file', () => {
    habitat.setupEnvironment(mockConfig);

    expect(global.habitat.TEST_API).toEqual('www.example.com');
  });

  it('should place the env specification into the global namespace', () => {
    habitat.setupEnvironment(mockConfig);
    expect(global.habitat.env).toEqual('development');
  });

  it('should return a error if no config file is passed', () => {
    expect(() => { habitat.create(); }).toThrow(new Error('Imported .env.json file is required to create habitat'));
  });
});
