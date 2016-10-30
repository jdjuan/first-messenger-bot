var facebookAPI = require('./facebookAPI');
var config = require('config');

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
    sendPhotos: function(recipientId) {
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
                            title: "2 Años",
                            image_url: SERVER_URL + "/pics/002.jpg"
                        }, {
                            title: "3 Años",
                            image_url: SERVER_URL + "/pics/003.jpg"
                        }, {
                            title: "5 Años",
                            image_url: SERVER_URL + "/pics/005.jpg"
                        }, {
                            title: "6 Años",
                            image_url: SERVER_URL + "/pics/006.jpg"
                        }, {
                            title: "7 Años",
                            image_url: SERVER_URL + "/pics/007.jpg"
                        }, {
                            title: "8 Años",
                            image_url: SERVER_URL + "/pics/008.jpg"
                        }, {
                            title: "9 Años",
                            image_url: SERVER_URL + "/pics/009.jpg"
                        }, {
                            title: "13 Años",
                            image_url: SERVER_URL + "/pics/013.jpg"
                        }, {
                            title: "14 Años",
                            image_url: SERVER_URL + "/pics/014.jpg"
                        }, {
                            title: "15 Años",
                            image_url: SERVER_URL + "/pics/015.jpg"
                        }, {
                            title: "16 Años",
                            image_url: SERVER_URL + "/pics/016.jpg"
                        }, {
                            title: "17 Años",
                            image_url: SERVER_URL + "/pics/017.jpg"
                        }, {
                            title: "18 Años",
                            image_url: SERVER_URL + "/pics/018.jpg"
                        }, {
                            title: "19 Años",
                            image_url: SERVER_URL + "/pics/019.jpg"
                        }, {
                            title: "20 Años",
                            image_url: SERVER_URL + "/pics/020.jpg"
                        }, {
                            title: "21 Años",
                            image_url: SERVER_URL + "/pics/021.jpg"
                        }, {
                            title: "22 Años",
                            image_url: SERVER_URL + "/pics/022.jpg"
                        }, {
                            title: "22 Años y medio",
                            image_url: SERVER_URL + "/pics/022-.jpg"
                        }, {
                            title: "23 Años",
                            image_url: SERVER_URL + "/pics/023.jpg"
                        }]
                    }
                }
            }
        };
        facebookAPI.callSendAPI(messageData);
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
    sendImageMessage: function(recipientId) {
        var messageData = {
            recipient: {
                id: recipientId
            },
            message: {
                attachment: {
                    type: "image",
                    payload: {
                        url: "https://fbcdn-sphotos-e-a.akamaihd.net/hphotos-ak-xfp1/v/t1.0-9/14317505_1068024023305558_7246467951144412226_n.jpg?oh=e27e7e5a5235050ba6abae1f94a5ab1c&oe=58953F30&__gda__=1486794336_1105aa33b7bf01af8ec5cf746564cd41"
                        // url: SERVER_URL + "/assets/rift.png"
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
    sendTextMessage: function(recipientId, messageText) {
        var messageData = {
            recipient: {
                id: recipientId
            },
            message: {
                text: messageText
            }
        };

        facebookAPI.callSendAPI(messageData);
    }
}