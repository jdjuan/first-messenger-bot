var request = require('request');

module.exports = {
    callSendAPI: function(messageData) {
        request({
            uri: 'https://graph.facebook.com/v2.6/me/messages',
            qs: { access_token: 'EAATkqZAevZApABABsvFskCImcnynuE4NG73ZCAeuQOcCydwXBqbflkqasMj0perZBEaUycyI2lwffYbGYEJxmY1x5RpX3S8drjJl1j8KQUp4mc5lFfNNqTG8xvsLrlT6sFYJ62dg950SqZCUvnxZBHP3FonqpeZB1eG65CYZCo9CpgZDZD' },
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