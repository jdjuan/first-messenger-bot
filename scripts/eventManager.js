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

            responseManager.sendTextMessage(senderID, "Quick reply tapped");
            return;
        }

        if (messageText) {

            // If we receive a text message, check to see if it matches any special
            // keywords and send back the corresponding example. Otherwise, just echo
            // the text we received.
            switch (messageText) {
                case 'button':
                    responseManager.sendButtonMessage(senderID);
                    break;
                case 'generic':
                    responseManager.sendGenericMessage(senderID);
                    break;
                case 'receipt':
                    responseManager.sendReceiptMessage(senderID);
                    break;
                case 'quick reply':
                    responseManager.sendQuickReply(senderID);
                    break;
                case 'typing on':
                    responseManager.sendTypingOn(senderID);
                    break;
                case 'typing off':
                    responseManager.sendTypingOff(senderID);
                    break;
                default:
                    responseManager.sendMainMenu(senderID);
            }
        } else if (messageAttachments) {
            responseManager.sendMainMenu(senderID);
        }
    },
    receivedPostback: function(event) {
        var senderID = event.sender.id;
        var recipientID = event.recipient.id;
        var timeOfPostback = event.timestamp;
        console.log("Received postback for user %d and page %d with payload '%s' " +
            "at %d", senderID, recipientID, payload, timeOfPostback);
        // The 'payload' param is a developer-defined field which is set in a postback 
        // button for Structured Messages. 
        var payload = event.postback.payload;
        this.payloadManager(senderID, payload);
    },
    payloadManager: function(senderID, payload) {
        if (payload === 'ver-fotos') {
            responseManager.sendPhoto(senderID);
        }
    }
}