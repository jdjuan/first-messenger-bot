var facebookAPI = require('./facebookAPI');
var responseManager = require('./responseManager');
var removeDiacritics = require('diacritics').remove;

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
            this.quickReplyManager(senderID, quickReplyPayload);
        } else if (messageText || messageAttachments) {
            this.messageManager(senderID, messageText);
        }
    },
    receivedPostback: function(event) {
        var senderID = event.sender.id;
        var recipientID = event.recipient.id;
        var timeOfPostback = event.timestamp;
        var payload = event.postback.payload;
        console.log("Received postback for user %d and page %d with payload '%s' " + "at %d", senderID, recipientID, payload, timeOfPostback);
        this.payloadManager(senderID, payload);
    },
    messageManager: function(senderID, message) {
        message = removeDiacritics(message);
        message = message.toLowerCase();
        switch (message) {
            case 'foto':
            case 'ver foto':
            case 'ver fotos':
            case 'ver una foto':
            case 'ver otra foto':
                responseManager.sendPhoto(senderID);
                break;
            case 'cancion':
            case 'recomendar otra':
            case 'recomendar cancion':
            case 'recomendar una cancion':
                responseManager.sendSong(senderID);
                break;
            default:
                responseManager.sendMainMenu(senderID);
                break;
        }
    },
    payloadManager: function(senderID, payload) {
        switch (payload) {
            case 'ver-fotos':
            case 'ver-otra-foto':
                responseManager.sendPhoto(senderID);
                break;
            case 'recomendar-cancion':
            case 'recomendar-otra':
                responseManager.sendSong(senderID);
                break;
            case 'volver':
                responseManager.sendMainMenu(senderID);
                break;
            default:
                break;
        }
    },
    quickReplyManager: function(senderID, payload) {
        switch (payload) {
            case 'me-gusto':
                responseManager.sendSongFeedback(senderID, true);
                break;
            case 'no-me-gusto':
                responseManager.sendSongFeedback(senderID, false);
                break;
            default:
                break;
        }
    }
}