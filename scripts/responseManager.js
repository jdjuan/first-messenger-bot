var facebookAPI = require('./facebookAPI');
var config = require('config');
var photos = require('../config/photos.json');
var music = require('../config/music.json');

const SERVER_URL = config.get('serverURL');

module.exports = {
    sendMainMenu: function(recipientId) {
        facebookAPI.sendTypingOn(recipientId);
        var attachmentMessage = {
            type: "template",
            payload: {
                template_type: "generic",
                elements: [{
                    title: "¡Hola!, escoge una opción:",
                    buttons: [{
                        type: "postback",
                        title: "Ver una foto",
                        payload: "ver-fotos",
                    }, {
                        type: "web_url",
                        url: "http://www.juandavidherrera.com/",
                        title: "Ver página web"
                    }],
                }]
            }
        };
        facebookAPI.sendGenericMessage(recipientId, attachmentMessage);
        facebookAPI.sendTypingOff(recipientId);
    },
    sendPhoto: function(recipientId) {
        facebookAPI.sendTypingOn(recipientId);
        var photo = photos[Math.floor(Math.random() * photos.length)];
        var url = SERVER_URL + '/pics/' + photo.url;
        var message = photo.message;
        facebookAPI.sendTextMessage(recipientId, message);
        facebookAPI.sendImageMessage(recipientId, url);
        facebookAPI.sendTypingOff(recipientId);
        setTimeout(function() { 
            this.sendBackButton(recipientId); 
        }.bind(this), 3000);
    },
    sendBackButton: function(recipientId) {
        facebookAPI.sendTypingOn(recipientId);
        var attachmentMessage = {
            type: "template",
            payload: {
                template_type: "button",
                text: "¿Deseas volver?",
                buttons: [{
                    type: "postback",
                    title: "Quiero ver otra",
                    payload: "ver-otra-foto"
                }, {
                    type: "postback",
                    title: "Volver",
                    payload: "volver"
                },]
            }
        };
        facebookAPI.sendGenericMessage(recipientId, attachmentMessage);
        facebookAPI.sendTypingOff(recipientId);
    },
}