# node-habitat

node-habitat exists because of the difficulty with managing environment configs across various projects. For example, in the back-end you traditionally access process.env, for the front-end you can use wepack env, for universal you create some hybrid, and for mobile (react-native) its something custom.

node-habitat solves this by being a simple environment package that works across mobile, universal, the front-end, and the back-end.

### Getting started

To get started you first need to install node-habitat into your project:

```bash
npm install node-habitat
or
yarn add node-habitat
```

Next create a `.env.json` file at the root of your project so that node-habitat can process your environment.

After creating the `.env.json` just import node-habitat into the initialization code of your project (app.js or index.js) and call the ```create()``` method:

```javascript
import habitat from 'node-habitat';

habitat.create();
```

And that's it! To access your env just use the global namespace ```global.habitat```.

For example:

```javascript
const testEnv = global.habitat.TEST_ENV;

console.log(testEnv); // prints whatever TEST_ENV is inside your config file.
```

### Using .env.json

> You must place the .env.json file at the root of your project so habitat can find it.

The environment config file for node-habitat is just a simple .json file with a few custom features your can use.

First, the generic file looks like:

```json
{
"env": "development",
"development": {
"MOCK_API": "www.api.dev.com"
},
"staging": {
"MOCK_API": "www.api.staging.com"
},
"production": {
"MOCK_API": "www.api.production.com"
}
}
```

The only required field here is the ```env:``` section - this tells habitat what environment switch to use. For example is the env is set to development then MOCK_API will equal www.api.dev.com. If, however, env is set to production then MOCK_API will equal www.api.production.com. Habitat will automatically setup the environment depending on the env otherwise it will return an **empty object**.

You can access the habitat throughout your entire project by using the global space ```global.habitat```. For example running with the config above will output:

```javascript
const apiUrl = global.habitat.MOCK_ENV;
console.log(apiURL); // prints out www.api.dev.com
```

Finally, you can access the current env by ```global.habitat.env```.

### Best Practices

As with any project it is ultimately up to the developer to decide what to do with their config files. With that being said, with habitat there are some best practices that will help keep your config safe.

First, make sure to not version the .env.json file to source control. Create a .env.example.json with your config variable names if you need to keep track of it.

Second, if you're creating a universal app be wary of importing habitat into your front-end code. Basically front-end code should always be considered exposed to the outside world - so if you're using secrets in your back-end and sharing the config to the front-end you may expose some API secrets. Essentially don't put sensitive information into your client config.


License
----

MIT

