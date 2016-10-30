var facebookAPI = require('./facebookAPI');

module.exports = {
    receivedMessage: function(event) {
        var senderID = event.sender.id;
        var recipientID = event.recipient.id;
        var timeOfMessage = event.timestamp;
        var message = event.message;

        console.log("Received message for user %d and page %d at %d with message:",
            senderID, recipientID, timeOfMessage);
        console.log(JSON.stringify(message));

        var messageId = message.mid;

        // You may get a text or attachment but not both
        var messageText = message.text;
        var messageAttachments = message.attachments;

        if (messageText) {

            // If we receive a text message, check to see if it matches any special
            // keywords and send back the corresponding example. Otherwise, just echo
            // the text we received.
            switch (messageText) {
                case 'image':
                    sendImageMessage(senderID);
                    break;

                case 'button':
                    sendButtonMessage(senderID);
                    break;

                case 'generic':
                    this.sendGenericMessage(senderID);
                    break;

                case 'receipt':
                    sendReceiptMessage(senderID);
                    break;

                default:
                    this.sendTextMessage(senderID, messageText);
            }
        } else if (messageAttachments) {
            this.sendTextMessage(senderID, "Message with attachment received");
        }
    },
    sendTextMessage: function(recipientId, messageText) {
        var messageData = {
            recipient: {
                id: recipientId
            },
            message: {
                text: messageText
            }
        };

        facebookAPI.callSendAPI(messageData);
    },
    /*
     * Delivery Confirmation Event
     *
     * This event is sent to confirm the delivery of a message. Read more about
     * these fields at https://developers.facebook.com/docs/messenger-platform/webhook-reference/message-delivered
     *
     */
    receivedDeliveryConfirmation: function(event) {
        var senderID = event.sender.id;
        var recipientID = event.recipient.id;
        var delivery = event.delivery;
        var messageIDs = delivery.mids;
        var watermark = delivery.watermark;
        var sequenceNumber = delivery.seq;

        if (messageIDs) {
            messageIDs.forEach(function(messageID) {
                console.log("Received delivery confirmation for message ID: %s",
                    messageID);
            });
        }
        console.log("All message before %d were delivered.", watermark);
    },
    receivedPostback: function(event) {
        var senderID = event.sender.id;
        var recipientID = event.recipient.id;
        var timeOfPostback = event.timestamp;

        // The 'payload' param is a developer-defined field which is set in a postback 
        // button for Structured Messages. 
        var payload = event.postback.payload;

        console.log("Received postback for user %d and page %d with payload '%s' " +
            "at %d", senderID, recipientID, payload, timeOfPostback);

        // When a postback is called, we'll send a message back to the sender to 
        // let them know it was successful
        sendTextMessage(senderID, "Postback called");
    },
    sendGenericMessage: function(recipientId) {
        var messageData = {
            recipient: {
                id: recipientId
            },
            message: {
                attachment: {
                    type: "template",
                    payload: {
                        template_type: "generic",
                        elements: [{
                            title: "rift",
                            subtitle: "Next-generation virtual reality",
                            item_url: "https://www.oculus.com/en-us/rift/",
                            image_url: "http://messengerdemo.parseapp.com/img/rift.png",
                            buttons: [{
                                type: "web_url",
                                url: "https://www.oculus.com/en-us/rift/",
                                title: "Open Web URL"
                            }, {
                                type: "postback",
                                title: "Call Postback",
                                payload: "Payload for first bubble",
                            }],
                        }, {
                            title: "touch",
                            subtitle: "Your Hands, Now in VR",
                            item_url: "https://www.oculus.com/en-us/touch/",
                            image_url: "http://messengerdemo.parseapp.com/img/touch.png",
                            buttons: [{
                                type: "web_url",
                                url: "https://www.oculus.com/en-us/touch/",
                                title: "Open Web URL"
                            }, {
                                type: "postback",
                                title: "Call Postback",
                                payload: "Payload for second bubble",
                            }]
                        }]
                    }
                }
            }
        };
        callSendAPI.callSendAPI(messageData);
    }
}