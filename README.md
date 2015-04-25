benson
======

Benson lets you share your adventures. It's like a chatroom, but with a purpose, a start, and an end.

## Features

## Tech

- Node v0.12, babel (ES6)
- Frontend: [jspm](http://jspm.io/) + [systemjs](https://github.com/systemjs/systemjs) + maybe React one day
- Backend: [sequelize](http://sequelize.readthedocs.org/en/latest/) + [sqlite](https://github.com/mapbox/node-sqlite3)

## Up & running

```
npm install
node_modules/.bin/jspm install
rm database.sqlite ; node_modules/.bin/babel-node server
```

## License

MIT
