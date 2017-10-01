var express     = require('express');
var app         = express();
var expressWs   = require('express-ws')(app);
var bodyParser  = require('body-parser');
var csp         = require('./csp')(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;
var router = express.Router();

var messages = [];

app.ws('/', function(ws, req) {
});

var wss = expressWs.getWss('/');

function broadcast(message) {
  wss.clients.forEach(function(client) {
    client.send(message);
  })
}

router.get('/', function(req, res) {
  res.json(messages);
});

router.post('/', function(req, res) {
  var message = req.body.message;
  messages.push(message);
  broadcast(message);
  res.sendStatus(200);
});

app.use('/api', router);

app.listen(port);
