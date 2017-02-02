const config = require('config');
const OoyalaApi = require('ooyala-api');

module.exports = new OoyalaApi(config.api.key, config.api.secret, {concurrency: 6, accountSecret: config.api.accountSecret});
