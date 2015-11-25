"use strict";

const ENV = (process.env.NODE_ENV || 'development').toUpperCase();
const ENV_PRODUCTION = (ENV === 'PRODUCTION');

let
  path = require('path'),
  express = require('express'),
  app = express()
  ;


app
  .set('port', 3000)
  .use('/assets', express.static(path.join(__dirname, 'public')))
  .get('*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')))
;

app
  .listen(app.get('port'), function() {
    console.log(
      '\nReact-Blog,\n' + ENV + ' Server listening on port:',
      app.get('port'), ' | ', Date(), '\n'
    );
  })
;
