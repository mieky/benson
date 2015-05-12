benson
======

Benson lets you share your adventures. It's like a chatroom, but with a specific focus, start, and end.

## Features

Post messages as "User 1" in a simple web UI.

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
- [x] better styles for messages
- [x] create new user via facebook
- [ ] add login page
- [ ] authenticate user in requests
- [ ] keep track of who's in an adventure (validate IDs)
- [ ] use [JWT](http://jwt.io/)
- [ ] use [PostCSS](https://github.com/postcss/postcss) for styles
- [ ] fetch messages for a specific adventure ID
- [ ] npm run scripts for eslint + jscs
- [ ] Travis CI build
- [ ] use web sockets for polling


## Acknowledgements

- This project is a grateful recipient of the [Futurice Open Source sponsorship program](http://futurice.com/blog/sponsoring-free-time-open-source-activities).

## License

[MIT](https://github.com/staltz/cycle/blob/master/LICENSE)
