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
npm start
```

**Caution!** `npm start` will destroy your database.sqlite to get a clean slate every time.

Then you can browse to http://localhost:8080/, and:

```
curl -is http://localhost:8080/api/adventure/1/messages -H 'accept: application/json'
```

Posting a message with [httpie](https://github.com/jakubroztocil/httpie):

```
http POST http://localhost:8080/api/adventure/1/message text="I sleep all night and work all day" userId=2
```

## Todo

- [x] post message
- [x] poll for new messages
- [x] require user and adventure IDs for messages
- [ ] validate user and adventure IDs for messages
- [ ] authenticate sender
- [ ] fetch messages for a specific adventure ID
- [ ] better styles for messages
- [ ] use [PostCSS](https://www.google.fi/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0CCAQFjAA&url=https%3A%2F%2Fgithub.com%2Fpostcss%2Fpostcss&ei=lGg7Va-fMuXmyQOHiYC4BA&usg=AFQjCNEteYqCgL4rno4I2giUMwPbX7T5qQ&sig2=OsIqF15mbDHdtlwfdbpHsw&bvm=bv.91665533,d.bGQ) for styles
- [ ] npm run scripts for eslint + jscs
- [ ] Travis CI build
- [ ] use web sockets for polling

## License

MIT
