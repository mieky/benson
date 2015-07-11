benson
======

Benson lets you share your adventures. It's like a chatroom, but with specific focus, start, and end.

![Screenshot](https://github.com/mieky/benson/raw/master/screenshot.png)

## Features

Login with Facebook and post messages in a simple web UI.

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

Then you can browse to http://localhost:8080/, authenticate with Facebook and start messaging,

## Todo

Miscellanous thoughts, tech and feature wise. May or may not happen!

- [ ] post images/smiles
- [ ] replace Sequelize with Knex + Bookshelf
- [ ] maybe introduce [Flux](facebook.github.io/flux/)/[alt](https://github.com/goatslacker/alt)?
- [ ] cache user details locally to populate messages on posting
- [ ] lazy loading/pagination of older messages
- [ ] keep track of who's in an adventure (validate IDs)
- [ ] use [PostCSS](https://github.com/postcss/postcss) for styles
- [ ] join adventures by slug
- [ ] Travis CI build
- [ ] use web sockets for polling

## Acknowledgements

- This project is a grateful recipient of the [Futurice Open Source sponsorship program](http://futurice.com/blog/sponsoring-free-time-open-source-activities).

## License

[MIT](https://github.com/staltz/cycle/blob/master/LICENSE)
