const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const authorization = require('express-authorization');
const session = require('express-session');
const path = require('path');
const fs = require('fs');

const data = require('./sample_day.js');

const app = express();

const sess = {
  secret: 'cookie_secret',
  //name: cookie_name,
  //store: sessionStore, // connect-mongo session store
  proxy: true,
  resave: true,
  saveUninitialized: true
}

app.set("port", process.env.PORT || 3001);

app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.methodOverride());
app.use(session(sess));

// setup permission middleware
var ensureNounVerb = authorization.ensureRequest.isPermitted('noun:verb');

const userConfirm = {
  name: 'user',
  password : 'user'
}

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.set('trust proxy', 1) // trust first proxy 
  sess.cookie.secure = true // serve secure cookies 
  app.use(express.static("client/build"));
}

app.post("/login", (req, res, next) => {
  if ((req.body.name === userConfirm.name) && (req.body.password === userConfirm.password)) {
    filePath = __dirname + '/login.json';   
    req.session.user = {
      username: req.body.name,
      password: req.body.password,
      permissions: [ 'noun:*' ]
    };
    fs.writeFile(filePath, JSON.stringify(req.body), function () {
      res.send(data)
    });
  }
  else next(new Error('Not Authorized user'));
});

app.post("/update", (req, res, next) => {
  console.log(req.session, 'loginsever')
  if (req.session.user) {
    filePath = __dirname + '/events.json';
    fs.writeFile(filePath, JSON.stringify(req.body), function () {
      res.send('ok');
    });
  }
  else next(new Error('Not Authorized user'));
});


app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
  res.send('err');
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
