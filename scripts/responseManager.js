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
        var messageData = {
            recipient: {
                id: recipientId
            },
            message: {
                attachment: {
                    type: "template",
                    payload: {
                        template_type: "generic",
                        elements: [{
                            title: "¡Hola!",
                            subtitle: "Soy el bot de Juan Herrera. Escoge una de las siguientes opciones:",
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
            }
        };
        facebookAPI.callSendAPI(messageData);
    },
    sendPhoto: function(recipientId) {
        var photo = photos[Math.floor(Math.random() * photos.length)];
        var url = SERVER_URL + '/pics/' + photo.url;
        var message = photo.message;
        this.sendImageMessage(recipientId, url);
        this.sendTextMessage(recipientId, message);
        
    },
    sendGenericMessage: function(recipientId) {
        var messageData = {
            recipient: {
                id: recipientId
            },
            message: {
                attachment: {
                    type: "template",
                    payload: {
                        template_type: "generic",
                        elements: [{
                            title: "rift",
                            subtitle: "Next-generation virtual reality",
                            item_url: "https://www.oculus.com/en-us/rift/",
                            image_url: "http://messengerdemo.parseapp.com/img/rift.png",
                            buttons: [{
                                type: "web_url",
                                url: "https://www.oculus.com/en-us/rift/",
                                title: "Open Web URL"
                            }, {
                                type: "postback",
                                title: "Call Postback",
                                payload: "Payload for first bubble",
                            }],
                        }, {
                            title: "touch",
                            subtitle: "Your Hands, Now in VR",
                            item_url: "https://www.oculus.com/en-us/touch/",
                            image_url: "http://messengerdemo.parseapp.com/img/touch.png",
                            buttons: [{
                                type: "web_url",
                                url: "https://www.oculus.com/en-us/touch/",
                                title: "Open Web URL"
                            }, {
                                type: "postback",
                                title: "Call Postback",
                                payload: "Payload for second bubble",
                            }]
                        }]
                    }
                }
            }
        };
        facebookAPI.callSendAPI(messageData);
    },
    sendImageMessage: function(recipientId, imageURL) {
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

        facebookAPI.callSendAPI(messageData);
    },
    sendButtonMessage: function(recipientId) {
        var messageData = {
            recipient: {
                id: recipientId
            },
            message: {
                attachment: {
                    type: "template",
                    payload: {
                        template_type: "button",
                        text: "This is test text",
                        buttons: [{
                            type: "web_url",
                            url: "https://www.oculus.com/en-us/rift/",
                            title: "Open Web URL"
                        }, {
                            type: "postback",
                            title: "Trigger Postback",
                            payload: "DEVELOPED_DEFINED_PAYLOAD"
                        }, {
                            type: "phone_number",
                            title: "Call Phone Number",
                            payload: "+16505551234"
                        }]
                    }
                }
            }
        };

        facebookAPI.callSendAPI(messageData);
    },
    sendQuickReply: function(recipientId) {
        var messageData = {
            recipient: {
                id: recipientId
            },
            message: {
                text: "What's your favorite movie genre?",
                quick_replies: [{
                        "content_type": "text",
                        "title": "Action",
                        "payload": "DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION"
                    },
                    {
                        "content_type": "text",
                        "title": "Comedy",
                        "payload": "DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY"
                    },
                    {
                        "content_type": "text",
                        "title": "Drama",
                        "payload": "DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_DRAMA"
                    }
                ]
            }
        };

        facebookAPI.callSendAPI(messageData);
    },
    sendTypingOn: function(recipientId) {
        console.log("Turning typing indicator on");

        var messageData = {
            recipient: {
                id: recipientId
            },
            sender_action: "typing_on"
        };

        facebookAPI.callSendAPI(messageData);
    },
    sendTypingOff: function(recipientId) {
        console.log("Turning typing indicator off");

        var messageData = {
            recipient: {
                id: recipientId
            },
            sender_action: "typing_off"
        };

        facebookAPI.callSendAPI(messageData);
    },
    sendTextMessage: function(recipientId, message) {
        var messageData = {
            recipient: {
                id: recipientId
            },
            message: {
                text: message
            }
        };

        facebookAPI.callSendAPI(messageData);
    }
}