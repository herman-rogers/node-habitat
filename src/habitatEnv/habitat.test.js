const habitat = require('./habitat');

describe('habitat', () => {
  const mockEnv = {
    env: 'development',
    development: {
      TEST_API: 'www.example.com',
    },
  };

  it('should find the env config file', () => {
    expect(habitat.getJSONConfig()).toEqual(mockEnv);
  });

  it('should build the environment with .env file', () => {
    habitat.setupEnvironment(habitat.getJSONConfig());

    expect(global.habitat.TEST_API).toEqual('www.example.com');
  });

  it('should place the env specification into the global namespace', () => {
    habitat.setupEnvironment(habitat.getJSONConfig());
    expect(global.habitat.env).toEqual('development');
  });

  it('should place dev env variables into the global habitat env', () => {
    habitat.getJSONConfig = jest.fn();

    habitat.setupEnvironment(mockEnv);
    expect(global.habitat.TEST_API).toEqual('www.example.com');
  });
});
