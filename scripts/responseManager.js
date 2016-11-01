var facebookAPI = require('./facebookAPI');
var config = require('config');
var photos = [{ url: '002.jpg', message: "2 años" },
    { url: '003.jpg', message: "3 años" },
    { url: '005.jpg', message: "5 años" },
    { url: '006.jpg', message: "6 años" },
    { url: '007.jpg', message: "7 años" },
    { url: '008.jpg', message: "8 años" },
    { url: '009.jpg', message: "9 años" },
    { url: '013.jpg', message: "13 años" },
    { url: '014.jpg', message: "14 años" },
    { url: '015.jpg', message: "15 años" },
    { url: '016.jpg', message: "16 años" },
    { url: '017.jpg', message: "17 años" },
    { url: '018.jpg', message: "18 años" },
    { url: '019.jpg', message: "19 años" },
    { url: '020.jpg', message: "20 años" },
    { url: '021.jpg', message: "21 años" },
    { url: '022.jpg', message: "22 años" },
    { url: '022-2.jpg', message: "22 años" },
    { url: '023.jpg', message: "23 años" }
];

const SERVER_URL = config.get('serverURL');

module.exports = {
    sendMainMenu: function(recipientId) {
        var attachmentMessage = {
            attachment: {
                type: "template",
                payload: {
                    template_type: "generic",
                    elements: [{
                        title: "¡Hola!, escoge una opción:",
                        buttons: [{
                            type: "postback",
                            title: "Ver fotos",
                            payload: "ver-fotos",
                        }, {
                            type: "web_url",
                            url: "http://www.juandavidherrera.com/",
                            title: "Ver página web"
                        }],
                    }]
                }
            }
        };
        facebookAPI.sendGenericMessage(recipientId, messageData);
    },
    sendPhoto: function(recipientId) {
        var photo = photos[Math.floor(Math.random() * photos.length)];
        var url = SERVER_URL + '/pics/' + photo.url;
        var message = photo.message;
        facebookAPI.sendTextMessage(recipientId, message);
        facebookAPI.sendImageMessage(recipientId, url);

    }
}