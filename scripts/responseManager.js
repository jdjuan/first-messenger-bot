var facebookAPI = require('./facebookAPI');
var config = require('config');
var photos = require('../config/photos.json');
var music = require('../config/music.json');
const SERVER_URL = config.get('serverURL');

module.exports = {
    sendMainMenu: function (recipientId) {
        var attachmentMessage = {
            type: "template",
            payload: {
                template_type: "generic",
                elements: [{
                    title: "¡Hola!, escoge una opción: ",
                    buttons: [{
                        type: "postback",
                        title: "📷 Ver foto",
                        payload: "ver-fotos",
                    }, {
                        type: "postback",
                        title: "🎧 Recomendar canción",
                        payload: "recomendar-cancion",
                    }, {
                        type: "web_url",
                        url: "http://www.juandavidherrera.com/",
                        title: "💻 Ver página web"
                    }],
                }]
            }
        };
        facebookAPI.sendGenericMessage(recipientId, attachmentMessage);
    },
    sendSong: function (recipientId) {
        var song = music[Math.floor(Math.random() * music.length)];
        facebookAPI.sendTextMessage(recipientId, "🎵 " + song.name + " 🎵", function () {
            setTimeout(function () {
                facebookAPI.sendTextMessage(recipientId, "🎷 Youtube: " + song.url + " 🎷", function () {
                    setTimeout(function () {
                        this.sendSongMenu(recipientId);
                    }.bind(this), 2000);
                }.bind(this));
            }.bind(this), 1000);
        }.bind(this));
    },
    sendSongMenu: function (recipientId) {
        var textMessage = "¿Te gustó? 🙈🙈🙈"
        var quickReplies = [{
            "content_type": "text",
            "title": "Sí 😍😍😍",
            "payload": "me-gusto"
        }, {
            "content_type": "text",
            "title": "No 💩💩💩",
            "payload": "no-me-gusto"
        }];
        facebookAPI.sendQuickReply(recipientId, textMessage, quickReplies);
    },
    sendSongFeedback: function (recipientId, liked) {
        var messageText = liked ? "Qué bien 😊 😸 😎 👏" : "Lo siento 💔 😭 😰 🙀 😳";
        facebookAPI.sendTextMessage(recipientId, messageText, function () {
            setTimeout(function () {
                this.sendFeedbackMenu(recipientId);
            }.bind(this), 1000);
        }.bind(this));
    },
    sendPhoto: function (recipientId) {
        var photo = photos[Math.floor(Math.random() * photos.length)];
        var url = SERVER_URL + '/pics/' + photo.url;
        var message = photo.message;
        facebookAPI.sendTextMessage(recipientId, message + "👶👶👶", function () {
            setTimeout(function () {
                facebookAPI.sendImageMessage(recipientId, url, function () {
                    setTimeout(function () {
                        this.sendPhotoMenu(recipientId);
                    }.bind(this), 1000);
                }.bind(this));
            }.bind(this), 1000);
        }.bind(this));
    },
    sendPhotoMenu: function (recipientId) {
        var attachmentMessage = {
            type: "template",
            payload: {
                template_type: "button",
                text: "Escoge una opción:",
                buttons: [{
                    type: "postback",
                    title: "Ver otra foto 😂",
                    payload: "ver-otra-foto"
                }, {
                    type: "postback",
                    title: "Volver 👈",
                    payload: "volver"
                }]
            }
        };
        facebookAPI.sendGenericMessage(recipientId, attachmentMessage);
    },
    sendFeedbackMenu: function (recipientId) {
        var attachmentMessage = {
            type: "template",
            payload: {
                template_type: "button",
                text: "Escoge una opción:",
                buttons: [{
                    type: "postback",
                    title: "Recomendar otra",
                    payload: "recomendar-otra"
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