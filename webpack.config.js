var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, './dist');
var APP_DIR = path.resolve(__dirname, './src/client');

const config = {
  mode: "production",
   entry: {
     main: APP_DIR + '/index.tsx'
   },
   output: {
     filename: 'bundle.js',
     path: BUILD_DIR,
   },
   resolve: {
     extensions: ['.ts', '.tsx', '.js']
   },
   module: {
    rules: [
     {
       test: /(\.css|.scss)$/,
       use: [{
           loader: "style-loader" // creates style nodes from JS strings
       }, {
           loader: "css-loader" // translates CSS into CommonJS
       }, {
           loader: "sass-loader" // compiles Sass to CSS
       }]
     },
     {
       test: /\.(jsx|js)?$/,
       use: [{
         loader: "babel-loader",
         options: {
           cacheDirectory: true,
           presets: ['react', 'es2015'] // Transpiles JSX and ES6
         }
       }]
     },
     { 
      test: /\.tsx?$/, 
      loader: "ts-loader" 
     }
    ],

  }
};

module.exports = config;
