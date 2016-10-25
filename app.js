var express = require('express');
var app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/webhook', function(req, res) {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === 1234) {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);
  }
});

app.listen(app.get('port'), function () {
  console.log('Example app listening on port: ' + app.get('port'));
});
