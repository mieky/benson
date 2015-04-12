benson
======

For those lavish feasts! Doesn't do anything useful just yet.

<img src="https://github.com/mieky/benson/raw/master/benson.jpg" style="height: 400px" />

## Features

## Tech

- Node v0.12, babel (ES6)
- Frontend: [jspm](http://jspm.io/) + [systemjs](https://github.com/systemjs/systemjs) + maybe React one day
- Backend: [sequelize](http://sequelize.readthedocs.org/en/latest/) + [sqlite](https://github.com/mapbox/node-sqlite3)

## Setting up

```
npm install
```

### Front

```
npm install -g jspm
jspm install
```

Also useful:

```
npm install -g live-server
live-server app
```

### Back

```
npm install -g babel
babel-node server/testdata      # or babel-node server
```

## License

MIT
