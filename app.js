var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var eventManager = require('./scripts/eventManager');
var app = express();

app.use(bodyParser.json())
app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.get('/webhook', function(req, res) {
    if (req.query['hub.mode'] === 'subscribe' &&
        req.query['hub.verify_token'] === '1234') {
        console.log("Validating webhook");
        res.status(200).send(req.query['hub.challenge']);
    } else {
        console.error("Failed validation. Make sure the validation tokens match.");
        res.sendStatus(403);
    }
});

app.post('/webhook', function(req, res) {
    var data = req.body;
    // Make sure this is a page subscription
    if (data.object == 'page') {
        // Iterate over each entry. There may be multiple if batched
        data.entry.forEach(function(pageEntry) {
            var pageID = pageEntry.id;
            var timeOfEvent = pageEntry.time;

            // Iterate over each messaging event
            pageEntry.messaging.forEach(function(messagingEvent) {
                if (messagingEvent.optin) {
                    receivedAuthentication(messagingEvent);
                } else if (messagingEvent.message) {
                    eventManager.receivedMessage(messagingEvent);
                } else if (messagingEvent.delivery) {
                    //This is irrelevant
                    //eventManager.receivedDeliveryConfirmation(messagingEvent);
                } else if (messagingEvent.postback) {
                    eventManager.receivedPostback(messagingEvent);
                } else {
                    console.log("Webhook received unknown messagingEvent: ", messagingEvent);
                }
            });
        });
        // Assume all went well.
        // You must send back a 200, within 20 seconds, to let us know you've
        // successfully received the callback. Otherwise, the request will time out.
        res.sendStatus(200);
    }
});

app.listen(app.get('port'), function() {
    console.log('Example app listening on port: ' + app.get('port'));
});