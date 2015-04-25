benson
======

Benson lets you share your adventures. It's like a chatroom, but with a specific focus, start, and end.

## Features

Nothing much just yet. Initializes a local database and provides an API for querying it.

## Tech

- Node v0.12, [ES6](https://github.com/lukehoban/es6features) with [babel](http://babeljs.io/)
- Frontend: [jspm](http://jspm.io/) + [systemjs](https://github.com/systemjs/systemjs) + [React](https://github.com/facebook/react)
- Backend: [sequelize](http://sequelize.readthedocs.org/en/latest/) + [sqlite](https://github.com/mapbox/node-sqlite3)

## Up & running

```
npm install
node_modules/.bin/jspm install
rm database.sqlite ; node_modules/.bin/babel-node server
```

Then you can browse to http://localhost:8080/, and:

```
curl -is http://localhost:8080/api/adventure/1/messages -H 'accept: application/json'
```

## License

MIT
