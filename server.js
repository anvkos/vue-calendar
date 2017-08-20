require('dotenv').config({ silent: true });

const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const http = require('http');
const moment = require('moment-timezone');
moment.tz.setDefault('UTC');
const serialize = require('serialize-javascript');

app.use('/public', express.static(path.join(__dirname, 'public')));

let events = [
    { description: 'Random event 1', date: moment('2017-08-14', 'YYYY-MM-DD') },
    { description: 'Random event 2', date: moment('2017-07-14', 'YYYY-MM-DD') },
    { description: 'Random event 3', date: moment('2017-08-16', 'YYYY-MM-DD') }
    // { "description": "Random event 1", "date": "2017-08-13T00:00:00.000Z" },
    // { "description": "Random event 2", "date": "2017-08-18T00:00:00.000Z" },
    // { "description": "Random event 3", "date": "2017-08-29T00:00:00.000Z" }
];

let renderer;

app.get('/', (req, res) => {
  let template = fs.readFileSync(path.resolve('./index.html'), 'utf-8');
  let contentMarker = '<!--APP-->';
  if (renderer) {
    renderer.renderToString({ events }, (err, html) => {
      if (err) {
        console.log(err);
      } else {
        console.log(html);
        res.send(template.replace(contentMarker,
          `<script>
            var _INITIAL_STATE_ = ${ serialize(events) }
          </script>
          ${html}`
        ));
      }
    });
  } else {
    res.send('<p>Awating compilation..</p>')
  }
});

app.use(require('body-parser').json());
app.post('/add_event', (req, res) => {
  events.push(req.body);
  res.sendStatus(200);
});

const server = http.createServer(app);

if (process.env.NODE_ENV === 'development') {
  const reload = require('reload');
  const reloadServer = reload(server, app);
  require('./webpack-dev-middleware').init(app);
  require('./webpack-server-compiler').init(function(bundle) {
    renderer = require('vue-server-renderer').createBundleRenderer(bundle);
  });
}

server.listen(process.env.PORT, function () {
  console.log(`Example app listening on port ${process.env.PORT}!`);
  if (process.env.NODE_ENV === 'development') {
    require("open")(`http://localhost:${process.env.PORT}`);
  }
});
