const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const app = express();
const port = process.env.PORT || 8000;
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const passportGoogle = require('./config/passport-google-strategy');
const flash = require('connect-flash');
const customMidWare = require('./config/middleware');

// sass middleware setup
app.use(
  sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css',
  })
);

// Assets
app.use(express.static('./assets'));

// Layout1s
app.use(expressEjsLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Decode post reqs
app.use(express.urlencoded());

// View Engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(
  session({
    name: 'rent-space',
    // TODO change this before deployment
    secret: 'sharedKey',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MongoStore(
      {
        mongooseConnection: db,
        autoRemove: 'disabled',
      },
      function (err) {
        console.log(err || 'connect-mongo-db setup OK');
      }
    ),
  })
);

// Middlewares
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMidWare.setFlash);

// Router
app.use('/', require('./routes/server'));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error while running server: ${err}`);
  }

  console.log(`Server running at ${port}`);
});
