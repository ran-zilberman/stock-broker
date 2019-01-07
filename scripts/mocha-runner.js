'use strict';

require('ts-node/register');

const mockCssModules = require("mock-css-modules");
mockCssModules.register(['.sass', '.scss']);

const path = require('path');
const Mocha = require('mocha');
const glob = require('glob');
require(path.join(process.cwd(), 'test', `mocha-setup.ts`));

const options = {
    timeout: 30000
};

let mocha = new Mocha({...options});

glob.sync('src/**/*.spec.ts?(x)').forEach((file) => {
  mocha.addFile(file)
});

mocha.run();
