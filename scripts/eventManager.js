var facebookAPI = require('./facebookAPI');
var responseManager = require('./responseManager');

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
        var quickReply = message.quick_reply;
        if (quickReply) {
            var quickReplyPayload = quickReply.payload;
            console.log("Quick reply for message %s with payload %s",
                messageId, quickReplyPayload);

            sendTextMessage(senderID, "Quick reply tapped");
            return;
        }

        if (messageText) {

            // If we receive a text message, check to see if it matches any special
            // keywords and send back the corresponding example. Otherwise, just echo
            // the text we received.
            switch (messageText) {
                case 'image':
                    responseManager.sendImageMessage(senderID);
                    break;

                case 'button':
                    responseManager.sendButtonMessage(senderID);
                    break;

                case 'generic':
                    responseManager.sendGenericMessage(senderID);
                    break;

                case 'receipt':
                    responseManager.sendReceiptMessage(senderID);
                    break;

                default:
                    responseManager.sendTextMessage(senderID, messageText);
            }
        } else if (messageAttachments) {
            responseManager.sendTextMessage(senderID, "Message with attachment received");
        }
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
        responseManager.sendTextMessage(senderID, "Postback called");
    }
}