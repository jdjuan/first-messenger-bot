var facebookAPI = require('./facebookAPI');
var responseManager = require('./responseManager');

module.exports = {
    receivedMessage: function(event) {
        var senderID = event.sender.id;
        var recipientID = event.recipient.id;
        var timeOfMessage = event.timestamp;
        var message = event.message;
        var messageId = message.mid;
        // You may get a text or attachment but not both
        var messageText = message.text;
        var messageAttachments = message.attachments;
        var quickReply = message.quick_reply;
        console.log("Received message for user %d and page %d at %d with message:", senderID, recipientID, timeOfMessage);
        console.log(JSON.stringify(message));

        if (quickReply) {
            var quickReplyPayload = quickReply.payload;
            console.log("Quick reply for message %s with payload %s", messageId, quickReplyPayload);
            responseManager.sendTextMessage(senderID, "Quick reply tapped");
            return;
        }

        if (messageText || messageAttachments) {
            responseManager.sendMainMenu(senderID);
        }
    },
    receivedPostback: function(event) {
        var senderID = event.sender.id;
        var recipientID = event.recipient.id;
        var timeOfPostback = event.timestamp;
        var payload = event.postback.payload;
        console.log("Received postback for user %d and page %d with payload '%s' " + "at %d", senderID, recipientID, payload, timeOfPostback);
        // The 'payload' param is a developer-defined field which is set in a postback 
        // button for Structured Messages. 
        this.payloadManager(senderID, payload);
    },
    payloadManager: function(senderID, payload) {
        switch (payload) {
            case 'ver-fotos':
                responseManager.sendPhoto(senderID);
                break;
            case 'volver':
                responseManager.sendMainMenu(senderID);
                break;
            default:
                break;
        }
    }
}