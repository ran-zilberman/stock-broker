var express = require('express');
var path = require('path');
var app = express();
var rootRouter = require('./src/server/routes/index').default();

app.use(express.static('public')); //serves the index.html
app.use(express.static('dist'));
app.use(rootRouter);
app.listen(3000); //listens on port 3000 -> http://localhost:3000/
