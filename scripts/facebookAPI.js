var request = require('request');
var config = require('config');

// Generate a page access token for your page from the App Dashboard
const PAGE_ACCESS_TOKEN = config.get('pageAccessToken');

module.exports = {
    sendTextMessage: function(recipientId, messageText) {
        this.sendTypingOn(recipientId);
        var messageData = {
            recipient: {
                id: recipientId
            },
            message: {
                text: messageText
            }
        };
        this.callSendAPI(messageData);
        this.sendTypingOff(recipientId);
    },
    sendImageMessage: function(recipientId, imageURL) {
        this.sendTypingOn(recipientId);
        var messageData = {
            recipient: {
                id: recipientId
            },
            message: {
                attachment: {
                    type: "image",
                    payload: {
                        url: imageURL
                    }
                }
            }
        };
        this.callSendAPI(messageData);
        this.sendTypingOff(recipientId);
    },
    sendGenericMessage: function(recipientId, attachmentMessage) {
        var messageData = {
            recipient: {
                id: recipientId
            },
            message: {
                attachment: attachmentMessage
            }
        };
        this.callSendAPI(messageData);
    },
    sendQuickReply: function(recipientId, textMessage, quickReplies) {
        var messageData = {
            recipient: {
                id: recipientId
            },
            message: {
                text: textMessage,
                quick_replies: quickReplies
            }
        };
        this.callSendAPI(messageData);
    },
    sendTypingOn: function(recipientId) {
        var messageData = {
            recipient: {
                id: recipientId
            },
            sender_action: "typing_on"
        };

        this.callSendAPI(messageData);
    },
    sendTypingOff: function(recipientId) {
        var messageData = {
            recipient: {
                id: recipientId
            },
            sender_action: "typing_off"
        };
        this.callSendAPI(messageData);
    },
    callSendAPI: function(messageData) {
        request({
            uri: 'https://graph.facebook.com/v2.6/me/messages',
            qs: { access_token: PAGE_ACCESS_TOKEN },
            method: 'POST',
            json: messageData
        }, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var recipientId = body.recipient_id;
                var messageId = body.message_id;

                console.log("Successfully sent generic message with id %s to recipient %s",
                    messageId, recipientId);
            } else {
                console.error("Unable to send message.");
                console.error(response);
                console.error(error);
            }
        });
    },
}