const config = require('config');
const debug = require('debug');

const api = require('../lib/ooyala');
const utils = require('../lib/utils');

const print = debug('discovery');

function buildFilters(filters) {
  const array = [];
  for (let propName in filters) {
    if (utils.hasOwnProp(filters, propName)) {
      array.push([propName, JSON.stringify(filters[propName])].join('=='));
    }
  }
  return array.join('+AND+');
}

module.exports = {
  getAsset(embedCode) {
    return api.get(`/v2/assets/${embedCode}`);
  },
  getTrends(num = 5, filters = {}) {
    return api.get('/personalization/v1/trending', {limit: num, filters: buildFilters(filters)}, {accountId: config.api.key, secure: true, subdomain: 'player'})
    .then(response => {
      return response.payload.data;
    });
  },
  getRelated(embedCode, num = 5, filters = {}) {
    return api.get('/personalization/v1/similar', {asset_id: embedCode, limit: num, filters: buildFilters(filters)}, {accountId: config.api.key, secure: true, subdomain: 'player'})
    .then(response => {
      return response.payload.data;
    });  },
  getTokenRequest(...params) {
    return api.getTokenRequest(...params);
  }
};
