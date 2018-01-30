const cool = require('cool-ascii-faces');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.prod.js');
const compiler = webpack(config);
const PORT = process.env.PORT || 5000

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
})).get('/cool', function(request, response) {
  response.send(cool());
});

// Serve the files on port 3000.
app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!\n`);
});