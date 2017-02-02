const express = require('express');
const config = require('config');
const debug = require('debug');
const api = require('../models/api');
const utils = require('../lib/utils');

const router = express.Router();
const {pcode, playerBrandingId, version} = config.player;
const print = debug('discovery');
const cache = {};

function renderAsset(res, asset) {
  const embedToken = api.getTokenRequest(asset.embed_code);
  api.getRelated(asset.embed_code)
  .then(results => {
    res.render('index.html', {asset, pcode, playerBrandingId, version, embedToken, related: results});
  });
}

function handleRequest(res, embedCode) {
  if (embedCode) {
    if (utils.hasOwnProp(cache, embedCode)) {
      const asset = cache[embedCode];
      print(`Retrieved asset "${asset.name}" from cache`);
      return renderAsset(res, asset);
    }
    print(`No cache found: ${embedCode}`);
    api.getAsset(embedCode).then(asset => {
      print(`Retrieved asset "${asset.name}" via API`);
      cache[embedCode] = asset;
      renderAsset(res, asset);
    }).catch(err => {
      res.render('error.html', {err});
    });
  } else {
    print('Embed code is not specified');
    api.getTrends(1).then(([asset]) => {
      print(`The current most trending asset is "${asset.name}"`);
      embedCode = asset.embed_code;
      if (!utils.hasOwnProp(cache, embedCode)) {
        cache[embedCode] = asset;
      }
      renderAsset(res, asset);
    }).catch(err => {
      res.render('error.html', {err});
    });
  }
}

router.get('/', (req, res) => {
  print('/ called.');
  handleRequest(res);
});

router.get('/:id', (req, res) => {
  const embedCode = req.params.id;
  print(`/${embedCode} called.`);
  handleRequest(res, embedCode);
});

module.exports = router;
