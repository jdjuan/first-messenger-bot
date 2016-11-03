var facebookAPI = require('./facebookAPI');
var config = require('config');
var photos = require('../config/photos.json');
var music = require('../config/music.json');

const SERVER_URL = config.get('serverURL');

module.exports = {
    sendMainMenu: function(recipientId) {
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
                        type: "postback",
                        title: "Recomiéndame una canción",
                        payload: "recomendar-cancion",
                    }, {
                        type: "web_url",
                        url: "http://www.juandavidherrera.com/",
                        title: "Ver página web"
                    }],
                }]
            }
        };
        facebookAPI.sendGenericMessage(recipientId, attachmentMessage);
    },
    sendSong: function(recipientId) {
        var song = music[Math.floor(Math.random() * music.length)];
        facebookAPI.sendTextMessage(recipientId, song.url);
        // setTimeout(function() { 
        //     this.sendBackButton(recipientId); 
        // }.bind(this), 3000);
    },
    sendPhoto: function(recipientId) {
        var photo = photos[Math.floor(Math.random() * photos.length)];
        var url = SERVER_URL + '/pics/' + photo.url;
        var message = photo.message;
        facebookAPI.sendTextMessage(recipientId, message);
        facebookAPI.sendImageMessage(recipientId, url);
        setTimeout(function() { 
            this.sendBackButton(recipientId); 
        }.bind(this), 3000);
    },
    sendBackButton: function(recipientId) {
        var attachmentMessage = {
            type: "template",
            payload: {
                template_type: "button",
                text: "Escoge una opción:",
                buttons: [{
                    type: "postback",
                    title: "Ver otra foto",
                    payload: "ver-otra-foto"
                }, {
                    type: "postback",
                    title: "Volver",
                    payload: "volver"
                }]
            }
        };
        facebookAPI.sendGenericMessage(recipientId, attachmentMessage);
    },
}