const mongoose = require("mongoose")

const server = new mongoose.Schema(
    {   server_id:{type: String, require: true},
        name:{type: String, require: true},
        guild:{type: Object, default:{
            logs:{
                activate: false,
                channel: "none"
            },
            defense: {
                activete: false
            },
            welcome: {
                activate: false,
                channel: "none"
            },
            clockin:{
                activate: false,
                channel: "none"
            },
            music:{
                activate: true,
            },
            administration:{
                activate: false,
            }
        }},

        embeds:{type: Object, default: {
            welcome: {
                color:"0x0099FF",
                title: "Bienvenido",
                description: "Espero que la pases bien en nuestro discord",
                url: "https://media0.giphy.com/media/yIbEsL337MR2Qr16Ed/giphy.gif?cid=6c09b952479cc6304fadb462a5109f44cab76d9a0b16951f&rid=giphy.gif&ct=g"
            },
            chao: {
                color:"0x0099FF",
                title: "Ha dejado el servidor",
                description: "Pueh... uno menos",
                url: "https://aniyuki.com/wp-content/uploads/2022/05/aniyuki-anya-spy-x-family-19.gif"
            }
        }},
    }
)

module.exports = mongoose.model(`server`, server)