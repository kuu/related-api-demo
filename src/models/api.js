const api = require('../lib/ooyala');

module.exports = {
  getAsset(embedCode) {
    return api.get(`/v2/assets/${embedCode}`);
  },
  getTrends(num = 5, filter = '') {
    return api.get('/v2/discover/trending/momentum', {window: 'week', limit: num, filter_by: filter}, {recursive: true});
  },
  getRelated(embedCode, num = 5, filter = '') {
    return api.get(`/v2/discover/similar/assets/${embedCode}`, {limit: num, filter_by: filter}, {recursive: true});
  },
  getTokenRequest(...params) {
    return api.getTokenRequest(...params);
  }
};
