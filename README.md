# Related API Demo
A demo web site for Discovery 1.5 Related API

## Prerequisite
git, Node.js version 6+

## Install
```
$ git clone git@github.com:kuu/related-api-demo.git
$ cd related-api-demo
$ npm install
$ npm run build
```

## Config
Put a config file in your work directory.
```js
$ mkdir config
$ vi config/default.json
{
  "server": {
    "host": "localhost",
    "port": 3004
  },
  "api": {
    "key": "Your Ooyala API Key",
    "secret": "Your Ooyala API Secret",
    "accountSecret": "Your Account Secret Key (for using Account Token API)"
  },
  "player": {
    "pcode": "Provider Code (Left part of the api key)",
    "playerBrandingId": "Player Id",
    "version": "Player version"
  }
}
```

## Run (Development)
```
$ npm run watch
[Ctrl]-[C] to stop.
```

## Run (Production)
```
$ npm start
"npm stop" to stop.
```
