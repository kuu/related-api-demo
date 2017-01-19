const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');

const app = express();
const env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env === 'development';

// view engine setup
nunjucks.configure(path.join(__dirname, '../views'), {
  autoescape: true,
  express: app
});

// other middleware
app.use(favicon(path.join(__dirname, '../../dist/images/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../../dist'))); // Should be done by a reverse proxy

module.exports = app;
